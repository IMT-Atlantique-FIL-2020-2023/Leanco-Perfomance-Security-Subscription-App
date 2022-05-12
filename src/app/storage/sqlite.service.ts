import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite/ngx";
import { Injectable } from "@angular/core";
import { DATABASE_PASSWORD } from "../secure/constants";

@Injectable({
  providedIn: "root",
})
export class SqliteService {
  public connection: SQLiteObject;
  constructor(public readonly sqlite: SQLite) {}
  async initService(sqlite: SQLite) {
    //@ts-ignore
    console.log(window.openDatabase);
    this.connection = await sqlite.create({
      name: "settings.db",
      location: "default",
    });
    console.log("creating database");
    try {
      await this.connection.executeSql(
        `CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY,
      public_ca TEXT,
      jws TEXT,
      email TEXT
    )
    `
      );
    } catch (e) {
      console.error(e);
    }
  }
}
