import { Injectable } from "@angular/core";
import { SqliteService } from "./sqlite.service";

export type SettingsRow = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public_ca: string;
  jws: string;
};

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  constructor(private readonly sqliteService: SqliteService) {}
  async getConfig(): Promise<SettingsRow> {
    return this.sqliteService.connection
      .executeSql("SELECT * FROM settings")
      .then(({ rows }) => rows.item(0));
  }
  async setConfig(config: SettingsRow): Promise<SettingsRow> {
    return this.sqliteService.connection
      .executeSql(
        `
        INSERT OR REPLACE INTO settings (
          0,
          public_ca,
          jws
        ) VALUES (?, ?)
      `,
        [config.public_ca, config.jws]
      )
      .then(() => config);
  }
}
