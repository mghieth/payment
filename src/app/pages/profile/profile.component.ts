import { Component,inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{
  service=inject(UserService)
  toastr=inject(ToastrService)


  onSubmit(form:NgForm){
    if(form.valid){
      this.service.UpdateUser()
      .subscribe({
        next:(res:any) => {
          this.toastr.info('Updated successfully', 'User')
        },
        error:(err: any) => {console.log(err)}
      })
    }
    
  }

}
