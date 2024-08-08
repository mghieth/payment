import { Component,OnInit,inject } from '@angular/core';
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../../Models/transaction.model';
import {HttpClient} from "@angular/common/http";
import{CommonModule, NgFor, NgStyle} from '@angular/common';
import { TransactionService } from '../../services/transaction/transaction.service';


@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionFormComponent,NgFor,NgStyle,CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})

export class TransactionsComponent implements OnInit{
  toastr= inject(ToastrService)
  http= inject(HttpClient)
  service=inject(TransactionService)

  ngOnInit():void{
    this.service.refreshList();
  }

  populateForm(selectedRecord: Transaction){
    this.service.formData = Object.assign({},selectedRecord)
    let tempDate = new Date(this.service.formData.Date ?? new Date);
    this.service.formData.Date= this.service.userService.getDate(tempDate)
    if(this.service.formData.Type == 'Income')
      this.service.isIncome=true
    else this.service.isIncome=false
  }

  onDelete(id:string){
    if(confirm('Are you sure to delete this transaction')){
      this.service.deleteTransaction(id)
      .subscribe({
        next:
        (res:any) => {
          this.service.list = res as Transaction[]
          this.toastr.error('Deleted successfully', 'Transaction')
          this.service.formData= new Transaction()
          this.service.formData.Date=this.service.userService.getDate(new Date) 
        },
        error: (err:any) => {console.log(err)}
      })
    }
  }
}
