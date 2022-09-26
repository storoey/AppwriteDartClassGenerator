import { join } from 'path';
import { config } from './config';
import { Dart } from './generators';
import { file, logger } from './utils';

const main = async () => {
  const inputFiles = await file.listDir(config.inputDirectory);

  // TEMP for testing before using loop
  const fileName = inputFiles[0];
  const schema = await file.parseFile(join(config.inputDirectory, fileName));

  logger.info(Dart(schema));
  // TEMP for testing before using loop
};

main();
