export const checkValueByOnlyLetters = (value: string) => {
  const regex = /^[a-zA-Z]+$/;

  if (!regex.test(value)) {
    return true;
  }
};

export const countNonLetterAtEnd = (word: string) => {
  let counter: number = 0;

  for (let i = word.length - 1; i >= 0; i--) {
    let last = word[i];

    if (!last.match(/[a-zA-Z]/)) {
      counter += 1;
    } else return counter;
  }
};
