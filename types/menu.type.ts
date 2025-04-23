import { z } from "zod";
import * as PhosphorIcons from "@phosphor-icons/react";

const SingleMenuItemSchema = z.object({
  title: z.string(),
  path: z.string(),
});

export const Icons = PhosphorIcons;
export type IconName = keyof typeof PhosphorIcons;

export const MenuItemSchema = SingleMenuItemSchema.extend({
  icon: z.enum(Object.keys(PhosphorIcons) as [IconName, ...IconName[]]),
  children: z.array(SingleMenuItemSchema).optional(),
});

export type MenuItemType = z.infer<typeof MenuItemSchema>;

export type MenuGroupType = {
  id: string;
  name: string;
  menu: MenuItemType[];
};
