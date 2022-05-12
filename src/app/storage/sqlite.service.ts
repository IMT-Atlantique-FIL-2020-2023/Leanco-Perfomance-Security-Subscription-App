import { SQLite, SQLiteObject } from "@awesome-cordova-plugins/sqlite/ngx";
import { Injectable } from "@angular/core";
import { DATABASE_PASSWORD } from "../secure/constants";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class SqliteService {
  public connection: SQLiteObject;
  constructor(public readonly sqlite: SQLite, private readonly plt: Platform) {}
  async initService(sqlite: SQLite) {
    //@ts-ignore
    await this.plt.ready();
    console.log("Platform is ready");
    this.connection = await sqlite.create({
      name: "settings.db",
      location: "default",
    });
    console.log("creating database");

    await this.connection.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY,
      public_ca TEXT,
      jws TEXT,
      email TEXT
    )
    `
      );
    });
    console.log("created database");
  }
}
