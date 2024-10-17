import { Types } from 'mongoose';

export function isValidObjectId(value: any): boolean {
  if (!value) return false;
  return Types.ObjectId.isValid(value);
}