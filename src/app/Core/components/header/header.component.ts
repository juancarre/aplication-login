import { AfterContentInit, Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterLink, Scroll } from '@angular/router';
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

    public isMatMenuOpen = false;
    public isMatMenu2Open = false;
    public enteredButton = false;
    public prevButtonTrigger: any;

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

    linkAboutMe($optionRequired: string) {
        this.router.navigate(['/about-me/' + $optionRequired])
    }

    menuenter() {
        this.isMatMenuOpen = true;
        if (this.isMatMenu2Open) {
            this.isMatMenu2Open = false;
        }
    }

    menuLeave(trigger: any, button: any) {
        setTimeout(() => {
            if (!this.isMatMenu2Open && !this.enteredButton) {
                this.isMatMenuOpen = false;
                trigger.closeMenu();
            } else {
                this.isMatMenuOpen = false;
            }
        }, 80)
    }

    buttonEnter(trigger: any) {
        setTimeout(() => {
            if (this.prevButtonTrigger && this.prevButtonTrigger != trigger) {
                this.prevButtonTrigger.closeMenu();
                this.prevButtonTrigger = trigger;
                this.isMatMenuOpen = false;
                this.isMatMenu2Open = false;
                trigger.openMenu();
            }
            else if (!this.isMatMenuOpen) {
                this.enteredButton = true;
                this.prevButtonTrigger = trigger
                trigger.openMenu();
            }
            else {
                this.enteredButton = true;
                this.prevButtonTrigger = trigger
            }
        })
    }

    buttonLeave(trigger: any, button: any) {
        setTimeout(() => {
            if (this.enteredButton && !this.isMatMenuOpen) {
                trigger.closeMenu();
            } if (!this.isMatMenuOpen) {
                trigger.closeMenu();
            } else {
                this.enteredButton = false;
            }
        }, 100)
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
