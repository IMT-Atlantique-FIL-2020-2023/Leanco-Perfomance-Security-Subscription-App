import { TestBed } from "@angular/core/testing";

import { SecureCodeService } from "./secure-code.service";

describe("SecureCodeService", () => {
  let service: SecureCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecureCodeService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
