// register.component.ts
import {Component} from "@angular/core";
import {UserService} from "../../Core/Service/user.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(public userService: UserService) {
  }

  register() {

    const user = {name: this.name, email: this.email, password: this.password};

    this.userService.register(user).subscribe( data => {
      console.log(data);
    });

    console.log(this.name);
    console.log(this.email);
    console.log(this.password);
  }
}
