/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { LoginResponse } from '../models/LoginResponse';
import type { UserCredentials } from '../models/UserCredentials';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

@Injectable()
export class LoginService {

    constructor(public readonly http: HttpClient) {}

    /**
     * Login
     * @param requestBody
     * @returns LoginResponse Successful Response
     * @throws ApiError
     */
    public loginApiLoginPost(
        requestBody?: UserCredentials,
    ): Observable<LoginResponse> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}