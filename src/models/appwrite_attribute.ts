export interface AppwriteAttribute {
  key: string;
  type: string;
  status: string;
  required: boolean;
  array: false;
  size: number;
  min?: number;
  max?: number;
  elements?: string[];
  format?: string;
  default: number | string | null;
}
