import { Component, OnInit } from "@angular/core";
import { SecureCodeService } from "src/app/secure/secure-code.service";
import { HomePage } from "../home/home.page";
import { LeanCoSubscriptionUser } from "../../secure/LeanCoSubscriptionUser";
import { BehaviorSubject, Observable, of } from "rxjs";

@Component({
  selector: "app-userinfos",
  templateUrl: "./userinfos.page.html",
  styleUrls: ["./userinfos.page.scss"],
})
export class UserinfosPage implements OnInit {
  infos$: Observable<LeanCoSubscriptionUser>;
  constructor(private readonly secure: SecureCodeService) {}

  ngOnInit() {
    //@ts-ignore
    this.infos = of(this.secure.getAuthUser());
  }
}
