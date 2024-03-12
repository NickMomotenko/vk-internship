import { useEffect, useState } from "react";
import { checkValueByOnlyLetters } from "../helpers/helpers";

type UseInputProp = {
  cb?: (value: any) => void;
  // rules?: Function[];
};

export const useInput = ({ cb }: UseInputProp) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (value.length === 0) setError(false);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (checkValueByOnlyLetters(event.target.value)) {
      setError(() => {
        cb && cb({ query: event.target.value, error: true });

        return true;
      });
    } else {
      setError(() => {
        cb && cb({ query: event.target.value, error: false });

        return false;
      });
    }
  };

  return { value, error, handleChange, setError };
};
