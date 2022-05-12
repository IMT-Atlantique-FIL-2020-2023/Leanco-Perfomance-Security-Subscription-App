import { Component, OnInit } from "@angular/core";
import { HomePage } from "../home/home.page";

@Component({
  selector: "app-userinfos",
  templateUrl: "./userinfos.page.html",
  styleUrls: ["./userinfos.page.scss"],
})
export class UserinfosPage implements OnInit {
  infos = null;
  constructor() {}

  ngOnInit() {
    this.infos = HomePage.getInfos();
  }
}
