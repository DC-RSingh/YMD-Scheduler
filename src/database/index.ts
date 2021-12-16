import sqlite3 from 'sqlite3';

/**
 * Wrapper class for a sqlite3 Database to allow connection to be set in main process.
 */
class DBManager {
    db: sqlite3.Database;

    /**
     * Sets the db object of this database manager to a new sqlite3 database with the specified
     * connection.
     * 
     * @param conn A file connection to an sqlite database
     */
    open (conn: string) {
        this.db = new sqlite3.Database(conn)
    }
}

export const manager = new DBManager();

export * from './room';
export * from './student';
export * from './credential';
export * from './restriction';
export * from './skill';
export * from './musicClass';
export * from './roomType';
export * from './staffAvailableDay';
export * from './staff';
export * from './staffType';
export * from './studentClassList';
export * from './timeSlot';
export * from './day';
export * from './staffSkill';
export * from './staffCredential';
export * from './staffRestriction';