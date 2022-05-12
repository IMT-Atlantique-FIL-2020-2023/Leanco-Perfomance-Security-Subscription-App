import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SecureCodeService } from "./secure/secure-code.service";
import { HttpClientModule } from "@angular/common/http";
import { initSecureCodeService } from "./secure/secure-code.init";
import { SqliteService } from "./storage/sqlite.service";
import { initSqliteService } from "./storage/sqlite.init";
import { SQLite } from "@awesome-cordova-plugins/sqlite/ngx";
import { StorageModule } from "./storage/storage.module";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    StorageModule,
  ],
  providers: [
    SecureCodeService,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // initialise les services au chargement d'angular
    {
      provide: APP_INITIALIZER,
      useFactory: initSecureCodeService,
      deps: [SecureCodeService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
