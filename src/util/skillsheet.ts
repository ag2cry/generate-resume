import {
  EducationalBackground,
  Licence,
  ParsonalInfo,
  Skill,
  SkillSheet,
  WorkExperience,
} from "@/type/skillsheet";

/**
 * 入力された文字列をJSONに変換してSkillSheet型で返却する
 * @param jstr 入力値
 * @returns SkillSheet
 */
export const convToSkillSheet = (jstr: string): SkillSheet => {
  const json = JSON.parse(jstr);
  const parsonalInfo: ParsonalInfo = {
    name: json.名前.漢字,
    kana: json.名前.ふりがな,
    birthday: json.生年月日,
    address: {
      zipCode: json.現住所.郵便番号,
      address: json.現住所.住所,
      kana: json.現住所.ふりがな,
    },
    phoneNumber: json.電話番号,
    email: json.メールアドレス,
  };
  const educationalBackground: EducationalBackground = {
    schoolName: json.最終学歴.学校名,
    department: json.最終学歴["学部・学科"],
    graduationDate: json.最終学歴.卒業年月,
  };
  const licence: Licence[] = json.資格.map(
    (v: { 資格名: string; 取得年月: string }) => {
      return {
        name: v.資格名,
        date: v.取得年月,
      };
    },
  );
  const skill: Skill = {
    os: json.スキル.OS,
    language: json.スキル.言語,
    framework: json.スキル.フレームワーク,
    database: json.スキル.データベース,
    tool: json.スキル.ツール,
    other: json.スキル.その他,
  };
  const workExperience: WorkExperience[] = json.職歴.map(
    (v: {
      開始: string;
      終了: string;
      業務内容: string;
      規模: string;
      ポジション: string;
      開発環境: string;
      担当工程: {
        要件定義: string;
        基本設計: string;
        詳細設計: string;
        実装: string;
        単体テスト: string;
        結合テスト: string;
        総合テスト: string;
        "運用・保守": string;
      };
    }) => {
      return {
        start: v.開始,
        end: v.終了,
        content: v.業務内容,
        scale: v.規模,
        position: v.ポジション,
        developmentEnvironment: v.開発環境,
        task: v.担当工程,
      };
    },
  );
  const selfPromotion: string = json.自己PR;
  return {
    parsonalInfo,
    educationalBackground,
    licence,
    skill,
    selfPromotion,
    workExperience,
  };
};
