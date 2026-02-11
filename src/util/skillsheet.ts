import {
  HEADLINE_REG,
  PARSONAL_INFO_H2,
  SKILL_SHEET_H1,
} from '@/constants/skillsheet';
import {
  Address,
  EducationalBackground,
  Licence,
  ParsonalInfo,
  ParsonalInfoH2Index,
  ParsonalInfoH2Value,
  Skill,
  SkillH2Index,
  SkillH2Value,
  SkillSheet,
  SkillSheetH1Index,
  TaskH2Index,
  WorkExperience,
  WorkExperienceH2Index,
} from '@/type/skillsheet';

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
      '開発環境（言語、フレームワーク、DB、ツール等）': string;
      担当工程: {
        要件定義: string;
        基本設計: string;
        詳細設計: string;
        実装: string;
        単体テスト: string;
        結合テスト: string;
        総合テスト: string;
        '運用・保守': string;
      };
    }) => {
      return {
        start: v.開始,
        end: v.終了,
        content: v.業務内容,
        scale: v.規模,
        position: v.ポジション,
        developmentEnvironment:
          v['開発環境（言語、フレームワーク、DB、ツール等）'],
        task: {
          requirementDefinition: v.担当工程.要件定義,
          basicDesign: v.担当工程.基本設計,
          detailedDesign: v.担当工程.詳細設計,
          implementation: v.担当工程.実装,
          unitTest: v.担当工程.単体テスト,
          integrationTest: v.担当工程.結合テスト,
          systemTest: v.担当工程.総合テスト,
          operationAndMaintenance: v.担当工程['運用・保守'],
        },
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

/**
 * 入力されたMarkdownをSkillSheet型に変換する
 * @param md
 * @returns SkillSheet
 */
export const parseMd = (md: string): SkillSheet => {
  // 空行を除いて配列化
  const lines = md.split('\n').filter((v) => v !== '');

  // 大項目のインデックスを抽出
  const sections: SkillSheetH1Index = getHeadLineIndex<SkillSheetH1Index>(
    /^# /,
    lines,
  );
  const h1Index = Object.values(sections).map((v) => Number(v));

  // 個人情報を抽出
  const parsonalInfoLines = lines.slice(
    sections[SKILL_SHEET_H1.PARSONAL_INFO] + 1,
    h1Index.find((v) => v > sections[SKILL_SHEET_H1.PARSONAL_INFO]),
  );
  const parsonalInfo = createParspnalInfo(parsonalInfoLines);

  // 最終学歴を抽出
  const educationalBackgroundLines = lines
    .slice(
      sections[SKILL_SHEET_H1.EDUCATIONAL_BACKGROUND] + 1,
      h1Index.find((v) => v > sections[SKILL_SHEET_H1.EDUCATIONAL_BACKGROUND]),
    )
    .join();
  const educationalBackground = createEducationalBackground(
    educationalBackgroundLines,
  );

  // 資格を抽出
  const licenceLines = lines.slice(
    sections[SKILL_SHEET_H1.LICENCE] + 1,
    h1Index.find((v) => v > sections[SKILL_SHEET_H1.LICENCE]),
  );
  const licence = createLicence(licenceLines);

  // スキルを抽出
  const skillLines = lines.slice(
    sections[SKILL_SHEET_H1.SKILL] + 1,
    h1Index.find((v) => v > sections[SKILL_SHEET_H1.SKILL]),
  );
  const skill = createSkill(skillLines);

  // 自己PRを抽出
  const selfPromotion = lines
    .slice(
      sections[SKILL_SHEET_H1.SELF_PROMOTION] + 1,
      h1Index.find((v) => v > sections[SKILL_SHEET_H1.SELF_PROMOTION]),
    )
    .join('\n');

  // 職歴を抽出
  const workExperienceLines = lines.slice(
    sections[SKILL_SHEET_H1.WORK_EXPERIENCE] + 1,
    h1Index.find((v) => v > sections[SKILL_SHEET_H1.WORK_EXPERIENCE]),
  );
  const workExperience = createWorkExperience(workExperienceLines);

  console.log({
    parsonalInfo,
    educationalBackground,
    licence,
    skill,
    selfPromotion,
    workExperience,
  });
  return {
    parsonalInfo,
    educationalBackground,
    licence,
    skill,
    selfPromotion,
    workExperience,
  };
};

/**
 * Headlineの行番号を取得する
 * @param reg Headlineの正規表現
 * @param lines テキスト配列
 * @returns Headlineの行番号
 */
const getHeadLineIndex = <T>(reg: RegExp, lines: string[]): T => {
  return lines.reduce((acc, cur, idx) => {
    let obj = {};
    if (reg.test(cur)) {
      obj = { [cur.replace(reg, '')]: idx };
    }
    return Object.assign(acc, obj);
  }, {}) as T;
};

/**
 * 個人情報をオブジェクトに変換する
 * @param lines
 * @returns ParsonalInfo
 */
const createParspnalInfo = (lines: string[]): ParsonalInfo => {
  const h2Index: ParsonalInfoH2Index = getHeadLineIndex<ParsonalInfoH2Index>(
    HEADLINE_REG.H2.reg,
    lines,
  );

  return lines.reduce((acc, cur, idx) => {
    const obj: { [key: string]: string } = {};
    if (HEADLINE_REG.H2.reg.test(cur)) {
      const key: ParsonalInfoH2Value = convMDnotationToStr<ParsonalInfoH2Value>(
        HEADLINE_REG.H2.reg,
        cur,
      );
      obj[key] = '';
    } else {
      const key = Object.keys(h2Index).find((keyName, i) => {
        const nextKeyName = Object.keys(h2Index)[i + 1];
        return h2Index[keyName] < idx && h2Index[nextKeyName] > idx;
      }) as ParsonalInfoH2Value;
      if (key === PARSONAL_INFO_H2.ADDRESS) {
        obj[key] = acc[key].length === 0 ? [cur] : [...acc[key], cur];
      } else {
        obj[key] = cur;
      }
    }
    return Object.assign(acc, obj);
  }, {});
};

/**
 * 最終学歴をオブジェクトに変換する
 * @param line
 * @returns EducationalBackground
 */
const createEducationalBackground = (line: string): EducationalBackground => {
  const value = line.match(/^\s*([^（(]+?)\s*[（(]([^）)]+)[）)]\s*$/);
  return {
    schoolName: value?.[1] ?? '',
    graduationDate: value?.[2] ?? '',
  };
};

/**
 * 資格を配列に変換する
 * @param lines
 * @returns Licence[]
 */
const createLicence = (lines: string[]): Licence[] => {
  return lines
    .filter((v) => /^\s*- /g.test(v))
    .map((v) => {
      const line = convMDnotationToStr<string>(/^- /g, v).split(/\s/);
      return {
        name: line[0],
        date: line[1],
      };
    });
};

/**
 * スキルをオブジェクトに変換する
 * @param lines
 * @returns Skill
 */
const createSkill = (lines: string[]): Skill => {
  const h2Index = getHeadLineIndex<SkillH2Index>(/^## /, lines);
  const h2Len = Object.keys(h2Index).length;

  return lines.reduce((acc, cur, idx) => {
    const obj: { [key: string]: string[] } = {};
    if (HEADLINE_REG.H2.reg.test(cur)) {
      const key: SkillH2Value = convMDnotationToStr<SkillH2Value>(
        HEADLINE_REG.H2.reg,
        cur,
      );
      obj[key] = [];
    } else {
      const key = Object.keys(h2Index).find((keyName, i) => {
        const j = i + 1 >= h2Len ? h2Len - 1 : i + 1;
        const nextKeyName = Object.keys(h2Index)[j];
        return (
          (h2Index[keyName] === Object.values(h2Index).at(-1) &&
            h2Index[nextKeyName] === Object.values(h2Index).at(-1)) ||
          (h2Index[keyName] < idx && h2Index[nextKeyName] > idx)
        );
      });
      obj[key] =
        acc[key].length === 0
          ? [cur.replace('- ', '')]
          : [...acc[key], cur.replace('- ', '')];
    }
    return Object.assign(acc, obj);
  }, {});
};

/**
 * 職歴を配列に変換する
 * @param lines
 * @returns WorkExperience[]
 */
const createWorkExperience = (lines: string[]): WorkExperience[] => {
  const h2Index: WorkExperienceH2Index =
    getHeadLineIndex<WorkExperienceH2Index>(/^## /, lines);
  const h2Len = Object.keys(h2Index).length;
  const h3Index: TaskH2Index = getHeadLineIndex<TaskH2Index>(/^### /, lines);
  const h3Len = Object.keys(h3Index).length;

  const workExperiences = lines.reduce((acc, cur, idx) => {
    const obj = {};
    if (cur.startsWith('## ')) {
      const key: string = cur.replace('## ', '');
      obj[key] = [];
    } else {
      const key = Object.keys(h2Index).find((keyName, i) => {
        const j = i + 1 >= h2Len ? h2Len - 1 : i + 1;
        const nextKeyName = Object.keys(h2Index)[j];
        return (
          (h2Index[keyName] === Object.values(h2Index).at(-1) &&
            h2Index[nextKeyName] === Object.values(h2Index).at(-1)) ||
          (h2Index[keyName] < idx && h2Index[nextKeyName] > idx)
        );
      });
      obj[key] = acc[key].length === 0 ? [cur] : [...acc[key], cur];
    }

    return Object.assign(acc, obj);
  }, []);

  return Object.keys(workExperiences).map((w, l) => {
    const obj = {};
    if (l === 0) {
      const date = w.replace(/\[*/g, '').replace(/\]*/g, '');
      obj['start'] = date.split(' ~ ')[0];
      obj['end'] = date.split(' ~ ')[1];
    }
    return workExperiences[w].reduce((acc, cur, index) => {
      if (cur.startsWith('### ')) {
        const key: string = cur.replace('### ', '');
        obj[key] = [];
      } else {
        const idx = index + 1;
        const key = Object.keys(h3Index).find((keyName, i) => {
          const j = i + 1 >= h3Len ? h3Len - 1 : i + 1;
          const nextKeyName = Object.keys(h3Index)[j];
          return (
            (h3Index[keyName] === Object.values(h3Index).at(-1) &&
              h3Index[nextKeyName] === Object.values(h3Index).at(-1)) ||
            (h3Index[keyName] === Object.values(h3Index).at(0) &&
              h3Index[nextKeyName] === Object.values(h3Index).at(0)) ||
            (h3Index[keyName] < idx && h3Index[nextKeyName] > idx)
          );
        });
        if (key === '担当工程') {
          obj[key] = [...acc[key], cur];
        } else {
          obj[key] = acc[key].length === 0 ? [cur] : [...acc[key], cur];
        }
      }
      return Object.assign(acc, obj);
    }, {});
  });
};

/**
 * Markdown記法 -> 文字列
 * @param reg 記号の正規表現
 * @param str 文字列
 * @returns 文字列
 */
const convMDnotationToStr = <T>(reg: RegExp, str: string): T => {
  return str.replace(reg, '') as T;
};
