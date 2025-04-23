"use client";

import { z } from "zod";
import * as PhosphorIcons from "@phosphor-icons/react";

const SingleMenuItemSchema = z.object({
  name: z.string(),
  path: z.string(),
});

type IconName = keyof typeof PhosphorIcons;

const MenuItemSchema = SingleMenuItemSchema.extend({
  icon: z.enum(Object.keys(PhosphorIcons) as [IconName, ...IconName[]]),
  children: z.array(SingleMenuItemSchema).optional(),
});

export const ADMIN_MENU = [{}];
