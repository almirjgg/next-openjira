import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { Entry, IEntry } from '../../models';

export const getEntriesById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null;

  await db.connect();
  const entry = await Entry.findById(id).lean();
  await db.disconnect();
  if (!entry) {
    throw new Error('Entry not found');
  }
  return JSON.parse(JSON.stringify(entry));
};
