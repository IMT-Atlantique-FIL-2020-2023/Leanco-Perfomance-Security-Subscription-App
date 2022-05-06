import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SecureCodeService } from "./secure/secure-code.service";
import { HttpClientModule } from "@angular/common/http";
import { initSecureCodeService } from "./secure/secure-code.init";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    SecureCodeService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
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
