import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { UserModel } from '../Model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { UserService } from './user.service';
import { mergeMap } from 'rxjs-compat/operator/mergeMap';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private currentUserTokenSubject: BehaviorSubject<{ token: string } | null>;
    public currentUserToken: Observable<{ token: string } | null>;

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) {
        this.currentUserTokenSubject = new BehaviorSubject<{ token: string } | null>(JSON.parse(localStorage.getItem('currentToken')!));
        this.currentUserToken = this.currentUserTokenSubject.asObservable();
    }

    public get currentUserTokenValue(): { token: string } | null {
        return this.currentUserTokenSubject.value;
    }

    userIdFromToken(): string {
        console.log('dentro');
        
        try {
            const tokenInfo: {exp: number, iat: number, id: string, username: string} = jwt_decode(this.currentUserTokenValue?.token!);
            return tokenInfo.id;
        } catch (error) {
            return 'No se ha podido obtener la información del token';
        }
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}users/login_check`, { username, password })
            .pipe(
                map(token => {
                    localStorage.setItem('currentToken', JSON.stringify(token));
                    this.currentUserTokenSubject.next(token);
                    return token;
                })
            );
    }

    logout() {
        localStorage.removeItem('currentToken');
        this.currentUserTokenSubject.next(null);
        this.userService.logoutUser();
    }

}
