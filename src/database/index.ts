import sqlite3 from 'sqlite3';

class DBManager {
    db: sqlite3.Database;

    open (conn: string) {
        this.db = new sqlite3.Database(conn)
    }
}

export const manager = new DBManager();

export { getRooms } from './room';
export { getStudents } from './student';