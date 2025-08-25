#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");

const CLASP_JSON = ".clasp.json";

// すでに .clasp.json がある場合はスキップ
if (fs.existsSync(CLASP_JSON)) {
	console.log(".clasp.json already exists. Skipping initialization.");
	process.exit(0);
}

console.log("Initializing new Google Apps Script project...");

// clasp login がまだなら実行
try {
	execSync("clasp login --status", { stdio: "inherit" });
} catch {
	console.log("Logging in to clasp...");
	execSync("clasp login", { stdio: "inherit" });
}

// プロジェクト作成
execSync("clasp create --type standalone --title 'catpow-gas'", { stdio: "inherit" });
execSync("clasp setting rootDir ./src", { stdio: "inherit" });
execSync("mv appsscript.json src/", { stdio: "inherit" });

console.log("Initialization complete!");
