import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises';
import { join } from 'path';
import { AppwriteSchema } from '../models';
import { logger } from './logger';

const File = () => {
  const ensureFolderExists = async (directory: string): Promise<void> => {
    try {
      await stat(directory);
    } catch {
      logger.warning(`[${directory}] Could not find folder. Creating...`);
      await mkdir(directory, { recursive: true });
    }
  };

  const listDir = async (directory: string): Promise<string[]> => {
    await ensureFolderExists(directory);
    return await readdir(directory);
  };

  const parseFile = async (filePath: string): Promise<AppwriteSchema> => {
    const raw: string = await readFile(filePath, { encoding: 'utf-8' });
    const json: AppwriteSchema = JSON.parse(raw);
    return json;
  };

  const writeClassFile = async (
    filePath: string,
    fileName: string,
    content: string
  ): Promise<void> => {
    await ensureFolderExists(filePath);
    await writeFile(join(filePath, fileName), content);
  };

  return {
    listDir,
    parseFile,
    writeClassFile,
    ensureFolderExists,
  };
};

export const file = File();
