import {SecureCodeService} from "./secure-code.service";
import {importX509} from "jose";
import {ALGO, CA} from "./constants";

export async function createSecureService() {
  return new SecureCodeService(await importX509(CA, ALGO))
}
