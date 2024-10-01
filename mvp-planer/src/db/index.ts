import { openDB } from 'idb';
import { Entry } from '../types';

const DB_NAME = 'analyticsDB';
const STORE_NAME = 'entries';

const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

export const getAllEntries = async (): Promise<Entry[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const addEntry = async (entry: Omit<Entry, 'id'>): Promise<string> => {
  const db = await initDB();
  return (await db.add(STORE_NAME, entry)).toString();
};

export const updateEntry = async (entry: Entry): Promise<void> => {
  const db = await initDB();
  await db.put(STORE_NAME, entry);
};

export const deleteEntry = async (id: number): Promise<void> => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};