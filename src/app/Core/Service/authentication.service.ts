import { Injectable } from '@angular/core';
import { BehaviorSubject, flatMap, map, Observable, tap } from 'rxjs';
import { UserAdapter } from '../Model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { UserService } from './user.service';
import { DataSharingService } from './data-sharing.service';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private currentUserTokenSubject: BehaviorSubject<{ token: string } | null>;
    public currentUserToken: Observable<{ token: string } | null>;

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private userAdapter: UserAdapter,
        private dataSharingService: DataSharingService
    ) {
        this.currentUserTokenSubject = new BehaviorSubject<{ token: string } | null>(JSON.parse(localStorage.getItem('currentToken')!));
        this.currentUserToken = this.currentUserTokenSubject.asObservable();
    }

    public get currentUserTokenValue(): { token: string } | null {
        return this.currentUserTokenSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}users/login_check`, { username, password })
            .pipe(
                map(token => {
                    localStorage.setItem('currentToken', JSON.stringify(token));
                    this.currentUserTokenSubject.next(token);

                    const tokenInfo: {exp: number, iat: number, id: string, username: string} = jwt_decode(token.token);
                    return tokenInfo;
                }),
                flatMap(tokenInfo => {
                    return this.http.get(`${environment.apiUrl}users/${tokenInfo.id}`).pipe(
                        map((item: any) =>
                            this.userAdapter.adapt(item)
                        )
                    );
                }),
                tap(user => {
                    this.userService.saveUserOnLocalStorage(user);
                    this.dataSharingService.isUserLoggedIn.next(true);
                })
            );
    }

    logout() {
        localStorage.removeItem('currentToken');
        this.currentUserTokenSubject.next(null);

        this.dataSharingService.isUserLoggedIn.next(false);
        
        this.userService.logoutUser();
    }

}
