import { join, parse } from 'path';
import { config } from './config';
import { Dart } from './generators';
import { file } from './utils';

const main = async () => {
  const inputFiles = await file.listDir(config.inputDirectory);

  for (const fileName of inputFiles) {
    const schema = await file.parseFile(join(config.inputDirectory, fileName));
    const dartClass = Dart(schema);

    const fileNameWithoutExt = parse(fileName).name;

    await file.writeClassFile(
      config.outputDirectory,
      `${fileNameWithoutExt}.dart`,
      dartClass
    );
  }
};

main();
