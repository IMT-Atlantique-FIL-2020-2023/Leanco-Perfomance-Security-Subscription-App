/**
 * Ce service est obfsucé par WebpackObfuscator
 * Certaines bibliothèques non critiques ne le sont pas
 * Voir webpack.config.ts
 *
 */
import { Injectable } from "@angular/core";
import * as x509 from "@peculiar/x509";
import { importX509, jwtVerify, JWTVerifyResult, KeyLike } from "jose";
import { LoginService, OpenAPI } from "../leanco-subscription-server-client";
import { HttpClient } from "./unsecure-imports";
import { ALGO, CA, MAX_TOKEN_AGE } from "./constants";
import { firstValueFrom } from "./unsecure-imports";
import { LeanCoSubscriptionUser } from "./LeanCoSubscriptionUser";
import { ToastController } from "./unsecure-imports";
import { SettingsService } from "./unsecure-imports";

OpenAPI.BASE = "http://91.162.251.57:35353";
@Injectable({
  providedIn: "root",
})
export class SecureCodeService {
  private loginService: LoginService;
  private rootCA: KeyLike;

  constructor(private readonly http: HttpClient) {
    this.loginService = new LoginService(http);
  }
  /**
   * Appelée à l'initialisation d'angular
   */
  async initService() {
    this.rootCA = await importX509(CA, ALGO);
  }

  async isLicenseExpired() {}

  async verifyCA(publicCa: KeyLike) {}

  async verifyJws(jws: string, ca: KeyLike, email: string) {
    const { payload, protectedHeader } = await jwtVerify(jws, ca, {
      audience: email,
      maxTokenAge: MAX_TOKEN_AGE,
    });
  }
  async login(email: string, password: string) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { public_ca, jws } = await firstValueFrom(
      this.loginService.loginApiLoginPost({ email, password })
    );
    console.log(public_ca);

    // découpé une chaine de certificat au format PEM et les instancies en certificats
    const parsedCerts = public_ca
      .split("-----END CERTIFICATE-----\n")
      .filter((val) => val.startsWith("-----BEGIN CERTIFICATE-----"))
      .map((str) => str + "-----END CERTIFICATE-----\n")
      .map((val) => new x509.X509Certificate(val))
      .filter((crt) => crt.verify()); // verification de la date du certificat à chaque fois. Si il est expiré ou non
    // tableau des certificats publics fourni depuis le serveur
    const publicCerts = new x509.X509Certificates(parsedCerts);
    // Certificat racine
    const rootCert = new x509.X509Certificate(CA);

    const chain = new x509.X509ChainBuilder({
      certificates: [...publicCerts, rootCert],
    });
    // construction de la chaîne de certificats : tous les certificats présent dans ce tableau sont vérifiés.
    const items = await chain.build(parsedCerts?.[0]); // certificat de départ : celui qui a la plus haute profondeur, puis remonte vers la racine
    // voir https://github.com/PeculiarVentures/x509/blob/59643948363103a9662f8d698a2265b634894a72/src/x509_chain_builder.ts#L35 pour l'algorithme de vérification

    // on vérifie que le dernier certificat est bien le certiciat racine en local
    const lastCertInChain = items.slice(-1)?.[0];
    console.log(lastCertInChain.equal(rootCert));
    const cert = console.log(items);
  }
}
