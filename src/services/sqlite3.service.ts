import { dbPath } from '..';
import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database(dbPath);
