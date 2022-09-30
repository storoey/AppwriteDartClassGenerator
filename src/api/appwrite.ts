import * as dotenv from 'dotenv';
import { Client, Databases } from 'node-appwrite';
import { env } from 'process';
import { Env } from '../models';

dotenv.config();

const typedEnv: Env = env as Env;

const Appwrite = () => {
  const sdk = new Client();
  const db = new Databases(sdk);

  sdk.setEndpoint(typedEnv.APPWRITE_ENDPOINT).setProject(typedEnv.APPWRITE_PROJECT).setKey(typedEnv.APPWRITE_SECRET).setSelfSigned(true);

  const listDatabases = async () => {
    return await db.list();
  }

  const listCollections = async (databaseId: string) => {
    return await db.listCollections(databaseId);
  }

  const listAttributes = async (databaseId: string, collectionId: string) => {
    return await db.listAttributes(databaseId, collectionId);
  }

  // const _databases = await db.list();

  return {
    listDatabases,
    listCollections,
    listAttributes,
  }
}

export const appwrite = Appwrite();