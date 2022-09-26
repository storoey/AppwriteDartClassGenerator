import { mkdir, readdir, readFile, stat } from 'fs/promises';
import { AppwriteSchema } from '../models';
import { logger } from './logger';

const File = () => {
  const ensureFolderExists = async (directory: string): Promise<void> => {
    try {
      await stat(directory);
    } catch {
      logger.warning(`[${directory}] Could not find folder. Creating...`);
      await mkdir(directory);
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

  return {
    listDir,
    parseFile,
  };
};

export const file = File();
