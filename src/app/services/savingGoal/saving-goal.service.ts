import { UserService } from './../user.service';
import { Injectable,inject} from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SavingGoal } from '../../Models/saving-goal.model';

@Injectable({
  providedIn: 'root'
})
export class SavingGoalService {

  userService=inject(UserService)
  http=inject(HttpClient)
  url:string = environment.apiBaseUrl + '/SavingGoal'
  list:SavingGoal[]=[]
  formData:SavingGoal = new SavingGoal()
  formSubmitted:boolean = false;
  userId:any= localStorage.getItem("UserId")

  refreshList(){
    debugger;
      this.http.get(this.url+'?userId='+this.userId)
      .subscribe({
        next: (res: any)=>{
         this.list= res as SavingGoal[]
        },
        error : (err: any)=>{console.log(err)}
      })
  }

  postSavingGoal(){
    this.formData.UserId=this.userId
    return this.http.post(this.url,this.formData)
  }

  putSavingGoal(){
    this.formData.UserId=this.userId
    return this.http.put(this.url+'/'+this.formData.Id,this.formData)
  }

  deleteSavingGoal(id:string){
    return this.http.delete(this.url+'/'+id+'?userId='+this.userId)
  }
  resetForm(form:NgForm){
    form.form.reset()
    this.formData= new SavingGoal()
    this.formSubmitted = false;
  }

}
