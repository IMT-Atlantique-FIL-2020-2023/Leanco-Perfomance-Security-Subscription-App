import { Injectable } from '@angular/core';
import {compactVerify, generalVerify, importX509, KeyLike} from "jose";
import {LoginService} from "../leanco-subscription-server-client";
import {HttpClient} from "@angular/common/http";
import {ALGO, CA} from "./constants";

@Injectable({
  providedIn: 'root'
})
export class SecureCodeService {

  private loginService: LoginService

  constructor(private readonly rootCA : KeyLike, private readonly http: HttpClient) {
    this.loginService = new LoginService(http)
  }

  async login(login: string, password: string) {

    const {public_ca, jws} = await this.loginService.loginApiV1LoginPost({login, password}).toPromise()

    const {payload, protectedHeader} = await compactVerify(jws, await importX509(public_ca, ALGO))

    console.log(protectedHeader)
    console.log(new TextDecoder().decode(payload))
  }
}
