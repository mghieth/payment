import { FormsModule, NgForm } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction/transaction.service';
import { Transaction } from '../../Models/transaction.model';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { UserService } from '../../services/user.service';
import { TransactionsComponent } from '../transactions/transactions.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgStyle, FormsModule, TransactionsComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userService = inject(UserService);
  transactionService = inject(TransactionService);
  showCalculation: boolean = false;

  ngOnInit(): void {
    // this.transactionService.getIncomeExpense();
    this.showCalculation = false;
  }

  onSubmit(form: NgForm) {
    debugger;
    this.transactionService.applyFilterBetweenTwoDates(
      form.value.fromDate,
      form.value.toDate
    );
    this.showCalculation = true;
  }
}
