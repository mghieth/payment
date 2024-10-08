import { CategoryService } from './../../../services/category/category.service';
import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Category, Transaction } from '../../../Models/transaction.model';
import {  NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent implements OnInit {
  constructor(
    public service: TransactionService,
    private toastr: ToastrService,
    public categoryService: CategoryService
  ) {}

  router = inject(Router);

  Cateegory = new Category();

  ngOnInit(): void {
    this.categoryService.getCategories();
    this.service.formData.Date = this.service.userService.getDate(new Date());
  }

  onclick() {
    this.service.isReturnHereChecked = !this.service.isReturnHereChecked;
  }

  toggleForms() {
    if (this.service.formData.Type == 'Income') {
      this.service.isIncome = true;
    } else {
      this.service.isIncome = false;
    }
  }

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    if (form.valid) {
      if (this.service.formData.Id == '') this.insertRecord(form);
      else this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    debugger
    this.service.postTransaction().subscribe({
      next: (res: any) => {
        this.service.list = res as Transaction[];
        this.service.resetForm(form);
        this.toastr.success('Inserted successfully', 'Transaction');
        if (!this.service.isReturnHereChecked) {
          this.router.navigateByUrl('/transaction');
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateRecord(form: NgForm) {
    this.service.putTransaction().subscribe({
      next: (res: any) => {
        this.service.list = res as Transaction[];
        this.service.resetForm(form);
        this.toastr.info('Updated successfully', 'Transaction');
        this.router.navigateByUrl('/transaction');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
