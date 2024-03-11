export const getData = async (url: string = "https://catfact.ninja/fact") => {
  const json = await fetch(url);

  let { fact } = await json.json();

  return fact;
};
