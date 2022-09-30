import { Models } from 'node-appwrite';
import { AppwriteSchema } from './../models/appwrite_schema';

const Deserialize = () => {
  const toAppwriteSchema = (collection: Models.Collection, attributes: any[]): AppwriteSchema => {
    return {
      $id: collection.$id,
      $createdAt: collection.$createdAt,
      $updatedAt: collection.$updatedAt,
      $permissions: collection.$permissions,
      databaseId: collection.databaseId,
      name: collection.name,
      enabled: collection.enabled,
      documentSecurity: collection.documentSecurity,
      attributes: attributes.map(a => {
        return {
          key: a.key,
          type: a.type,
          status: a.status,
          required: a.required,
          array: a.array,
          size: a.size,
          min: a.min,
          max: a.max,
          elements: a.elements,
          format: a.format,
          default: a.default,
        }
      }),
      indexes: [],
    };
  }

  return {
    toAppwriteSchema,
  }
}


export const deserialize = Deserialize();