import { APP_INITIALIZER, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SqliteService } from "./sqlite.service";
import { SettingsService } from "./settings.service";
import { initSqliteService } from "./sqlite.init";
import { SQLite } from "@awesome-cordova-plugins/sqlite/ngx";

@NgModule({
  declarations: [],
  providers: [
    SqliteService,
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initSqliteService,
      deps: [SqliteService, SQLite],
      multi: true,
    },
  ],
  imports: [CommonModule],
})
export class StorageModule {}
