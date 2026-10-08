# photo-spec-library

Open, PR-friendly JSON library of ID, exam-registration, visa, and passport photo specifications. Every numeric value is taken from an official issuer page (government or exam body). Fields the official page does not state are `null`, with an explanation in `notes`.

This repository is the data source for the free, local-only ID photo tool planned at [https://tools.bubufu.com/en/id-photo](https://tools.bubufu.com/en/id-photo). The library itself is independent and accepts community corrections.

Related: [https://bubufu.com](https://bubufu.com) · [@laofu on X](https://x.com/laofu)

There is no telemetry or analytics in this repository.

## English

### What is in v0.1

Twenty entries (`specs/<id>.json`), plus a generated bundle:

- `dist/specs.json` — `{ "version", "generated", "specs" }` with entries sorted by `id`

| id | Category | Region | Status |
| --- | --- | --- | --- |
| `australia-passport` | passport | AU | needs-review |
| `canada-passport` | passport | CA | needs-review |
| `china-passport` | passport | CN | needs-review |
| `cn-civil-service` | exam | CN | needs-review |
| `cn-legal-professional` | exam | CN | needs-review |
| `cpa-cn` | exam | CN | needs-review |
| `hsk` | exam | CN | needs-review |
| `japan-passport` | passport | JP | needs-review |
| `japan-visa` | visa | JP | needs-review |
| `jlpt` | exam | JP | needs-review |
| `ntce` | exam | CN | needs-review |
| `pets` | exam | CN | needs-review |
| `schengen-visa` | visa | INTL | needs-review |
| `singapore-passport` | passport | SG | needs-review |
| `topik` | exam | KR | needs-review |
| `uk-passport-digital` | passport | GB | needs-review |
| `uk-visa` | visa | GB | needs-review |
| `us-passport` | passport | US | needs-review |
| `us-visa-ds-160` | visa | US | verified |
| `wsk` | exam | CN | needs-review |

`needs-review` means at least one schema field is unspecified on the official page (left `null`) or sources disagree. It does not mean the filled numbers were guessed.

Not included in v0.1 because the official issuer page does not publish a registration-photo file spec: IELTS, TOEFL, GRE, GMAT (photo taken at check-in), CET-4/6 (school-supplied image, no national upload size), NCRE, Putonghua (no national pixel/KB rule), and the national graduate-entrance exam (rules vary by provincial registration site).

### Schema

Contract: `schema/photo-spec.schema.json`. Field names match the shared contract used by vendors of this data. Do not rename or remove fields. Optional extensions currently used:

| Field | Why |
| --- | --- |
| `photo.pixels.min_height` / `max_height` | Official pages often give a height range, not only a width range. |
| `photo.print_mm.min_width` / `max_width` / `min_height` / `max_height` | Official print size is sometimes a range (for example Australia 35–40 × 45–50 mm). |
| `photo.head_ratio` may be `null` | Official page gives no chin-to-crown ratio. |
| `photo.background` may be `[]` | Official text does not name a colour that can be mapped to `#RRGGBB` without inventing a value. When white is named, `#FFFFFF` is stored. Other named colours without a published hex are described in `notes` only. |
| `name.ja` / `name.ko` / `name.zh-Hant` | Optional extra labels. `en` and `zh` remain required. |

`status` is `verified` only when the filled numbers come from the official page and nothing material is in conflict. Otherwise `needs-review`.

### Use the bundle

Copy `dist/specs.json`, or fetch the raw file from this repository once it is on the default branch, for example:

```text
https://raw.githubusercontent.com/jammyfu/photo-spec-library/main/dist/specs.json
```

One entry per file lives in `specs/`. Validate with `npm test`. Rebuild the bundle with `npm run build` (Node 18+, no runtime dependencies).

### Licence

Code and repository files are under the MIT License (see `LICENSE`). Specification records are facts collected from official issuer pages. Contributions are under the same licence.

### Development

```bash
npm test
npm run build
```

---

## 中文

面向证件照 / 考试报名照 / 签证与护照照片的开源 JSON 规格库。每个数字都来自官方机构（政府或考试主办方）页面；官方未写的字段保持 `null`，并在 `notes` 说明。

本库为计划中的本地、免费证件照工具 [https://tools.bubufu.com/en/id-photo](https://tools.bubufu.com/en/id-photo) 提供数据，库本身独立维护、接受更正。相关链接：[https://bubufu.com](https://bubufu.com)、[X @laofu](https://x.com/laofu)。

本仓库不含任何遥测或分析。

### v0.1 内容

二十条 `specs/<id>.json`，以及生成的 `dist/specs.json`（含 `version`、`generated`、按 `id` 排序的 `specs`）。上表列出了全部 id、类别、地区与状态。

`needs-review` 表示官方页至少有一个字段未写明（已留 `null`），或不同官方文本有冲突，**不是**自行编造已填写的数字。

未收入 v0.1（官方未公布报名照文件规格）：IELTS / TOEFL / GRE / GMAT（考场采集）、英语四六级（学校学籍照片、国家页无上传尺寸）、NCRE、普通话水平测试（无全国统一像素/KB）、全国硕士研究生招生考试（各省报考点规则不一）。

### 模式与用法

字段合同见 `schema/photo-spec.schema.json`。不要改名或删除已有字段。可选扩展见上文英文表。

使用方式：复制 `dist/specs.json`，或在默认分支上用 raw URL 拉取。一条规格一个文件，放在 `specs/`。`npm test` 做校验，`npm run build` 生成汇总（Node 18+，无运行时依赖）。

### 许可

代码与仓库文件为 MIT（见 `LICENSE`）。规格记录是从官方来源整理的事实。贡献适用同一许可。
