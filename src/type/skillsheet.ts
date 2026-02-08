export type ParsonalInfo = {
  name: string;
  kana: string;
  birthday: string;
  address: Address;
  phoneNumber: string;
  email: string;
};

export type Address = {
  zipCode: string;
  address: string;
  kana: string;
};

export type EducationalBackground = {
  schoolName: string;
  department: string;
  graduationDate: string;
};

export type Licence = {
  name: string;
  date: string;
};

export type Skill = {
  os: string[];
  language: string[];
  framework: string[];
  database: string[];
  tool: string[];
  other: string[];
};

type TrueOrFalse = "" | "〇";
export type Task = {
  requirementsDefinition: TrueOrFalse;
  basicDesign: TrueOrFalse;
  detailedDesign: TrueOrFalse;
  implementation: TrueOrFalse;
  unitTest: TrueOrFalse;
  integrationTest: TrueOrFalse;
  systemTest: TrueOrFalse;
  operationAndMaintenance: TrueOrFalse;
};

export type WorkExperience = {
  start: string;
  end: string;
  content: string;
  scale: string;
  position: string;
  developmentEnvironment: string;
  task: Task;
};

export type SkillSheet = {
  parsonalInfo: ParsonalInfo;
  educationalBackground: EducationalBackground;
  selfPromotion: string;
  licence: Licence[];
  skill: Skill;
  workExperience: WorkExperience[];
};
