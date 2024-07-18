import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import{NgIf} from '@angular/common';
import { User } from '../../Models/user.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  url:string = environment.apiBaseUrl + '/User'
loginObj:any = {
  "Email":"",
  "Password":""
}

isLoginFormVisible = true;

http=inject(HttpClient);
router = inject(Router);
toastr = inject(ToastrService)

newUser : User = new User()
formSubmitted:boolean = false;
toggleForms() {
  this.isLoginFormVisible = !this.isLoginFormVisible;
}

onLogin(){
  debugger;
  this.http.post(this.url+'/login',this.loginObj)
  .subscribe((res:any)=>{
    debugger;
    if(res.Result){
      alert("login success")
      localStorage.setItem("LoginToken",res.Token)
      this.router.navigateByUrl("dashboard")
    } else {
      alert("Check email or password")
    }
  })
}


onRegister(form:NgForm){
  this.formSubmitted = true
  if(form.valid){
    this.http.post(this.url,this.newUser)
    .subscribe({
      next:(res:any) => {
        this.toastr.success('Register successfully', 'user')
        this.router.navigateByUrl("dashboard")
      },
      error:(err: any) => {console.log(err)}
    })
  }
  
}
}
