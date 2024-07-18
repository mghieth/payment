import { Injectable,inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Transaction } from '../../Models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  url:string = environment.apiBaseUrl + '/Transaction'
  list:Transaction[]=[]
  formData:Transaction = new Transaction()
  formSubmitted:boolean = false;
  http=inject(HttpClient)
  
  refreshList(){
      this.http.get(this.url)
      .subscribe({
        next: (res: any)=>{
         this.list= res as Transaction[]
        },
        error : (err: any)=>{console.log(err)}
      })
  }
  
    postTransaction(){
      return this.http.post(this.url,this.formData)
    }
  
    putTransaction(){
      return this.http.put(this.url+'/'+this.formData.Id,this.formData)
    }
  
    deleteTransaction(id:string){
      return this.http.delete(this.url+'/'+id)
    }
  
    resetForm(form:NgForm){
      form.form.reset()
      this.formData= new Transaction()
      this.formSubmitted = false;
    }
  }
