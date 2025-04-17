export const isActivePath = (path: string, keyword: string): boolean => {
  const currentPath = path.split("/").filter((segment) => segment !== "");
  const currentPathname = keyword
    .split("/")
    .filter((segment) => segment !== "");

  const compareLength = Math.min(3, currentPathname.length, currentPath.length);

  for (let i = 0; i < compareLength; i++) {
    if (currentPathname[i] !== currentPath[i]) {
      return false;
    }
  }

  return true;
};
