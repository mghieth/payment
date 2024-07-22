import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { SavingGoalService } from '../../../services/savingGoal/saving-goal.service';
import { SavingGoal } from '../../../Models/saving-goal.model';

@Component({
  selector: 'app-saving-goal-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './saving-goal-form.component.html',
  styleUrl: './saving-goal-form.component.css'
})
export class SavingGoalFormComponent {
  constructor(public service: SavingGoalService,private toastr: ToastrService){

  }

  onSubmit(form:NgForm){
    this.service.formSubmitted = true
    if(form.valid){
    if(this.service.formData.Id=="")
      this.insertRecord(form)
    else this.updateRecord(form)}
  }
  
  insertRecord(form:NgForm){
    this.service.postTransaction()
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

  updateRecord(form:NgForm){
    this.service.putTransaction()
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
