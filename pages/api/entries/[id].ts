import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../config/database';
import { Entry, IEntry } from '../../../models';
import { deleteEntryById, getEntryById, updateEntryById } from './entriesController';

export type DataById =
  | {
      message: string;
    }
  | IEntry;

export default async function handler(req: NextApiRequest, res: NextApiResponse<DataById>) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `Invalid ID ${id}` });
  }

  const { method } = req;
  const methods = {
    PUT: updateEntryById,
    GET: getEntryById,
    DELETE: deleteEntryById,
  };

  const handler = methods[method as keyof typeof methods];
  if (!handler) {
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }

  try {
    await handler(req, res);
  } catch (error) {
    return res.status(400).json({ message: 'Bad request' });
  }
}
