export const capitalFirstLetters = (value: any) => {
  if (value) {
    return value
      .toLowerCase()
      .split(" ") // Split the string into words
      .map(
        (word: any) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ) // Capitalize each word
      .join(" "); // Join the words back into a single string
  }
  return value;
};
