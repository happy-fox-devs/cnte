import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import archiver from "archiver";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const rootDir = path.resolve(__dirname, "..");
const packageJsonPath = path.resolve(rootDir, "package.json");
const manifestJsonPath = path.resolve(rootDir, "public", "manifest.json");
const distDir = path.resolve(rootDir, "dist");
const outputDir = path.resolve(rootDir, "output");

// CLI args
const args = process.argv.slice(2);
const typeArgIndex = args.findIndex((arg) => arg === "--type" || arg === "-t");

if (typeArgIndex === -1 || !args[typeArgIndex + 1]) {
  console.error(
    "Error: Please specify release type using --type (patch|p, minor|m, major|M)",
  );
  process.exit(1);
}

const typeMap = {
  patch: "patch",
  p: "patch",
  minor: "minor",
  m: "minor",
  major: "major",
  M: "major",
};

const releaseTypeRaw = args[typeArgIndex + 1];
const releaseType = typeMap[releaseTypeRaw];

if (!releaseType) {
  console.error(
    `Error: Invalid release type '${releaseTypeRaw}'. Valid options are: patch, p, minor, m, major, M`,
  );
  process.exit(1);
}

// 1. Read current version from package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const currentVersion = packageJson.version; // e.g., "0.0.0"

// 2. Calculate new version
let [major, minor, patch] = currentVersion.split(".").map(Number);
if (releaseType === "major") {
  major += 1;
  minor = 0;
  patch = 0;
} else if (releaseType === "minor") {
  minor += 1;
  patch = 0;
} else if (releaseType === "patch") {
  patch += 1;
}

const newVersion = `${major}.${minor}.${patch}`;
console.log(`Bumping version: ${currentVersion} -> ${newVersion}`);

// 3. Update package.json & manifest.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

const manifestJson = JSON.parse(fs.readFileSync(manifestJsonPath, "utf8"));
manifestJson.version = newVersion;
fs.writeFileSync(
  manifestJsonPath,
  JSON.stringify(manifestJson, null, 2) + "\n",
);

// 4. Build process
console.log("Building project...");
try {
  execSync("pnpm build", { stdio: "inherit", cwd: rootDir });
} catch (error) {
  console.error("Build failed. Aborting release.");
  process.exit(1);
}

// 5. Create zip file for distribution
const zipFileName = `extension-v${newVersion}.zip`;
const zipFilePath = path.resolve(outputDir, zipFileName);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Creating zip file: ${zipFileName}...`);

const output = fs.createWriteStream(zipFilePath);
const archive = archiver("zip", {
  zlib: { level: 9 }, // max compression
});

output.on("close", () => {
  console.log(`Archive created: ${archive.pointer()} total bytes.`);

  // 6. Git commit & tag
  console.log("Committing and tagging...");
  try {
    execSync("git add package.json public/manifest.json", {
      stdio: "inherit",
      cwd: rootDir,
    });
    execSync(`git commit -m "chore(release): v${newVersion}"`, {
      stdio: "inherit",
      cwd: rootDir,
    });
    execSync(`git tag v${newVersion}`, { stdio: "inherit", cwd: rootDir });
    // Push tag and commits
    execSync("git push origin HEAD --tags", { stdio: "inherit", cwd: rootDir });

    // 7. GitHub Release using gh CLI
    console.log("Creating GitHub Release...");
    execSync(
      `gh release create v${newVersion} ${zipFileName} --title "v${newVersion}" --notes "Release v${newVersion}"`,
      { stdio: "inherit", cwd: rootDir },
    );

    console.log(`\n✅ Release v${newVersion} completed successfully!`);
  } catch (err) {
    console.error(
      "Error during git/gh operations. Please ensure git and gh CLI are configured correctly.",
      err.message,
    );
    process.exit(1);
  }
});

archive.on("warning", (err) => {
  if (err.code === "ENOENT") {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);

// Append files from dist directory
archive.directory(distDir, false);

archive.finalize();
