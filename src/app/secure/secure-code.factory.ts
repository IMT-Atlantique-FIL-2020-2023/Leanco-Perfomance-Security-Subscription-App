import {SecureCodeService} from "./secure-code.service";
import {importX509} from "jose";
import {ALGO, CA} from "./constants";
import {HttpClient} from "@angular/common/http";

export async function createSecureService(http: HttpClient) {
  return new SecureCodeService(await importX509(CA, ALGO), http)
}
