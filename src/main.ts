import { join } from 'path';
import { appwrite } from './api/appwrite';
import { config } from './config';
import { Dart } from './generators';
import { deserialize, file, str } from './utils';



const main = async () => {
  const databases = await appwrite.listDatabases();

  for (const database of databases.databases) {
    const databaseFolder = join(config.outputDirectory, database.name);
    await file.ensureFolderExists(databaseFolder);
    const collections = await appwrite.listCollections(database.$id);

    for (const collection of collections.collections) {
      const attributes = await appwrite.listAttributes(database.$id, collection.$id);
      const schema = deserialize.toAppwriteSchema(collection, attributes.attributes);
      const dartClass = Dart(schema);

      await file.writeClassFile(
        databaseFolder,
        `${str.upperFirstLetter(collection.name)}.dart`,
        dartClass
      );
    }
  }
};

main();
