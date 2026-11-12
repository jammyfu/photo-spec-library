# photo-spec-library

![Project header](.github/social-preview.png)

[English](docs/README.en.md) · [简体中文](docs/README.zh-CN.md) · [繁體中文（臺灣）](docs/README.zh-TW.md) · [日本語](docs/README.ja.md) · [한국어](docs/README.ko.md)

<!-- geo:badges -->
[![License](https://img.shields.io/github/license/jammyfu/photo-spec-library)](LICENSE) [![CI](https://github.com/jammyfu/photo-spec-library/actions/workflows/ci.yml/badge.svg)](https://github.com/jammyfu/photo-spec-library/actions/workflows/ci.yml) [![Data: JSON](https://img.shields.io/badge/data-JSON-lightgrey)](dist/specs.json)


Open, PR-friendly JSON library of ID, exam-registration, visa, and passport photo specifications. Every numeric value is taken from an official issuer page (government or exam body). Fields the official page does not state are `null`, with an explanation in `notes`.

This repository is the data source for the free, local-only ID photo tool planned at [https://tools.bubufu.com/en/id-photo](https://tools.bubufu.com/en/id-photo). The library itself is independent and accepts community corrections.

Related: [https://bubufu.com](https://bubufu.com)

There is no telemetry or analytics in this repository.

## Start here

| Need | Entry |
| --- | --- |
| Integrate requirements in an app | [JSON bundle](dist/specs.json) · [schema](schema/photo-spec.schema.json) |
| Verify one requirement | Open a linked record below; inspect `sources` and its check date |
| Correct a requirement | [Contribution guide](CONTRIBUTING.md) with the official issuer URL |

These are recorded requirements, not an approval guarantee. Recheck the official issuer before applying.

## Catalog

### What is in v0.1

Twenty-one entries (`specs/<id>.json`), plus a generated bundle:

- `dist/specs.json` — `{ "version", "generated", "specs" }` with entries sorted by `id`

Alphabetical order, not a popularity ranking.

| id | Category | Region | Status |
| --- | --- | --- | --- |
| [australia-passport](specs/australia-passport.json) | passport | AU | needs-review |
| [canada-passport](specs/canada-passport.json) | passport | CA | needs-review |
| [china-passport](specs/china-passport.json) | passport | CN | needs-review |
| [china-passport-online](specs/china-passport-online.json) | passport | CN | needs-review |
| [cn-civil-service](specs/cn-civil-service.json) | exam | CN | needs-review |
| [cn-legal-professional](specs/cn-legal-professional.json) | exam | CN | needs-review |
| [cpa-cn](specs/cpa-cn.json) | exam | CN | needs-review |
| [hsk](specs/hsk.json) | exam | CN | needs-review |
| [japan-passport](specs/japan-passport.json) | passport | JP | needs-review |
| [japan-visa](specs/japan-visa.json) | visa | JP | needs-review |
| [jlpt](specs/jlpt.json) | exam | JP | needs-review |
| [ntce](specs/ntce.json) | exam | CN | needs-review |
| [pets](specs/pets.json) | exam | CN | needs-review |
| [schengen-visa](specs/schengen-visa.json) | visa | INTL | needs-review |
| [singapore-passport](specs/singapore-passport.json) | passport | SG | needs-review |

<details>
<summary>Show 6 more specifications / 查看其余 6 项</summary>

| id | Category | Region | Status |
| --- | --- | --- | --- |
| [topik](specs/topik.json) | exam | KR | needs-review |
| [uk-passport-digital](specs/uk-passport-digital.json) | passport | GB | needs-review |
| [uk-visa](specs/uk-visa.json) | visa | GB | needs-review |
| [us-passport](specs/us-passport.json) | passport | US | needs-review |
| [us-visa-ds-160](specs/us-visa-ds-160.json) | visa | US | verified |
| [wsk](specs/wsk.json) | exam | CN | needs-review |

</details>

`needs-review` means at least one schema field is unspecified on the official page (left `null`) or sources disagree. It does not mean the filled numbers were guessed.

`status` is `verified` only when format, size, file size and background are all stated on the official page. Otherwise `needs-review`.

One entry per file lives in `specs/`. Validate with `npm test`. Rebuild the bundle with `npm run build` (Node 18+, no runtime dependencies).

There is no telemetry or analytics in this repository.
