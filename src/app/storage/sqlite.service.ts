import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite/ngx";
import { Injectable } from "@angular/core";
import { DATABASE_PASSWORD } from "../secure/constants";

@Injectable({
  providedIn: "root",
})
export class SqliteService {
  public connection: SQLiteObject;
  constructor(public readonly sqlite: SQLite) {}
  async initService() {
    this.connection = await this.sqlite.create({
      key: DATABASE_PASSWORD,
      name: "settings.db",
      location: "default",
    });
    await this.connection.executeSql(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY,
      public_ca TEXT,
      jws TEXT
    );
    `);
  }
}
