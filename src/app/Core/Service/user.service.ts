import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, Subscription, tap } from "rxjs";
import { UserModel, UserAdapter } from '../Model/user';
import { environment } from 'src/environments/environment';
import { mapTo } from 'rxjs-compat/operator/mapTo';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private currentUserSubject: BehaviorSubject<{ currentUser: UserModel } | null>;
    public currentUser: Observable<{ currentUser: UserModel } | null>;

    constructor(
        private http: HttpClient,
        private adapter: UserAdapter
    ) {
        this.currentUserSubject = new BehaviorSubject<{ currentUser: UserModel } | null>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    getUser(idUser: string) {

        console.log(idUser);
        
        this.getCurrentUserFromLocalStorage().subscribe(user => {
            console.log(user);
            if( user instanceof UserModel) {
                console.log(user);
                
                return user;
            }

            return this.http.get(`${environment.apiUrl}users/${idUser}`).pipe(
                tap( item => console.log(item)),
                map((item: any) =>
                    this.adapter.adapt(item)
                ),
                tap((user: UserModel) => this.saveUserOnLocalStorage(user))
            ).subscribe(user => {return user});
        });

        
    }

    saveUserOnLocalStorage(user: UserModel): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next({currentUser: user});
    }

    getCurrentUserFromLocalStorage(): Observable<UserModel> {
        return this.currentUser.pipe(
            map((item: any) => this.adapter.adapt(item))
        );
    }

    login(payload: object): Observable<any> {
        return this.http.post('http://localhost:250/api/v1/users/login_check', payload);
    }

    register(user: object): Observable<any> {
        return this.http.post('http://localhost:250/api/v1/users/register', user);
    }

    activateAccount(payload: any, url: string): Observable<any> {
        return this.http.put(url, payload);
    }

    logoutUser() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
