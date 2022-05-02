import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastController} from "@ionic/angular";
import {importX509, generalVerify} from "jose"
import {CA, ALGO} from "../../secure/consts";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  static infos = null;

  constructor(public formBuilder: FormBuilder, public toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['',  [Validators.required]]
    })
  }

  async login() {
    const publicKey = await importX509(CA, ALGO)
      //TODO API ROUTE
      let json = await fetch("I DONT HAVE THE API ROUTE YET").then(response => response.json())
        if(json.hasOwnProperty("error")) {
          throw new Error(json.error)
        }
        const {payload, protectedHeader} = await generalVerify(json.jws, publicKey)
  }

  static getInfos() {
    return this.infos;
  }

  async onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      console.log(this.loginForm.value)
      this.login(); // Faire un then pour traiter
      const toast = await this.toastController.create({
        message: 'Connexion en cours',
        duration: 2000
      });
      toast.present()
    }
  }

}
