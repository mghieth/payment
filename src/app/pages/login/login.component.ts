import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import{NgIf} from '@angular/common';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

http=inject(HttpClient);
service=inject(UserService)
isLoginFormVisible = true;


formSubmitted:boolean = false;
toggleForms() {
  this.isLoginFormVisible = !this.isLoginFormVisible;
}

onLogin(form:NgForm){
  this.service.onLogin(form)
}

}
