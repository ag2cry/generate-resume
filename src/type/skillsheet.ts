import {
  ADDRESS_H2,
  EDUCATIONAL_BACKGROUND_H2,
  LICENCE_H2,
  PARSONAL_INFO_H2,
  SKILL_H2,
  SKILL_SHEET_H1,
  TASK_H2,
  WORK_EXPERIENCE_H2,
} from '@/constants/skillsheet';

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

type TrueOrFalse = '' | '〇';
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

export type SkillSheetH1Value =
  (typeof SKILL_SHEET_H1)[keyof typeof SKILL_SHEET_H1];
export type SkillSheetH1Index = {
  [K in SkillSheetH1Value]: number;
};

export type ParsonalInfoH2Value =
  (typeof PARSONAL_INFO_H2)[keyof typeof PARSONAL_INFO_H2];
export type ParsonalInfoH2Index = {
  [K in ParsonalInfoH2Value]: number;
};

export type AddressH2Value = (typeof ADDRESS_H2)[keyof typeof ADDRESS_H2];
export type AddressH2Index = {
  [K in AddressH2Value]: number;
};

export type EducationalBackgroundH2Value =
  (typeof EDUCATIONAL_BACKGROUND_H2)[keyof typeof EDUCATIONAL_BACKGROUND_H2];
export type EducationalBackgroundH2Index = {
  [K in EducationalBackgroundH2Value]: number;
};

export type LicenceH2Value = (typeof LICENCE_H2)[keyof typeof LICENCE_H2];
export type LicenceH2Index = {
  [K in LicenceH2Value]: number;
};

export type SkillH2Value = (typeof SKILL_H2)[keyof typeof SKILL_H2];
export type SkillH2Index = {
  [K in SkillH2Value]: number;
};

export type WorkExperienceH2Value =
  (typeof WORK_EXPERIENCE_H2)[keyof typeof WORK_EXPERIENCE_H2];
export type WorkExperienceH2Index = {
  [K in WorkExperienceH2Value]: number;
};

export type TaskH2Value = (typeof TASK_H2)[keyof typeof TASK_H2];
export type TaskH2Index = {
  [K in TaskH2Value]: number;
};
