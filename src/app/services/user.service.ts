import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  toastr = inject(ToastrService)
  router = inject(Router);
  http=inject(HttpClient);
  newUser : User = new User()
  userId:any = localStorage.getItem("UserId")

  url:string = environment.apiBaseUrl + '/User'
  loginObj:any = {
    "Email":"",
    "Password":""
  }

getUserId(){
  this.userId
}

  onLogin(){
    debugger;
    this.http.post(this.url+'/login',this.loginObj)
    .subscribe((res:any)=>{
      debugger;
      if(res.Result){
        alert("login success")
        localStorage.setItem("LoginToken",res.Token)
        localStorage.setItem("UserId",res.UserId)
        this.router.navigateByUrl("dashboard")
      } else {
        alert("Check email or password")
      }
    })
  }
  
  
  onRegister(form:NgForm){
    if(form.valid){
      this.http.post(this.url,this.newUser)
      .subscribe({
        next:(res:any) => {
          this.toastr.success('Register successfully', 'user')
          localStorage.setItem("LoginToken",res.Token)
          localStorage.setItem("UserId",res.UserId)
          this.router.navigateByUrl("dashboard")
        },
        error:(err: any) => {console.log(err)}
      })
    }
    
  }


  getUser(){
    debugger;
         this.http.get(this.url+'?id='+this.userId)
      .subscribe({
        next: (res: any)=>{
         this.newUser= res as User
        },
        error : (err: any)=>{console.log(err)}
      })
  }

  UpdateUser(){
    debugger
   return this.http.put(this.url+'/'+this.userId,this.newUser)
  }
  
  resetForm(form:NgForm){
    form.form.reset()
    this.newUser= new User()
  }
}
