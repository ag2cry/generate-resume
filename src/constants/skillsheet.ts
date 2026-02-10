export const SKILL_SHEET_H1 = {
  PARSONAL_INFO: '個人情報',
  EDUCATIONAL_BACKGROUND: '最終学歴（卒業年月）',
  LICENCE: '資格',
  SKILL: 'スキル',
  SELF_PROMOTION: '自己PR',
  WORK_EXPERIENCE: '職歴',
} as const;

export const PARSONAL_INFO_H2 = {
  NAME: '名前',
  KANA: 'ふりがな',
  BIRTHDAY: '生年月日',
  ADDRESS: '現住所',
  PHONE_NUMBER: '電話番号',
  EMAIL: 'メールアドレス',
} as const;

export const ADDRESS_H2 = {
  ZIP_CODE: '郵便番号',
  ADDRESS: '住所',
  KANA: 'ふりがな',
} as const;

export const EDUCATIONAL_BACKGROUND_H2 = {
  SCHOOL_NAME: '学校名',
  GRADUATION_DATE: '卒業年月',
} as const;

export const LICENCE_H2 = {
  NAME: '資格名',
  DATE: '取得年月',
} as const;

export const SKILL_H2 = {
  OS: 'OS',
  LANGUAGE: '言語',
  FRAMEWORK: 'フレームワーク',
  DATABASE: 'データベース',
  TOOL: 'ツール',
  OTHER: 'その他',
} as const;

export const WORK_EXPERIENCE_H2 = {
  START: '開始',
  END: '終了',
  CONTENT: '業務内容',
  SCALE: '規模',
  POSITION: 'ポジション',
  DEVELOPMENT_ENVIRONMENT: '開発環境（言語、フレームワーク、DB、ツール等）',
  TASK: '担当工程',
} as const;

export const TASK_H2 = {
  REQUIREMENT_DEFINITION: '要件定義',
  BASIC_DESIGN: '基本設計',
  DETAILED_DESIGN: '詳細設計',
  IMPLEMENTATION: '実装',
  UNIT_TEST: '単体テスト',
  INTEGRATION_TEST: '結合テスト',
  SYSTEM_TEST: '総合テスト',
  OPERATION_AND_MAINTENANCE: '運用・保守',
} as const;

export const HEADLINE_REG = {
  H1: {
    str: '# ',
    reg: /^# /,
  },
  H2: {
    str: '## ',
    reg: /^## /,
  },
  H3: {
    str: '### ',
    reg: /^### /,
  },
} as const;
