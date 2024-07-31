import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../../services/budget/budget.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Budget } from '../../../Models/budget.model';
import { NgFor,KeyValuePipe } from '@angular/common';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../Models/transaction.model';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [FormsModule,NgFor,KeyValuePipe],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css'
})
export class BudgetFormComponent implements OnInit {
  constructor(public service: BudgetService,private toastr: ToastrService,public categoryService: CategoryService){
  }

  dict: [] = [];

  Category = new Category();

  ngOnInit(): void {
    this.categoryService.getCategories()
    this.service.formData.Month=this.service.userService.getDate(new Date)
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
    this.service.postBudget(form.value.newKey, form.value.newValue)
    .subscribe({
      next:(res:any) => {
        this.service.list = res as  Budget[]
        this.service.resetForm(form)
        this.toastr.success('Inserted successfully', 'Budget')
      },
      error:(err: any) => {console.log(err)}
    })
  }

  updateRecord(form:NgForm){
    this.service.putBudget(form.value.newKey, form.value.newValue)
    .subscribe({
      next:(res:any) => {
        this.service.list = res as  Budget[]
        this.service.resetForm(form)
        this.toastr.info('Updated successfully', 'Budget')
      },
      error:(err: any) => {console.log(err)}
    })
  }
}
