export const capitalFirstLetters = (input: any) => {
  if (!input) return ""; // Handle empty input
  return input
    .toLowerCase()
    .split(" ") // Split the string into words
    .map(
      (word: any) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ) // Capitalize each word
    .join(" "); // Join the words back into a single string
};
