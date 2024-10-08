import { Category } from './../../Models/transaction.model';
import { UserService } from './../user.service';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Transaction } from '../../Models/transaction.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  userService = inject(UserService);
  http = inject(HttpClient);
  url: string = environment.apiBaseUrl + '/Transaction';
  list: Transaction[] = [];
  filterList: Transaction[] = [];

  formData: Transaction = new Transaction();
  formSubmitted: boolean = false;
  userId: any = localStorage.getItem('UserId');
  totalexpens: number = 0;
  totalIncome: number = 0;
  balanceAmount: number = 0;
  isIncome = false;
  fromDate:Date =new Date
  toDate:Date = new Date
  Category= new Category()
  isUpdate:boolean = false
  isReturnHereChecked:boolean = true

  refreshList() {
    this.http.get(this.url + '?userId=' + this.userId).subscribe({
      next: (res: any) => {
        this.list = res as Transaction[];
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  applyFilterBetweenTwoDates() {
    debugger;
    this.totalexpens= 0;
    this.totalIncome = 0;
    this.balanceAmount = 0;
    this.http
      .get(
        this.url +
          '/GetAllTransactionwithFilter?userId=' +
          this.userId +
          '&FromDate=' +
          this.fromDate +
          '&ToDate=' +
          this.toDate +
          '&Category=' +
          this.Category.Name
      )
      .subscribe({
        next: (res: any) => {
          this.filterList = res as Transaction[];
          this.filterList.forEach((element) => {
            if (element.Type == 'Income') {
              this.totalIncome = this.totalIncome + element.Amount;
            }
            if (element.Type == 'Expense') {
              this.totalexpens = this.totalexpens + element.Amount;
            }
            this.balanceAmount = this.totalIncome - this.totalexpens;
          });
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  getIncomeExpense() {
    this.http.get(this.url + '?userId=' + this.userId).subscribe({
      next: (res: any) => {
        this.list = res as Transaction[];
        this.list.forEach((element) => {
          if (element.Type == 'Income') {
            this.totalIncome = this.totalIncome + element.Amount;
          }
          if (element.Type == 'Expense') {
            this.totalexpens = this.totalexpens + element.Amount;
          }
          this.balanceAmount = this.totalIncome - this.totalexpens;
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  postTransaction() {
    this.formData.UserId = this.userId;
    return this.http.post(this.url, this.formData);
  }

  putTransaction() {
    this.formData.UserId = this.userId;
    return this.http.put(this.url + '/' + this.formData.Id, this.formData);
  }

  deleteTransaction(id: string) {
    return this.http.delete(this.url + '/' + id + '?userId=' + this.userId);
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.formData = new Transaction();
    this.formSubmitted = false;
    this.formData.Date = this.userService.getDate(new Date());
  }
}
