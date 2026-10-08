# Contributing

## English

### Add or correct a spec

1. One file per spec: `specs/<id>.json`. `id` is kebab-case and must match the filename.
2. Follow `schema/photo-spec.schema.json`. Do not rename or remove contract fields. Optional fields are listed in the README.
3. Every number must appear on an **official issuer page** (government or exam body). Do not use blogs, photo-app sites, or unofficial aggregators.
4. If the official page does not state a value, set the field to `null` and explain in `notes.en` and `notes.zh`. Set `status` to `needs-review` when anything is uncertain or sources conflict.
5. Add at least one `https` source with `url`, `title`, and `checked` (ISO date).
6. Provide `name.en` and `name.zh`.
7. Run:

```bash
npm test
npm run build
```

Commit the updated `dist/specs.json`.

### Pull requests

Use the pull-request template. Keep the change to the spec(s) you are adding or correcting, plus the regenerated bundle. Link the official page in the PR body.

### Corrections

Open an issue with the “spec correction” template if you found a wrong number or a dead official URL.

Do not add telemetry, analytics, or tracking of any kind.

---

## 中文

### 新增或更正一条规格

1. 一条规格一个文件：`specs/<id>.json`。`id` 为 kebab-case，并与文件名一致。
2. 遵守 `schema/photo-spec.schema.json`。不要改名或删除合同字段。可选字段见 README。
3. 每个数字必须出现在**官方机构页面**（政府或考试主办方）。不要使用博客、证件照 App 或非官方汇总站。
4. 官方未写的值设为 `null`，并在 `notes.en` / `notes.zh` 说明。有不确定或来源冲突时，`status` 设为 `needs-review`。
5. 至少一条 `https` 来源，含 `url`、`title`、`checked`（ISO 日期）。
6. 必须有 `name.en` 与 `name.zh`。
7. 运行：

```bash
npm test
npm run build
```

并提交更新后的 `dist/specs.json`。

### 拉取请求

使用 PR 模板。只改你新增或更正的规格，以及重新生成的汇总文件。在 PR 正文附上官方链接。

### 纠错

发现数字错误或官方链接失效时，用 “spec correction” 议题模板开 issue。

不要加入任何遥测、分析或追踪。
