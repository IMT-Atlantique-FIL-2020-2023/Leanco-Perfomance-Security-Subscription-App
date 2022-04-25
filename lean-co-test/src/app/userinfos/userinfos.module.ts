import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserinfosPageRoutingModule } from './userinfos-routing.module';

import { UserinfosPage } from './userinfos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserinfosPageRoutingModule
  ],
  declarations: [UserinfosPage]
})
export class UserinfosPageModule {}
