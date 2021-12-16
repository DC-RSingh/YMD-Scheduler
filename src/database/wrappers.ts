/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * This file contains wrappers for database queries using the SQLite3 API, allowing us to
 * get promises to their values and await them in the model code. This is necessary because 
 * they provide values through callbacks, and we need to return the values to the renderer
 * process through IPC on/send, which is also an asynchronous callback.
*/

import { manager } from '.';

/**
 * Queries the database with the specified database and returns an array with the rows from the resulting
 * query.a
 * 
 * @param query The query you are making to return 
 * @param params The parameters for the query
 * @returns An array with the result set from the query
 */
export function getAll(query: string, params?: any): Promise<any[]> {

    return new Promise((resolve, reject) => {

        if (params) {
            manager.db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                }
    
                resolve(rows);
            });
        }
        else {
            manager.db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
    
                resolve(rows);
            });
        }
        
    });

}

export function createNew(query: string, params?: any) {

    

        if (params) {
            manager.db.run(query, params, function(err)
            {
                if (err) {
                    return console.log(err.message);
                  }
                  // get the last insert id
                  console.log(`A row has been inserted with rowid ${this.lastID}`);
            });
        }
        else {
            manager.db.run(query, function(err)
            {
                if (err) {
                    return console.log(err.message);
                  }
                  // get the last insert id
                  console.log(`A row has been inserted with rowid ${this.lastID}`);
            });
        }
        

}