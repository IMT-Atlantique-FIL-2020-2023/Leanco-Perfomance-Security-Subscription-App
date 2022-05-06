import { SecureCodeService } from "./secure-code.service";

export const initSecureCodeService = (secureCodeService: SecureCodeService) => {
  return secureCodeService.initService;
};
