import { Component,inject, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  service=inject(UserService)
  toastr=inject(ToastrService)


  ngOnInit(){
    this.service.getUser();

  }

  onSubmit(form:NgForm){
    if(form.valid){
    this.updateRecord()
    }
    
  }

  updateRecord(){
    debugger;
    this.service.UpdateUser()
    .subscribe({
      next:(res:any) => {
        this.toastr.info('Updated successfully', 'User')
      },
      error:(err: any) => {console.log(err)}
    })
  }
}
