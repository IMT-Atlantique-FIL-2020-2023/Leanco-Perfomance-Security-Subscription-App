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

// TODO: put this in a env file
OpenAPI.BASE = "http://localhost:9000";

@Injectable({
  providedIn: "root",
})
export class SecureCodeService {
  private loginService: LoginService;

  constructor(
    http: HttpClient,
    private readonly toasts: ToastController,
    private readonly settings: SettingsService
  ) {
    this.loginService = new LoginService(http);
  }

  /**
   * Appelée à l'initialisation d'angular
   */
  async initService() {}

  async checkPublicCaJws(
    jws: string,
    publicCa: string,
    email: string
  ): Promise<LeanCoSubscriptionUser> {
    if (!(await this.isPublicCaChainValid(publicCa))) {
      throw new Error("Invalid CA chain");
    }

    const publicCaNativeKey = await importX509(
      publicCa
        .split("-----END CERTIFICATE-----\n")
        .filter((val) => val.startsWith("-----BEGIN CERTIFICATE-----"))?.[0],
      ALGO
    );

    const { payload } = await this.verifyJws(jws, publicCaNativeKey, email);
    const user = payload.user as LeanCoSubscriptionUser;
    const toast = await this.toasts.create({
      message: `JWT aud: ${payload.aud} - JWT exp: ${new Date(
        payload.exp
      )} - JWT iat: ${new Date(payload.iat)} - JWT user: ${user.email}`,
    });
    await toast.present();

    // sauvegarde du JWS
    await this.settings.setConfig({
      jws,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      public_ca: publicCa,
      email,
    });

    return user;
  }

  /**
   * Vérifie le JWS dans le store et le retourne si valide
   *
   * @returns faux si le JWS dans le store est invalide ou inexistant
   */
  async getAuthUser(): Promise<false | LeanCoSubscriptionUser> {
    const config = await this.settings.getConfig();
    if (!config) {
      return false;
    }
    try {
      const user = await this.checkPublicCaJws(
        config.jws,
        config.public_ca,
        config.email
      );
      return user;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async isPublicCaChainValid(publicCA: string): Promise<boolean> {
    const parsedCerts = publicCA
      .split("-----END CERTIFICATE-----\n")
      .filter((val) => val.startsWith("-----BEGIN CERTIFICATE-----"))
      .map((str) => str + "-----END CERTIFICATE-----\n")
      .map((val) => new x509.X509Certificate(val));

    const publicCerts = new x509.X509Certificates(parsedCerts);
    // Certificat racine
    const rootCert = new x509.X509Certificate(CA);

    const chain = new x509.X509ChainBuilder({
      certificates: [...publicCerts, rootCert],
    });

    // construction de la chaîne de certificats : tous les certificats présent dans ce tableau sont vérifiés.
    const items = await chain.build(parsedCerts?.[0]); // certificat de départ : celui qui a la plus grande profondeur, puis remonte vers la racine
    // voir https://github.com/PeculiarVentures/x509/blob/59643948363103a9662f8d698a2265b634894a72/src/x509_chain_builder.ts#L35 pour l'algorithme de vérification
    // on vérifie que le dernier certificat est bien le certiciat racine en local
    const lastCertInChain = items?.slice(-1)?.[0];
    return !!lastCertInChain?.equal(rootCert);
  }

  async verifyJws(
    jws: string,
    publicCa: KeyLike,
    email: string
  ): Promise<JWTVerifyResult> {
    return await jwtVerify(jws, publicCa, {
      audience: email, // on vérifie que le jws est bien pour l'utilisateur
      maxTokenAge: MAX_TOKEN_AGE, // on vérifie que le jws n'est pas expiré
      algorithms: [ALGO], // on vérifie que le jws est bien signé avec l'algorithme choisi
      currentDate: new Date(), // date de base pour la vérification de l'éxpiration
    });
  }

  async login(
    email: string,
    password: string
  ): Promise<LeanCoSubscriptionUser> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { public_ca, jws } = await firstValueFrom(
      this.loginService.loginApiLoginPost({ email, password })
    );
    return await this.checkPublicCaJws(jws, public_ca, email);
  }
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function mapAsync<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<U>
): Promise<U[]> {
  return Promise.all(array.map(callbackfn));
}
/**
 * Filtre un tableau avec une fonction asynchrone
 *
 * @param array les valeurs à filtrer
 * @param callbackfn fonction de filtrage
 * @returns promesse
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
async function filterAsync<T>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>
): Promise<T[]> {
  const filterMap = await mapAsync(array, callbackfn);
  return array.filter((_value, index) => filterMap[index]);
}
