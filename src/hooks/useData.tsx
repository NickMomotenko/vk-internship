import { useState } from "react";

export const useData = (url: string = "https://catfact.ninja/fact") => {
  const [load, setLoad] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getData = async () => {
    try {
      setError("");
      setLoad(true);
      const json = await fetch(url);

      let { fact } = await json.json();

      setLoad(false);

      return fact;
    } catch (error: any) {
      setError(error.message);
      setLoad(false);
    }
  };

  return { load, error, getData };
};
