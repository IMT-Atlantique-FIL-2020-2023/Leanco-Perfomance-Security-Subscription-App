import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";
import { importX509, generalVerify } from "jose";
import { CA, ALGO } from "../../secure/constants";
import { SecureCodeService } from "../../secure/secure-code.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  static infos = null;

  loginForm: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public secureCodeService: SecureCodeService
  ) {}

  static getInfos() {
    return this.infos;
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
      console.log(this.secureCodeService);
      await this.secureCodeService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );
      const toast = await this.toastController.create({
        message: "Connexion en cours",
        duration: 2000,
      });
      toast.present();
    }
  }
}
