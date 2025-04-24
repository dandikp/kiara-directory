export const removeTrailingSlash = (input: string): string => {
  return input.replace(/\/$/, "");
};

export const formatStringWithSpaces = (input: string): string => {
  let output = input.replace(/[-_]/g, " ");
  output = output.replace(/([a-z])([A-Z])/g, "$1 $2");
  output = output
    .replace(/(\d)([a-zA-Z])/g, "$1 $2")
    .replace(/([a-zA-Z])(\d)/g, "$1 $2");

  return output.replace(/\b\w/g, (char) => char.toUpperCase());
};
