import { Component, inject, OnInit } from '@angular/core';
import { BudgetService } from '../../../services/budget/budget.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Budget } from '../../../Models/budget.model';
import { NgFor, KeyValuePipe, CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../Models/transaction.model';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [FormsModule, NgFor, KeyValuePipe, CommonModule,FontAwesomeModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
})
export class BudgetFormComponent implements OnInit {
  constructor(
    public service: BudgetService,
    private toastr: ToastrService,
    public categoryService: CategoryService
  ) {}
  router = inject(Router);
  dict: [] = [];
  Category = new Category();

  ngOnInit(): void {
    this.categoryService.getCategories();
    this.service.formData.Month = this.service.userService.getDate(new Date());
  }

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    if (form.valid) {
      if (this.service.formData.Id == '') this.insertRecord(form);
      else this.updateRecord(form);
    }
  }
  onclick() {
    this.service.isReturnHereChecked = !this.service.isReturnHereChecked;
    console.log(this.service.isReturnHereChecked);
  }

  insertRecord(form: NgForm) {
    this.service.postBudget().subscribe({
      next: (res: any) => {
        this.service.list = res as Budget[];
        this.service.resetForm(form);
        this.toastr.success('Inserted successfully', 'Budget');
        if (!this.service.isReturnHereChecked) {
          this.router.navigateByUrl('/budget');
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateRecord(form: NgForm) {
    this.service.putBudget().subscribe({
      next: (res: any) => {
        this.service.list = res as Budget[];
        this.service.resetForm(form);
        this.toastr.info('Updated successfully', 'Budget');
        this.router.navigateByUrl('/budget');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
