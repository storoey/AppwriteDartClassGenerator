import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises';
import { DartGenerator } from './DartGenerator.js';
import { Logger } from './logger.js';
import { Utils } from './utils.js';

const inputFolder = './input';
const outputFolder = './output';

async function main() {
  try {
    await ensureFolderExists(inputFolder);
    await ensureFolderExists(outputFolder);

    const inputDirectory = await readdir(inputFolder);
    const inputFiles = inputDirectory.map(
      (fileName) => `${inputFolder}/${fileName}`
    );

    const filePath = inputFiles[0];
    const metadata = await readAndParseFile(filePath);

    const attributes = DartGenerator.attributes(metadata.attributes);
    Logger.info(`[I][${Utils.fileName(filePath)}] Attributes generated.`);
    const constructor = DartGenerator.constructor(metadata);
    Logger.info(`[I][${Utils.fileName(filePath)}] Constructor generated.`);

    // console.log(metadata);

    Logger.success(
      `[S][${Utils.fileName(filePath)}] Class successfully generated.`
    );

    await writeDartClass(
      `${DartGenerator.classRename(metadata.name)}.dart`,
      DartGenerator.class(metadata, attributes, constructor)
    );
  } catch (err) {
    Logger.error(`[E] ${err.message}`);
  }
}

async function ensureFolderExists(folder) {
  try {
    await stat(folder);
  } catch {
    Logger.warning(`[W][${folder}] Could not find folder. Creating...`);
    await mkdir(folder);
  }
}

async function readAndParseFile(filePath) {
  const content = await readFile(filePath, { encoding: 'UTF-8' });
  const parsed = JSON.parse(content);

  Logger.info(`[I][${Utils.fileName(filePath)}] Read & Parsed`);

  return parsed;
}

async function writeDartClass(fileName, content) {
  await writeFile(`${outputFolder}/${fileName}`, content);
}

main();
