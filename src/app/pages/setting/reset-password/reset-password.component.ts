import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, NgStyle],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  service = inject(UserService);
  toastr = inject(ToastrService);
  isWrongPassword: boolean = false;
  isConfirmPassword: boolean = false;

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.service.newUser.Password == this.service.oldPassword) {
        this.isWrongPassword = false;
        if (this.service.newPassword == this.service.confirmNewPassword) {
          this.isConfirmPassword = false;
          this.service.newUser.Password = this.service.newPassword;
          this.service.UpdateUser().subscribe({
            next: (res: any) => {
              this.toastr.info('Updated successfully', 'Password');
              form.form.reset();
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        } else {
          this.isConfirmPassword = true;
        }
      } else {
        this.isWrongPassword = true;
      }
    }
  }
}
