import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { SavingGoalService } from '../../../services/savingGoal/saving-goal.service';
import { SavingGoal } from '../../../Models/saving-goal.model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-saving-goal-form',
  standalone: true,
  imports: [FormsModule,NgStyle],
  templateUrl: './saving-goal-form.component.html',
  styleUrl: './saving-goal-form.component.css'
})
export class SavingGoalFormComponent implements OnInit{
  constructor(public service: SavingGoalService,private toastr: ToastrService){

  }
  ngOnInit(): void {
    this.service.formData.Deadline=this.service.userService.getDate(new Date)

  }
showError:boolean=false
  onSubmit(form:NgForm){
    this.service.formSubmitted = true
    if(form.valid){
    if(this.service.formData.Id=="")
      this.insertRecord(form)
    else this.updateRecord(form)}
  }
  
  insertRecord(form:NgForm){
    if(this.service.formData.CurrentAmount > this.service.formData.TargetAmount){
      this.showError=true
    }else{
      this.showError=false
      this.service.postSavingGoal()
      .subscribe({
        next:(res:any) => {
          debugger;
          this.service.list = res as  SavingGoal[]
          this.service.resetForm(form)
          this.toastr.success('Inserted successfully', 'SavingGoal')
        },
        error:(err: any) => {console.log(err)}
      })
    }
   
  }

  updateRecord(form:NgForm){
    this.service.putSavingGoal()
    .subscribe({
      next:(res:any) => {
        this.service.list = res as  SavingGoal[]
        this.service.resetForm(form)
        this.toastr.info('Updated successfully', 'SavingGoal')
      },
      error:(err: any) => {console.log(err)}
    })
  }

}
