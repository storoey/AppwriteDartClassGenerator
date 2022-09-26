import { mkdir, readdir, stat } from 'fs/promises';
import { logger } from './logger';

const File = () => {
  const ensureFolderExists = async (directory: string) => {
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

  return {
    listDir,
  };
};

export const file = File();
