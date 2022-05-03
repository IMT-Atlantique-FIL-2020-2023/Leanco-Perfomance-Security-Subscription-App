import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserinfosPage } from './userinfos.page';

const routes: Routes = [
  {
    path: '',
    component: UserinfosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserinfosPageRoutingModule {}
