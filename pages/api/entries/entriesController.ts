import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../config/database';
import { Entry } from '../../../models';
import { Data } from '.';
import { DataById } from './[id]';

const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: 'asc' });
  await db.disconnect();
  res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;
  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });
  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();
    return res.status(201).json(newEntry);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const updateEntryById = async (req: NextApiRequest, res: NextApiResponse<DataById>) => {
  const { id } = req.query;

  try {
    await db.connect();
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
      await db.disconnect();
      return res.status(400).json({ message: 'Entry not found' });
    }
    const { description = entryToUpdate.description, status = entryToUpdate.status } = req.body;

    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true },
    );

    await db.disconnect();
    return res.status(200).json(updatedEntry!);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
const getEntryById = async (req: NextApiRequest, res: NextApiResponse<DataById>) => {
  const { id } = req.query;
  try {
    await db.connect();
    const entry = await Entry.findById(id);
    await db.disconnect();
    if (!entry) {
      return res.status(400).json({ message: 'Entry not found' });
    }
    return res.status(200).json(entry);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteEntryById = async (req: NextApiRequest, res: NextApiResponse<DataById>) => {
  return res.status(200).json({ message: 'test' });
  console.log('delete');
};

export { getEntries, postEntry, updateEntryById, deleteEntryById, getEntryById };
