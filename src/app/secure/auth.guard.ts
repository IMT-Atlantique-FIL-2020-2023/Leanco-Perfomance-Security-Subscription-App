import { Injectable } from "./unsecure-imports";
import { Router, CanActivate } from "./unsecure-imports";
import { SecureCodeService } from "./secure-code.service";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public secure: SecureCodeService, public router: Router) {}
  async canActivate() {
    if (!(await this.secure.getAuthUser())) {
      this.router.navigate([""]);
      return false;
    }
    return true;
  }
}
