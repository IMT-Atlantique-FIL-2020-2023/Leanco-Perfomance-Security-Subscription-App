import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userinfos',
  templateUrl: './userinfos.page.html',
  styleUrls: ['./userinfos.page.scss'],
})
export class UserinfosPage implements OnInit {

  infos = null;
  constructor() { }

  ngOnInit() {
    this.getUserInfos();
  }

  getUserInfos() {
    if(this.infos === null) {
      /* TODO: get required info from the API */
      this.infos = {"subscriptionType": "My Subscription", "subscriptionExpirationDate":"2022-06-22", "name":"Name", "surname":"Surname"}
    }
    return this.infos;
  }

}
