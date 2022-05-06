import { SqliteService } from "./sqlite.service";

export const initSecureCodeService = (sqliteService: SqliteService) => {
  return sqliteService.initService;
};
