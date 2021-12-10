import { Component } from '@angular/core';
import {UserService} from "../../Core/Service/user.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent {

  user_id: string = '';
  token: string = '';

  constructor(public userService: UserService) { }

  activateUser(): void {
    const url: string = 'http://localhost:250/api/v1/users/' + this.user_id + '/' + 'activate';
    const payload: object = {token: this.token};

    this.userService.activateAccount(payload, url).subscribe(data => {
      console.log(data);
    });

  }
}
