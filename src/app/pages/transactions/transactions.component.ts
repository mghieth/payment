import { Component,OnInit,inject } from '@angular/core';
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../../Models/transaction.model';
import{CommonModule, NgFor, NgStyle} from '@angular/common';
import { TransactionService } from '../../services/transaction/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionFormComponent,NgStyle,CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})

export class TransactionsComponent implements OnInit{
  toastr= inject(ToastrService)
  service=inject(TransactionService)
  router = inject(Router);
  rows: number = 5
  current_page: number = 1
       
  ngOnInit():void{
    this.service.refreshList();
  }

  displayList(page:number){
    const start=this.rows * (page-1)
    const end = start+ this.rows
    return this.service.list.slice(start,end)
  }

  setPagination(){
    const page_cont= Math.ceil(this.service.list.length/this.rows)
    return Array.from({length:page_cont},(_,i)=>i+1);
  }

  onPageChange(page:number){
    this.current_page=page;
  }

  previous(){
    if( this.current_page > 1 )
    this.current_page=this.current_page-1
  }

  next(){
    if(Math.ceil(this.service.list.length/this.rows) > this.current_page)
      this.current_page=this.current_page+1
  }

  populateForm(selectedRecord: Transaction){
    this.service.formData = Object.assign({},selectedRecord)
    let tempDate = new Date(this.service.formData.Date ?? new Date);
    this.service.formData.Date= this.service.userService.getDate(tempDate)
    if(this.service.formData.Type == 'Income')
      this.service.isIncome=true
    else this.service.isIncome=false
    this.router.navigateByUrl('transaction/create');
    this.service.isUpdate= true
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
