import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SqliteService } from "./sqlite.service";
import { SettingsService } from "./settings.service";
import { SQLite } from "@awesome-cordova-plugins/sqlite";

@NgModule({
  declarations: [],
  providers: [SqliteService, SettingsService, SQLite],
  imports: [CommonModule],
  exports: [SqliteService, SettingsService],
})
export class StorageModule {}
