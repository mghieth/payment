import { Component, inject, OnInit } from '@angular/core';
import { PaymentDetailsComponent } from "../../payment-details/payment-details.component";
import { TransactionService } from '../../services/transaction/transaction.service';
import { Transaction } from '../../Models/transaction.model';
import { NgFor, NgStyle } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PaymentDetailsComponent,NgFor,NgStyle],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  userService= inject(UserService)
  transactionService= inject(TransactionService)
  listTransaction: Transaction[]=[]
  currentMonth:number = new Date().getMonth()+1

  ngOnInit(): void {
    this.transactionService.getIncomeExpense();
    
  }
 


}
