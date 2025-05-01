import type { NextApiRequest, NextApiResponse } from 'next';
import { getEntries, postEntry } from './entriesController';
import { IEntry } from '../../../models';

export type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;

  const methods = {
    GET: getEntries,
    POST: postEntry,
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
