import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-register-form',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './user-register-form.component.html',
  styleUrl: './user-register-form.component.css'
})
export class UserRegisterFormComponent {
  service=inject(UserService)

  onRegister(form:NgForm){
    this.service.onRegister(form)
  }
}
