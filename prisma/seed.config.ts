export const ROLES = [
  {
    id: 1,
    name: "System Administrator",
    level: 1,
  },
  {
    id: 2,
    name: "Direktur Utama",
    level: 2,
  },
  {
    id: 3,
    name: "Direktur",
    level: 3,
  },
  {
    id: 4,
    name: "Manager",
    level: 4,
  },
  {
    id: 5,
    name: "Asisten Manager",
    level: 5,
  },
  {
    id: 6,
    name: "Supervisor",
    level: 6,
  },
  {
    id: 7,
    name: "Staff",
    level: 7,
  },
];

export const USERS = [
  {
    id: 1,
    roleId: 1,
    email: "admin@kinarya.com",
    phone: "085123456789",
    password: "123456",
    name: "Admin",
  },
  {
    id: 2,
    roleId: 2,
    email: "ceo@kinarya.com",
    phone: "085987654321",
    password: "123456",
    name: "CEO",
  },
  {
    id: 3,
    roleId: 4,
    email: "manager@kinarya.com",
    phone: "085987321654",
    password: "123456",
    name: "Manager 1",
  },
  {
    id: 4,
    roleId: 6,
    email: "koordinator@kinarya.com",
    phone: "085654987321",
    password: "123456",
    name: "Koordinator 1",
  },
  {
    id: 5,
    roleId: 7,
    email: "staff@kinarya.com",
    phone: "085654321987",
    password: "123456",
    name: "Staff 1",
  },
];

export const DIVISIONS = [
  {
    id: 1,
    name: "Keuangan & Akuntansi",
    code: "FINANCE",
  },
  {
    id: 2,
    name: "Divisi Contoh 2",
    code: "EX_2",
  },
];

export const COMPANIES = [
  {
    id: 1,
    name: "PT Kinarya Alam Raya",
  },
  {
    id: 2,
    name: "CV Digdaya Mahardika",
  },
];
