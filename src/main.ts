import { config } from './config';
import { file } from './utils';

const main = async () => {
  const inputFiles = await file.listDir(config.inputDirectory);
};

main();
