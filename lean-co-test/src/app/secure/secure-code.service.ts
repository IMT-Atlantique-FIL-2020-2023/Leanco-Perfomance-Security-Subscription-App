import { Injectable } from '@angular/core';
import {generalVerify, KeyLike} from "jose";

@Injectable({
  providedIn: 'root'
})
export class SecureCodeService {
  constructor(private readonly rootCA : KeyLike) {}

  async login() {
    //TODO API ROUTE
    let json = await fetch("I DONT HAVE THE API ROUTE YET").then(response => response.json())
    if(json.hasOwnProperty("error")) {
      throw new Error(json.error)
    }
    //const {payload, protectedHeader} = await generalVerify(json.jws, publicKey)
  }
}
