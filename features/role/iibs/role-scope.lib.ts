export const getScopeTypeByRoleID = (
  roleId: number,
): "DIVISION" | "FIELD" | "DEPARTMENT" | undefined => {
  if (roleId === 4) return "DEPARTMENT";
  if (roleId === 5) return "FIELD";
  if (roleId === 6) return "DEPARTMENT";
  if ([7, 8].includes(roleId)) return "DIVISION";

  return;
};
