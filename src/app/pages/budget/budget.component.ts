import { routes } from './../../app.routes';
import { Component, inject, OnInit } from '@angular/core';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { NgFor,KeyValuePipe, CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { BudgetService } from '../../services/budget/budget.service';
import { Budget } from '../../Models/budget.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [BudgetFormComponent,NgFor,KeyValuePipe,CommonModule,FontAwesomeModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent implements OnInit {
  toastr= inject(ToastrService)
  service=inject(BudgetService)
  router = inject(Router);


  ngOnInit():void{
    this.service.refreshList();
  }

  populateForm(selectedRecord: Budget){
    this.service.formData = Object.assign({},selectedRecord) 
    let tempDate = new Date(this.service.formData.Month ?? new Date);
    this.service.formData.Month=this.service.userService.getDate(tempDate)
    this.router.navigateByUrl('budget/create');
    this.service.isUpdate= true
  }

  onDelete(id:string){
    if(confirm('Are you sure to delete this budget')){
      this.service.deleteBudget(id)
      .subscribe({
        next:
        (res:any) => {
          this.service.list = res as Budget[]
          this.toastr.error('Deleted successfully', 'Budget')
          this.service.formData= new Budget()
          this.service.formData.Month=this.service.userService.getDate(new Date)       
        },
        error: (err:any) => {console.log(err)}
      })
    }  
  }

}
