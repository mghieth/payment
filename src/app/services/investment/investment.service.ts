import { UserService } from './../user.service';
import { Injectable,inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Investment } from '../../Models/investment.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  userService=inject(UserService)
  http=inject(HttpClient)
  url:string = environment.apiBaseUrl + '/Investment'
  list:Investment[]=[]
  formData:Investment = new Investment()
  formSubmitted:boolean = false;
  userId:any= localStorage.getItem("UserId")

  refreshList(){
    debugger;
      this.http.get(this.url+'?userId='+this.userId)
      .subscribe({
        next: (res: any)=>{
         this.list= res as Investment[]
        },
        error : (err: any)=>{console.log(err)}
      })
  }
  
    postInvestment(){
      this.formData.UserId=this.userId
      return this.http.post(this.url,this.formData)
    }
  
    putInvestment(){
      this.formData.UserId=this.userId
      return this.http.put(this.url+'/'+this.formData.Id,this.formData)
    }

    deleteInvestment(id:string){
      return this.http.delete(this.url+'/'+id+'?userId='+this.userId)
    }

    resetForm(form:NgForm){
      form.form.reset()
      this.formData= new Investment()
      this.formSubmitted = false;
      this.formData.DateOfInvestment=this.userService.getDate(new Date)

    }
}
