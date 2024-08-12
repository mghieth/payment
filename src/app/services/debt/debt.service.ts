import { UserService } from './../user.service';
import { Injectable,inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Debt } from '../../Models/debt.model';

@Injectable({
  providedIn: 'root'
})
export class DebtService {

  userService=inject(UserService)
  http=inject(HttpClient)
  url:string = environment.apiBaseUrl + '/Debt'
  list:Debt[]=[]
  formData:Debt = new Debt()
  formSubmitted:boolean = false;
  userId:any= localStorage.getItem("UserId")
  isUpdate:boolean = false
  isReturnHereChecked:boolean = true

  refreshList(){
    debugger;
      this.http.get(this.url+'?userId='+this.userId)
      .subscribe({
        next: (res: any)=>{
         this.list= res as Debt[]
        },
        error : (err: any)=>{console.log(err)}
      })
  }
  
    postDebt(){
      this.formData.UserId=this.userId
      return this.http.post(this.url,this.formData)
    }
  
    putDebt(){
      this.formData.UserId=this.userId
      return this.http.put(this.url+'/'+this.formData.Id,this.formData)
    }

    deleteDebt(id:string){
      return this.http.delete(this.url+'/'+id+'?userId='+this.userId)
    }

    resetForm(form:NgForm){
      form.form.reset()
      this.formData= new Debt()
      this.formSubmitted = false;
      this.formData.DueDate=this.userService.getDate(new Date)
    }
}
