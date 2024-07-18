import { Component,inject } from '@angular/core';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Transaction } from '../../../Models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {
 
  constructor(public service: TransactionService,private toastr: ToastrService){

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
    this.service.postTransaction()
    .subscribe({
      next:(res:any) => {
        debugger;
        this.service.list = res as  Transaction[]
        this.service.resetForm(form)
        this.toastr.success('Inserted successfully', 'Transaction')
      },
      error:(err: any) => {console.log(err)}
    })
  }

  updateRecord(form:NgForm){
    this.service.putTransaction()
    .subscribe({
      next:(res:any) => {
        this.service.list = res as  Transaction[]
        this.service.resetForm(form)
        this.toastr.info('Updated successfully', 'Transaction')
      },
      error:(err: any) => {console.log(err)}
    })
  }
}
