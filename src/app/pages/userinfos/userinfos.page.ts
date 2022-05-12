import { Component, Input, OnInit } from "@angular/core";
import { SecureCodeService } from "src/app/secure/secure-code.service";
import { LeanCoSubscriptionUser } from "../../secure/LeanCoSubscriptionUser";
import { Observable, from } from "rxjs";

@Component({
  selector: "app-userinfos",
  templateUrl: "./userinfos.page.html",
  styleUrls: ["./userinfos.page.scss"],
})
export class UserinfosPage implements OnInit {
  @Input() infos: Observable<LeanCoSubscriptionUser>;
  constructor(private readonly secure: SecureCodeService) {
    //@ts-ignore
  }

  ngOnInit() {
    //@ts-ignore
    this.infos = from(this.secure.getAuthUser());
  }
}
