import { AfterContentInit, Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { UserModel } from 'src/app/core/Model/user';
import { AuthenticationService } from 'src/app/core/Service/authentication.service';
import { DataSharingService } from 'src/app/core/Service/data-sharing.service';
import { UserService } from 'src/app/core/Service/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentInit {

    public userIsLogged: boolean = false;
    public user: any;
    public isDataAvailable: boolean = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private dataSharingService: DataSharingService,
        private renderer: Renderer2
    ) {
        this.dataSharingService.isUserLoggedIn.subscribe(value => {
            this.userIsLogged = value;
        })
    }

    ngOnInit() {
        this.userService.getUser().subscribe(user => {
            if (user instanceof UserModel) {
                this.dataSharingService.isUserLoggedIn.next(true);
            } else {
                this.dataSharingService.isUserLoggedIn.next(false);
            }
        });
    }

    ngAfterContentInit(): void {
        let element = document.getElementById('mainNav');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 1.5) {
                element?.classList.add('navbar-shrink');
            } else {
                element?.classList.remove('navbar-shrink');
            }
        })
    }
    

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
