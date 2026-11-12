# photo-spec-library

![photo-spec-library](../.github/social-preview.png)

[English](README.en.md) · [简体中文](README.zh-CN.md) · [繁體中文（臺灣）](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

## Use official photo requirements as structured data

Read a single JSON specification or the combined bundle. Check the issuer URL and source check date before submitting a photo; a repository status is not acceptance by an authority.

### Passport, visa and exam photo requirements

| → | |
| --- | --- |
| [Read the bundle](../dist/specs.json) | JSON / source |
| [Browse individual specifications](../specs/) | Browse |

Missing values remain null. Do not fill gaps by guessing. This update translates the reading guide, not every data field.

### Validate locally

```bash
npm test
npm run build
```

You may reuse and modify this library under its license; issuer rules still control the actual application.<br>(MIT)

[Repository README](../README.md)
