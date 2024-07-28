import { provideToastr } from 'ngx-toastr';
import { UserService } from './../user.service';
import { Injectable,inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Transaction } from '../../Models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  userService=inject(UserService)
  http=inject(HttpClient)
  url:string = environment.apiBaseUrl + '/Transaction'
  list:Transaction[]=[]
  formData:Transaction = new Transaction()
  formSubmitted:boolean = false;
  userId:any= localStorage.getItem("UserId")
  totalexpens:number=0
  totalIncome:number=0

  
  
  refreshList(){
    debugger;
      this.http.get(this.url+'?userId='+this.userId)
      .subscribe({
        next: (res: any)=>{
         this.list= res as Transaction[]
        },
        error : (err: any)=>{console.log(err)}
      })
  }

getIncomeExpense(){
  debugger
  this.http.get(this.url+'?userId='+this.userId)
      .subscribe({
        next: (res: any)=>{
         this.list= res as Transaction[]
         this.list.forEach(element => {
          if(element.Category=="income"){
            this.totalIncome= this.totalIncome + element.Amount 
          }
          if(element.Category=="expense"){
            this.totalexpens=this.totalexpens + element.Amount
          }
        });
        },
        error : (err: any)=>{console.log(err)}
      })
}


  
    postTransaction(){
      this.formData.UserId=this.userId
      return this.http.post(this.url,this.formData)
    }
  
    putTransaction(){
      this.formData.UserId=this.userId
      return this.http.put(this.url+'/'+this.formData.Id,this.formData)
    }
  
    deleteTransaction(id:string){
      return this.http.delete(this.url+'/'+id+'?userId='+this.userId)
    }
  
    resetForm(form:NgForm){
      form.form.reset()
      this.formData= new Transaction()
      this.formSubmitted = false;
    }
  }
