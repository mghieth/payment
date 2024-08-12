import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgFor } from '@angular/common';
import { SavingGoalFormComponent } from './saving-goal-form/saving-goal-form.component';
import { SavingGoalService } from '../../services/savingGoal/saving-goal.service';
import { SavingGoal } from '../../Models/saving-goal.model';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saving-goal',
  standalone: true,
  imports: [
    SavingGoalFormComponent,
    NgFor,
    ProgressBarModule,
    ToastModule,
    CommonModule,
  ],
  templateUrl: './saving-goal.component.html',
  styleUrl: './saving-goal.component.css',
})
export class SavingGoalComponent implements OnInit {
  toastr = inject(ToastrService);
  service = inject(SavingGoalService);
  router = inject(Router);
  rows: number = 5
  current_page: number = 1
  ngOnInit(): void {
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

  populateForm(selectedRecord: SavingGoal) {
    this.service.formData = Object.assign({}, selectedRecord);
    let tempDate = new Date(this.service.formData.Deadline ?? new Date());
    this.service.formData.Deadline = this.service.userService.getDate(tempDate);
    this.router.navigateByUrl('goal/create');
    this.service.isUpdate = true;
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this goal')) {
      this.service.deleteSavingGoal(id).subscribe({
        next: (res: any) => {
          this.service.list = res as SavingGoal[];
          this.toastr.error('Deleted successfully', 'Goal');
          this.service.formData = new SavingGoal();
          this.service.formData.Deadline = this.service.userService.getDate(
            new Date()
          );
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
