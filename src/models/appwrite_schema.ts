import { AppwriteAttribute, AppwriteIndex } from '.';

export interface AppwriteSchema {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  databaseId: string;
  name: string;
  enabled: boolean;
  documentSecurity: boolean;
  attributes: AppwriteAttribute[];
  indexes: AppwriteIndex[];
}
