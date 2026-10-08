#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SPECS_DIR = path.join(ROOT, "specs");
const SCHEMA_PATH = path.join(ROOT, "schema", "photo-spec.schema.json");

const HEX = /^#[0-9A-Fa-f]{6}$/;
const ID = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;
const ISO_DATE = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const HTTPS = /^https:\/\//;
const REGION = /^([A-Z]{2}|INTL)$/;
const CATEGORIES = new Set(["exam", "visa", "passport", "id-card", "other"]);
const COLORS = new Set(["color", "grayscale", "either"]);
const STATUSES = new Set(["verified", "needs-review"]);
const NAME_KEYS = new Set(["en", "zh", "zh-Hant", "ja", "ko"]);

const errors = [];

function fail(where, message) {
  errors.push(`${where}: ${message}`);
}

function isInt(n) {
  return Number.isInteger(n);
}

function isPosIntOrNull(v) {
  return v === null || (isInt(v) && v >= 1);
}

function isPosNumOrNull(v) {
  return v === null || (typeof v === "number" && Number.isFinite(v) && v > 0);
}

function isNonNegNumOrNull(v) {
  return v === null || (typeof v === "number" && Number.isFinite(v) && v >= 0);
}

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    fail(path.relative(ROOT, filePath), `invalid JSON (${err.message})`);
    return null;
  }
}

function unexpectedKeys(obj, allowed, where) {
  for (const key of Object.keys(obj)) {
    if (!allowed.has(key)) fail(where, `unknown field "${key}"`);
  }
}

function validateSchemaFile() {
  const schema = loadJson(SCHEMA_PATH);
  if (!schema) return;
  if (schema.title !== "Photo specification entry") {
    fail("schema/photo-spec.schema.json", "unexpected schema title");
  }
}

function validateName(name, where) {
  if (!name || typeof name !== "object") {
    fail(where, "name must be an object");
    return;
  }
  unexpectedKeys(name, NAME_KEYS, `${where}.name`);
  if (typeof name.en !== "string" || !name.en.trim()) fail(`${where}.name.en`, "required non-empty string");
  if (typeof name.zh !== "string" || !name.zh.trim()) fail(`${where}.name.zh`, "required non-empty string");
}

function validatePixels(pixels, where) {
  if (!pixels || typeof pixels !== "object") {
    fail(where, "photo.pixels must be an object");
    return;
  }
  unexpectedKeys(
    pixels,
    new Set(["width", "height", "min_width", "max_width", "min_height", "max_height"]),
    where
  );
  for (const key of ["width", "height", "min_width", "max_width"]) {
    if (!(key in pixels)) fail(where, `missing ${key}`);
    else if (!isPosIntOrNull(pixels[key])) fail(`${where}.${key}`, "must be a positive integer or null");
  }
  for (const key of ["min_height", "max_height"]) {
    if (key in pixels && !isPosIntOrNull(pixels[key])) {
      fail(`${where}.${key}`, "must be a positive integer or null");
    }
  }
  if (isInt(pixels.min_width) && isInt(pixels.max_width) && pixels.max_width < pixels.min_width) {
    fail(where, "max_width must be >= min_width");
  }
  if (isInt(pixels.min_height) && isInt(pixels.max_height) && pixels.max_height < pixels.min_height) {
    fail(where, "max_height must be >= min_height");
  }
}

function validatePrintMm(print, where) {
  if (!print || typeof print !== "object") {
    fail(where, "photo.print_mm must be an object");
    return;
  }
  unexpectedKeys(
    print,
    new Set(["width", "height", "min_width", "max_width", "min_height", "max_height"]),
    where
  );
  if (!("width" in print) || !("height" in print)) fail(where, "width and height are required (use null if unspecified)");
  if (!isPosNumOrNull(print.width)) fail(`${where}.width`, "must be a positive number or null");
  if (!isPosNumOrNull(print.height)) fail(`${where}.height`, "must be a positive number or null");
  for (const key of ["min_width", "max_width", "min_height", "max_height"]) {
    if (key in print && !isPosNumOrNull(print[key])) {
      fail(`${where}.${key}`, "must be a positive number or null");
    }
  }
  if (typeof print.min_width === "number" && typeof print.max_width === "number" && print.max_width < print.min_width) {
    fail(where, "max_width must be >= min_width");
  }
  if (typeof print.min_height === "number" && typeof print.max_height === "number" && print.max_height < print.min_height) {
    fail(where, "max_height must be >= min_height");
  }
}

function validateHeadRatio(ratio, where) {
  if (ratio === null) return;
  if (!ratio || typeof ratio !== "object") {
    fail(where, "must be {min,max} or null");
    return;
  }
  unexpectedKeys(ratio, new Set(["min", "max"]), where);
  for (const key of ["min", "max"]) {
    const v = ratio[key];
    if (!(v === null || (typeof v === "number" && v >= 0 && v <= 1))) {
      fail(`${where}.${key}`, "must be a number in [0,1] or null");
    }
  }
  if (typeof ratio.min === "number" && typeof ratio.max === "number" && ratio.max < ratio.min) {
    fail(where, "max must be >= min");
  }
}

function validatePhoto(photo, where) {
  if (!photo || typeof photo !== "object") {
    fail(where, "photo must be an object");
    return;
  }
  unexpectedKeys(
    photo,
    new Set(["pixels", "print_mm", "dpi", "aspect", "head_ratio", "background", "color"]),
    where
  );
  validatePixels(photo.pixels, `${where}.pixels`);
  validatePrintMm(photo.print_mm, `${where}.print_mm`);
  if (!(photo.dpi === null || (isInt(photo.dpi) && photo.dpi >= 1))) {
    fail(`${where}.dpi`, "must be a positive integer or null");
  }
  if (!(photo.aspect === null || (typeof photo.aspect === "string" && photo.aspect.trim()))) {
    fail(`${where}.aspect`, "must be a non-empty string or null");
  }
  validateHeadRatio(photo.head_ratio, `${where}.head_ratio`);
  if (!Array.isArray(photo.background)) {
    fail(`${where}.background`, "must be an array of #RRGGBB colours");
  } else {
    photo.background.forEach((c, i) => {
      if (typeof c !== "string" || !HEX.test(c)) {
        fail(`${where}.background[${i}]`, "must be a 6-digit hex colour such as #FFFFFF");
      }
    });
  }
  if (!COLORS.has(photo.color)) fail(`${where}.color`, "must be color | grayscale | either");
}

function validateFile(file, where) {
  if (!file || typeof file !== "object") {
    fail(where, "file must be an object");
    return;
  }
  unexpectedKeys(file, new Set(["formats", "min_kb", "max_kb"]), where);
  if (!Array.isArray(file.formats) || file.formats.some((f) => typeof f !== "string" || !/^[a-z0-9]+$/.test(f))) {
    fail(`${where}.formats`, "must be an array of lowercase format tokens");
  }
  if (!isNonNegNumOrNull(file.min_kb)) fail(`${where}.min_kb`, "must be a non-negative number or null");
  if (!isNonNegNumOrNull(file.max_kb)) fail(`${where}.max_kb`, "must be a non-negative number or null");
  if (typeof file.min_kb === "number" && typeof file.max_kb === "number" && file.max_kb < file.min_kb) {
    fail(where, "max_kb must be >= min_kb");
  }
}

function mmToPx(mm, dpi) {
  return (mm / 25.4) * dpi;
}

function validateConsistency(spec, where) {
  const { pixels, print_mm, dpi } = spec.photo || {};
  if (!pixels || !print_mm) return;
  const pairs = [
    ["width", pixels.width, print_mm.width],
    ["height", pixels.height, print_mm.height],
  ];
  if (dpi && pairs.every(([, px, mm]) => typeof px === "number" && typeof mm === "number")) {
    for (const [axis, px, mm] of pairs) {
      const expected = mmToPx(mm, dpi);
      const tolerance = Math.max(2, expected * 0.05);
      if (Math.abs(px - expected) > tolerance) {
        fail(
          `${where}.photo`,
          `${axis} pixels ${px} not consistent with ${mm} mm at ${dpi} dpi (expected ~${expected.toFixed(1)} ± ${tolerance.toFixed(1)})`
        );
      }
    }
  }
}

function validateSpec(spec, filePath) {
  const where = path.relative(ROOT, filePath);
  if (!spec || typeof spec !== "object") return;
  unexpectedKeys(
    spec,
    new Set(["id", "name", "category", "region", "issuer", "photo", "file", "notes", "sources", "status"]),
    where
  );
  if (typeof spec.id !== "string" || !ID.test(spec.id)) fail(`${where}.id`, "must be kebab-case");
  const expectedFile = `${spec.id}.json`;
  if (path.basename(filePath) !== expectedFile) {
    fail(where, `filename must be ${expectedFile}`);
  }
  validateName(spec.name, where);
  if (!CATEGORIES.has(spec.category)) fail(`${where}.category`, "invalid category");
  if (typeof spec.region !== "string" || !REGION.test(spec.region)) fail(`${where}.region`, "must be ISO 3166-1 alpha-2 or INTL");
  if (typeof spec.issuer !== "string" || !spec.issuer.trim()) fail(`${where}.issuer`, "required");
  validatePhoto(spec.photo, `${where}.photo`);
  validateFile(spec.file, `${where}.file`);
  if (!spec.notes || typeof spec.notes.en !== "string" || !spec.notes.en.trim() || typeof spec.notes.zh !== "string" || !spec.notes.zh.trim()) {
    fail(`${where}.notes`, "en and zh are required");
  }
  if (spec.notes) unexpectedKeys(spec.notes, new Set(["en", "zh"]), `${where}.notes`);
  if (!Array.isArray(spec.sources) || spec.sources.length < 1) {
    fail(`${where}.sources`, "at least one official https source is required");
  } else {
    spec.sources.forEach((src, i) => {
      const sWhere = `${where}.sources[${i}]`;
      if (!src || typeof src !== "object") {
        fail(sWhere, "must be an object");
        return;
      }
      unexpectedKeys(src, new Set(["url", "title", "checked"]), sWhere);
      if (typeof src.url !== "string" || !HTTPS.test(src.url)) fail(`${sWhere}.url`, "must be an https URL");
      if (typeof src.title !== "string" || !src.title.trim()) fail(`${sWhere}.title`, "required");
      if (typeof src.checked !== "string" || !ISO_DATE.test(src.checked)) fail(`${sWhere}.checked`, "must be YYYY-MM-DD");
    });
  }
  if (!STATUSES.has(spec.status)) fail(`${where}.status`, "must be verified or needs-review");
  validateConsistency(spec, where);
}

function main() {
  validateSchemaFile();
  if (!fs.existsSync(SPECS_DIR)) {
    fail("specs/", "directory missing");
  } else {
    const files = fs.readdirSync(SPECS_DIR).filter((f) => f.endsWith(".json")).sort();
    if (files.length === 0) fail("specs/", "no spec files");
    const ids = new Map();
    for (const file of files) {
      const full = path.join(SPECS_DIR, file);
      const spec = loadJson(full);
      if (!spec) continue;
      validateSpec(spec, full);
      if (spec && spec.id) {
        if (ids.has(spec.id)) fail(file, `duplicate id "${spec.id}" (also ${ids.get(spec.id)})`);
        else ids.set(spec.id, file);
      }
    }
  }

  if (errors.length) {
    console.error(`FAIL ${errors.length} check(s):\n`);
    for (const err of errors) console.error(`- ${err}`);
    process.exit(1);
  }
  const count = fs.readdirSync(SPECS_DIR).filter((f) => f.endsWith(".json")).length;
  console.log(`OK ${count} spec(s) passed schema and sanity checks`);
}

main();
