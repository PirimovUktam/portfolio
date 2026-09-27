import { constants } from "node:fs";
import { copyFile, lstat, readdir } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

// Next.js can preserve Windows separators in exported segment-cache filenames.
// The client requests dot-separated filenames. Add output-only aliases while
// preserving originals; correctly flattened exports need no changes.
const exportRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../out");

function assertInsideExport(candidate) {
  const pathFromRoot = relative(exportRoot, candidate);
  if (
    !pathFromRoot ||
    pathFromRoot === ".." ||
    pathFromRoot.startsWith(`..${sep}`) ||
    isAbsolute(pathFromRoot)
  ) {
    throw new Error(`Refusing to access a path outside the static export: ${candidate}`);
  }
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const candidate = join(directory, entry.name);
    assertInsideExport(candidate);

    // Do not follow symlinks or directory junctions outside the export tree.
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) files.push(...await collectFiles(candidate));
    else if (entry.isFile() && entry.name.endsWith(".txt")) files.push(candidate);
  }

  return files;
}

const exportInfo = await lstat(exportRoot);
if (!exportInfo.isDirectory() || exportInfo.isSymbolicLink()) {
  throw new Error("The static export must be a real out directory, not a symlink.");
}

let copied = 0;
for (const source of await collectFiles(exportRoot)) {
  const parts = relative(exportRoot, source).split(sep);
  const segmentIndex = parts.findIndex((part) => part.startsWith("__next."));

  // Existing flat segment files, index.txt, and unrelated assets are untouched.
  if (segmentIndex === -1 || segmentIndex === parts.length - 1) continue;

  const filename = parts.slice(segmentIndex).join(".");
  const destination = join(exportRoot, ...parts.slice(0, segmentIndex), filename);
  assertInsideExport(source);
  assertInsideExport(destination);

  try {
    await copyFile(source, destination, constants.COPYFILE_EXCL);
    copied += 1;
  } catch (error) {
    // A native Linux export or a previous invocation already supplied this file.
    if (error.code !== "EEXIST") throw error;
  }
}

console.log(`Static export: added ${copied} segment-cache filename aliases.`);
