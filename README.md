# photo-spec-library

Open, PR-friendly JSON library of ID, exam-registration, visa, and passport photo specifications. Every numeric value is taken from an official issuer page (government or exam body). Fields the official page does not state are `null`, with an explanation in `notes`.

This repository is the data source for the free, local-only ID photo tool planned at [https://tools.bubufu.com/en/id-photo](https://tools.bubufu.com/en/id-photo). The library itself is independent and accepts community corrections.

Related: [https://bubufu.com](https://bubufu.com)

There is no telemetry or analytics in this repository.

## English

### What is in v0.1

Twenty-one entries (`specs/<id>.json`), plus a generated bundle:

- `dist/specs.json` — `{ "version", "generated", "specs" }` with entries sorted by `id`

| id | Category | Region | Status |
| --- | --- | --- | --- |
| `australia-passport` | passport | AU | needs-review |
| `canada-passport` | passport | CA | needs-review |
| `china-passport` | passport | CN | needs-review |
| `china-passport-online` | passport | CN | needs-review |
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

`status` is `verified` only when format, size, file size and background are all stated on the official page. Otherwise `needs-review`.

One entry per file lives in `specs/`. Validate with `npm test`. Rebuild the bundle with `npm run build` (Node 18+, no runtime dependencies).

There is no telemetry or analytics in this repository.
