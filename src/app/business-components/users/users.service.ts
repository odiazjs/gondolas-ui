import { Injectable } from '@angular/core';
import { RequestService, HttpService, getUrlConfiguration } from '@asura-media/ui-sdk';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class UsersService extends RequestService<any> {
    constructor(
        httpService: HttpService<HttpResponse<User>>
    ) {
        super(
            httpService,
            getUrlConfiguration().usersUrl,
            usersServiceFactory
        )
    }
    getAllUsers() {
        return this.getList();
    }
}

const usersServiceFactory = (dto: ResponseDto<User>) => {
    const { status, data } = dto;
    return data;
}

export interface Catalog {
    id: string | number,
    description: string,
    isActive: boolean,
    name?: string
}

export interface ResponseDto<T> {
    status: string,
    data: T
}

export interface Registration {
    appType: string;
    checked?: boolean;
}

export interface Device {
  phoneNumber: string;
  imei: string;
  phoneCompany: number | Catalog;
}

export interface User {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
    username: string;
    password: string;
    code: string;
    role: Catalog;
    company: Catalog;
    jobTitle: Catalog;
    registrations: Registration[];
    device: Device;
    isSuperAdmin?: boolean;
}
