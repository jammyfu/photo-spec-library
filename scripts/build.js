#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SPECS_DIR = path.join(ROOT, "specs");
const DIST_DIR = path.join(ROOT, "dist");
const PKG = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));

function loadSpecs() {
  const files = fs.readdirSync(SPECS_DIR).filter((f) => f.endsWith(".json")).sort();
  return files.map((file) => {
    const spec = JSON.parse(fs.readFileSync(path.join(SPECS_DIR, file), "utf8"));
    return spec;
  }).sort((a, b) => a.id.localeCompare(b.id));
}

function main() {
  const specs = loadSpecs();
  const generated = new Date().toISOString().slice(0, 10);
  const bundle = {
    version: PKG.version,
    generated,
    specs,
  };
  fs.mkdirSync(DIST_DIR, { recursive: true });
  const out = path.join(DIST_DIR, "specs.json");
  fs.writeFileSync(out, `${JSON.stringify(bundle, null, 2)}\n`);
  console.log(`Wrote ${out} (${specs.length} specs, version ${bundle.version}, generated ${generated})`);
}

main();
