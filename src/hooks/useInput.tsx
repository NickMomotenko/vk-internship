import { useEffect, useState } from "react";

type UseInputProp = {
  cb?: (value: any) => void;
  rules?: Function[];
};

export const useInput = ({ cb, rules }: UseInputProp) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!value.length) setError(false);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (rules) {
      for (const func of rules) {
        if (func(event.target.value)) {
          setError(true);
          break;
        } else {
          setError(false);
          continue;
        }
      }
    }

    cb && cb({ query: event.target.value });
  };

  return { value, error, handleChange };
};
