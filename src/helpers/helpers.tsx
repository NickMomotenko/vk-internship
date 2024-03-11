export const checkValueByOnlyLetters = (value: string) => {
  const regex = /^[a-zA-Z]+$/;

  if (!regex.test(value)) {
    return true;
  }
};
