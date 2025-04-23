import { MenuGroupType, MenuItemType } from "@/types/menu.type";

export const ADMIN_MENU: MenuItemType[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: "Stack",
  },
  {
    title: "Unit Kerja",
    path: "#",
    icon: "TreeView",
    children: [
      { title: "Departemen", path: "/departments" },
      { title: "Bidang Kerja", path: "/fields" },
      { title: "Divisi", path: "/divisions" },
      { title: "Tim Unit", path: "/teams" },
    ],
  },
  { title: "Pengguna", path: "/users", icon: "UsersThree" },
  { title: "Peran / Jabatan", path: "/roles", icon: "IdentificationBadge" },
  { title: "Proyek Pekerjaan", path: "/projects", icon: "PencilRuler" },
  { title: "Perusahaan", path: "/companies", icon: "BuildingOffice" },
];

export const ACCOUNT_MENU: MenuItemType[] = [
  {
    title: "Pengaturan",
    path: "/settings",
    icon: "GearSix",
    children: [
      { title: "Peng. Profil", path: "/settings/profile" },
      { title: "Peng. Notifikasi", path: "/settings/notification" },
    ],
  },
];

export const ADMIN_MENU_GROUP: MenuGroupType[] = [
  {
    id: "data",
    name: "Data Master",
    menu: ADMIN_MENU,
  },
  {
    id: "account",
    name: "Menu Akun",
    menu: ACCOUNT_MENU,
  },
];
