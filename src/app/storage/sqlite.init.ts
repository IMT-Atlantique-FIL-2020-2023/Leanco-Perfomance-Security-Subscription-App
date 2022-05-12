import { SQLite } from "@awesome-cordova-plugins/sqlite/ngx";
import { SqliteService } from "./sqlite.service";

export const initSqliteService = (
  sqliteService: SqliteService,
  sqlite: SQLite
) => {
  return sqliteService.initService.bind(sqliteService, sqlite);
};
