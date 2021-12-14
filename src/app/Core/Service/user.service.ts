import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { UserModel, UserAdapter } from '../Model/user';


@Injectable({
    providedIn: 'root',
})
export class UserService {

    private currentUserSubject: BehaviorSubject<{ currentUser: UserModel } | null>;
    public currentUser: Observable<{ currentUser: UserModel } | null>;

    @Output() getLoggedUser: EventEmitter<UserModel> = new EventEmitter();

    constructor(
        private http: HttpClient,
        private userAdapter: UserAdapter
    ) {
        this.currentUserSubject = new BehaviorSubject<{ currentUser: UserModel } | null>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    getUser() {
        const userFromLocalStorage = of(JSON.parse(localStorage.getItem('currentUser')!));
        return userFromLocalStorage.pipe(
            map((item: any) => {
                if (item) {
                    const user = this.userAdapter.adapt(item);
                    this.getLoggedUser.emit(user);
                    return user;
                }
                return null;
            })
        );
    }

    saveUserOnLocalStorage(user: UserModel): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next({currentUser: user});
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
