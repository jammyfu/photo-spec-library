# photo-spec-library

![photo-spec-library](../.github/social-preview.png)

[English](README.en.md) · [简体中文](README.zh-CN.md) · [繁體中文（臺灣）](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

## 把官方证件照要求变成可用的数据

读取单条 JSON 或合并数据包。提交照片前核对签发机构网址与来源核验日期；仓库状态不等于官方保证通过。

### 护照、签证、考试报名照片要求

| → | |
| --- | --- |
| [读取数据包](../dist/specs.json) | JSON / source |
| [浏览单项规格](../specs/) | Browse |

缺失值保持 null，不凭经验补齐。本次翻译的是使用指南，不代表全部数据字段已翻译。

### 本地校验

```bash
npm test
npm run build
```

可以按许可证复用和修改本库；实际申请仍以签发机构规则为准。<br>(MIT)

[Repository README](../README.md)
