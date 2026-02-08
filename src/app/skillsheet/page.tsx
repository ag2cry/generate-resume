"use client";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import JSONtemplate from "@/app/skillsheet/template.json";
import { SkillSheet, WorkExperience } from "@/type/skillsheet";
import { convToSkillSheet } from "@/util/skillSheet";
import { json } from "@codemirror/lang-json";

export default function SkillSheetPages() {
  const [data, setData] = useState<string>(
    JSON.stringify(JSONtemplate, null, 2),
  );
  const [parsedData, setParsedData] = useState<SkillSheet>(
    convToSkillSheet(JSON.stringify(JSONtemplate)),
  );

  const parseData = (data: string): SkillSheet | null => {
    try {
      const parsed: SkillSheet = convToSkillSheet(data);
      return parsed;
    } catch (e) {
      // TODO: エラー表示を整備する
      return null;
    }
  };

  const handleSetData = (data: string) => {
    setData(data);
    const parsedData = parseData(data);
    if (parsedData) setParsedData(parsedData);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await global.navigator.clipboard.writeText(text);
    } catch (e) {
      // TODO: エラー表示を整備する
      alert("クリップボードにコピーできませんでした");
    }
  };

  const {
    parsonalInfo,
    educationalBackground,
    licence,
    skill,
    selfPromotion,
    workExperience,
  } = parsedData;
  return (
    <div>
      <main className="p-2">
        <h1>スキルシート</h1>
        <button className="border mb-2" onClick={() => copyToClipboard(data)}>
          クリップボードにコピー
        </button>
        <div className="flex">
          <div className="mr-2">
            <CodeMirror
              className="border"
              value={data}
              height="100vh"
              onChange={(data) => {
                handleSetData(data);
              }}
              extensions={[json()]}
            />
          </div>
          <div>
            <h2>プレビュー</h2>
            <div className="mb-2">
              <table className="border w-full">
                <tbody>
                  <tr>
                    <td className="border px-2">
                      <div className="flex items-center">
                        <div className="text-xs w-16">ふりがな</div>
                        <div className="text-xs">{parsonalInfo.kana}</div>
                      </div>
                      <div className="flex items-end">
                        <div className="text-xs w-16 mb-1">氏名</div>
                        <div className="text-xl font-bold">
                          {parsonalInfo.name}
                        </div>
                      </div>
                    </td>
                    <td className="border px-2">
                      <div className="text-xs">生年月日</div>
                      <div>{parsonalInfo.birthday}</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2" colSpan={2}>
                      <div className="flex items-center">
                        <div className="text-xs w-16">ふりがな</div>
                        <div className="text-xs">
                          {parsonalInfo.address.kana}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-xs w-16">現住所</div>
                        <div>
                          <div className="text-sm">
                            〒{parsonalInfo.address.zipCode}
                          </div>
                          <div>{parsonalInfo.address.address}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 w-1/2">
                      <div className="text-xs">電話番号</div>
                      <div>{parsonalInfo.phoneNumber}</div>
                    </td>
                    <td className="border px-2 w-1/2">
                      <div className="text-xs">メールアドレス</div>
                      <div>{parsonalInfo.email}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mb-2">
              <table className="border w-full">
                <tr>
                  <th className="border">学校名</th>
                  <td className="border">{educationalBackground.schoolName}</td>
                </tr>
                <tr>
                  <th className="border">学部・学科</th>
                  <td className="border">{educationalBackground.department}</td>
                </tr>
                <tr>
                  <th className="border">卒業年月</th>
                  <td className="border">
                    {educationalBackground.graduationDate}
                  </td>
                </tr>
              </table>
            </div>
            <div className="mb-2">
              <table className="border w-full">
                <tr>
                  <th className="border">取得年月</th>
                  <th className="border">資格名</th>
                </tr>
                {licence.map((v, k) => (
                  <tr key={k}>
                    <td className="border">{v.date}</td>
                    <td className="border">{v.name}</td>
                  </tr>
                ))}
              </table>
            </div>
            <div className="mb-2">
              <table className="border w-full">
                <tr>
                  <th className="border">OS</th>
                  <td className="border">{skill.os}</td>
                </tr>
                <tr>
                  <th className="border">言語</th>
                  <td className="border">{skill.language}</td>
                </tr>
                <tr>
                  <th className="border">フレームワーク</th>
                  <td className="border">{skill.framework}</td>
                </tr>
                <tr>
                  <th className="border">データベース</th>
                  <td className="border">{skill.database}</td>
                </tr>
                <tr>
                  <th className="border">ツール</th>
                  <td className="border">{skill.tool}</td>
                </tr>
                <tr>
                  <th className="border">その他</th>
                  <td className="border">{skill.other}</td>
                </tr>
              </table>
            </div>
            <div className="border mb-2">{selfPromotion}</div>
            <table className="border">
              <thead className="border">
                <tr>
                  <th className="border" rowSpan={2}>
                    期間
                  </th>
                  <th className="border" rowSpan={2}>
                    業務内容
                  </th>
                  <th className="border" rowSpan={2}>
                    規模
                  </th>
                  <th className="border" rowSpan={2}>
                    ポジション
                  </th>
                  <th className="border" rowSpan={2}>
                    開発環境（言語、フレームワーク、DB、ツール等）
                  </th>
                  <th className="border" colSpan={8}>
                    担当工程
                  </th>
                </tr>
                <tr>
                  <th className="border">要件定義</th>
                  <th className="border">基本設計</th>
                  <th className="border">詳細設計</th>
                  <th className="border">実装</th>
                  <th className="border">単体テスト</th>
                  <th className="border">結合テスト</th>
                  <th className="border">総合テスト</th>
                  <th className="border">運用・保守</th>
                </tr>
              </thead>
              <tbody>
                {workExperience.map((v: WorkExperience, k: number) => {
                  return (
                    <tr key={k}>
                      <td className="border">
                        {v.start}～{v.end}
                      </td>
                      <td className="border">{v.content}</td>
                      <td className="border">{v.scale}</td>
                      <td className="border">{v.position}</td>
                      <td className="border">{v.developmentEnvironment}</td>
                      {Object.values(v.task).map((v, k) => (
                        <td className="border" key={k}>
                          {v ? "〇" : ""}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
