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
    name: "Koordinator Bidang",
    level: 5,
  },
  {
    id: 6,
    name: "Bendahara",
    level: 5,
  },
  {
    id: 7,
    name: "Kepala Divisi",
    level: 7,
  },
  {
    id: 8,
    name: "Staff",
    level: 8,
  },
];

export const USERS = [
  {
    id: 1,
    roleId: 1,
    email: "admin@kiaradirectory.com",
    phone: "085123456789",
    password: "123456",
    name: "Admin",
  },
  {
    id: 2,
    roleId: 2,
    email: "achmadzabir@kiaradirectory.com",
    phone: "085987654321",
    password: "123456",
    name: "CEO",
  },
  {
    id: 3,
    roleId: 4,
    email: "manager@kiaradirectory.com",
    phone: "085987321654",
    password: "123456",
    name: "Manager 1",
  },
  {
    id: 4,
    roleId: 5,
    email: "koordinator@kiaradirectory.com",
    phone: "085654987321",
    password: "123456",
    name: "Koordinator Bidang 1 1",
  },
  {
    id: 5,
    roleId: 8,
    email: "staff@kiaradirectory.com",
    phone: "085654321987",
    password: "123456",
    name: "Staff 1",
  },
];

export const DEPARTMENTS = [
  {
    id: 1,
    name: "Keuangan",
    code: "FINANCE",
  },
  {
    id: 2,
    name: "Kantor",
    code: "OFFICE",
  },
  {
    id: 3,
    name: "Teknik",
    code: "ENGINEERING",
  },
];

export const FIELDS = [
  {
    name: "Bidang Lingkungan",
    code: "ENVIRONMENTAL",
    departmentId: 3,
  },
  {
    name: "Bidang Tata Ruang",
    code: "SPATIAL_PLANNING",
    departmentId: 3,
  },
];

export const DIVISIONS = [
  {
    name: "Umum",
    departmentId: 2,
    fieldId: null,
    code: "GENERAL",
  },
  {
    name: "Lelang",
    departmentId: 2,
    fieldId: null,
    code: "AUCTION",
  },
  {
    name: "Informasi & Teknologi",
    departmentId: 2,
    fieldId: null,
    code: "IT",
  },
  {
    name: "Transportasi",
    departmentId: 2,
    fieldId: null,
    code: "TRANSPORTATION",
  },
  {
    name: "Legal Officer & Monitoring Progress",
    departmentId: 2,
    fieldId: null,
    code: "LOMP",
  },
  {
    name: "Perencanaan Wilayah & Kota",
    departmentId: 2,
    fieldId: 1,
    code: "PWK",
  },
  {
    name: "Studi",
    departmentId: 2,
    fieldId: 1,
    code: "STUDY",
  },
  {
    name: "Perumahan & Kawasan Permukiman",
    departmentId: 2,
    fieldId: 1,
    code: "PERKIM",
  },
  {
    name: "Lingkungan",
    departmentId: 2,
    fieldId: 2,
    code: "ENVIRONMENTAL",
  },
  {
    name: "Konstruksi",
    departmentId: 2,
    fieldId: 2,
    code: "CONSTUCTION",
  },
  {
    name: "Analisis Mengenai Dampak Lingkungan",
    departmentId: 2,
    fieldId: 2,
    code: "AMDAL",
  },
  {
    name: "Survey & Drafter",
    departmentId: 2,
    fieldId: null,
    code: "SURVEY_DRAFTER",
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
