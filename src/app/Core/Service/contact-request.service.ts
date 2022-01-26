import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel } from '../Model/user';

@Injectable({
    providedIn: 'root'
})
export class ContactRequestService {

    constructor(
        private http: HttpClient
    ) { }

    createContactRequest(user: UserModel, payload: object) {
        Object.assign(payload, {owner: 'api/v1/users/' + user.id})
        return this.http.post(`${environment.apiUrl}contact_requests`, payload);
    }
}
