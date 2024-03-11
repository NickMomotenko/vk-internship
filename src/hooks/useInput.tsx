import { useEffect, useState } from "react";
import { checkValueByOnlyLetters } from "../helpers/helpers";

type UseInputProp = {
  cb?: (value: any) => void;
};

export const useInput = ({ cb }: UseInputProp) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!value.length) setError(false);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (checkValueByOnlyLetters(event.target.value)) {
      setError(true);
    } else {
      setError(false);
    }

    cb && cb({ query: event.target.value });
  };

  return { value, error, handleChange };
};
