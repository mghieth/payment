import { Component,OnInit,inject } from '@angular/core';
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../../Models/transaction.model';
import {HttpClient} from "@angular/common/http";
import{NgFor} from '@angular/common';
import { TransactionService } from '../../services/transaction/transaction.service';


@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionFormComponent,NgFor],
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
  }

  onDelete(id:string){
    if(confirm('Are you sure to delete this student')){
      this.service.deleteTransaction(id)
      .subscribe({
        next:
        (res:any) => {
          this.service.list = res as Transaction[]
          this.toastr.error('Deleted successfully', 'Student')
        },
        error: (err:any) => {console.log(err)}
      })
    }
   
  }
}
