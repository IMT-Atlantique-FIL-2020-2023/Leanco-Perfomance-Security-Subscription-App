import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Route, Router } from "@angular/router";
import { ToastController } from "@ionic/angular";

import { SecureCodeService } from "../../secure/secure-code.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public secureCodeService: SecureCodeService
  ) {
    (async () => {
      if (await this.secureCodeService.getAuthUser()) {
        this.router.navigate(["userinfos"]);
      }
    })();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      try {
        await this.secureCodeService.login(
          this.loginForm.value.email,
          this.loginForm.value.password
        );

        const toast = await this.toastController.create({
          message: "Connexion en cours",
          duration: 500,
        });
        toast.present();
        await this.router.navigate(["userinfos"]);
      } catch (e) {
        const toast = await this.toastController.create({
          message: `Whoops: ${e.message}`,
          duration: 2000,
        });
        toast.present();
      }
    }
  }
}
