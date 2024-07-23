import { UserService } from './../user.service';
import { Injectable,inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Budget } from '../../Models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  userService=inject(UserService)
  url:string = environment.apiBaseUrl + '/budget'
  list:Budget[]=[]
  formData:Budget = new Budget()
  formSubmitted:boolean = false;
  userId:any= localStorage.getItem("UserId")
  http=inject(HttpClient)
  dictionary: { [key: string]: number } = {"": 0, "1": 0};

  refreshList(){
    debugger;
      this.http.get(this.url+'?userId='+this.userId)
      .subscribe({
        next: (res: any)=>{
         this.list= res as Budget[]
        },
        error : (err: any)=>{console.log(err)}
      })
  }
  
    postBudget(category: string, amount: number){
      this.formData.UserId=this.userId
      debugger;
      this.formData.AllocatedAmounts={[category]: amount};
      return this.http.post(this.url,this.formData)
    }
  
    putBudget(category: string, amount: number){
      this.formData.UserId=this.userId
      this.dictionary={[category]: amount};
      this.formData.AllocatedAmounts={[category]: amount};
      return this.http.put(this.url+'/'+this.formData.Id,this.formData)
    }
   
    deleteBudget(id:string){
      return this.http.delete(this.url+'/'+id+'?userId='+this.userId)
    }
    resetForm(form:NgForm){
      form.form.reset()
      this.formData= new Budget()
      this.formSubmitted = false;
    }
}
