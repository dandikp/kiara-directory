export const removeTrailingSlash = (input: string): string => {
  return input.replace(/\/$/, "");
};
