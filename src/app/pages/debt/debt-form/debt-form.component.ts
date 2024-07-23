import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DebtService } from '../../../services/debt/debt.service';
import { Debt } from '../../../Models/debt.model';

@Component({
  selector: 'app-debt-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './debt-form.component.html',
  styleUrl: './debt-form.component.css'
})
export class DebtFormComponent {
  constructor(public service: DebtService,private toastr: ToastrService){

  }

  onSubmit(form:NgForm){
    this.service.formSubmitted = true
    if(form.valid){
    if(this.service.formData.Id=="")
      this.insertRecord(form)

    else this.updateRecord(form)
    }
    
  }

  insertRecord(form:NgForm){
    this.service.postDebt()
    .subscribe({
      next:(res:any) => {
        debugger;
        this.service.list = res as  Debt[]
        this.service.resetForm(form)
        this.toastr.success('Inserted successfully', 'Investment')
      },
      error:(err: any) => {console.log(err)}
    })
  }

  updateRecord(form:NgForm){
    this.service.putDebt()
    .subscribe({
      next:(res:any) => {
        this.service.list = res as  Debt[]
        this.service.resetForm(form)
        this.toastr.info('Updated successfully', 'Investment')
      },
      error:(err: any) => {console.log(err)}
    })
  }
}
