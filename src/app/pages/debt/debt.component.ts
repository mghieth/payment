import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgFor } from '@angular/common';
import { DebtFormComponent } from './debt-form/debt-form.component';
import { DebtService } from '../../services/debt/debt.service';
import { Debt } from '../../Models/debt.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debt',
  standalone: true,
  imports: [DebtFormComponent, NgFor, CommonModule],
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.css',
})
export class DebtComponent implements OnInit {
  toastr = inject(ToastrService);
  router = inject(Router);
  service = inject(DebtService);
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

  populateForm(selectedRecord: Debt) {
    this.service.formData = Object.assign({}, selectedRecord);
    let tempDate = new Date(this.service.formData.DueDate ?? new Date());
    this.service.formData.DueDate = this.service.userService.getDate(tempDate);
    this.router.navigateByUrl('debt/create');
    this.service.isUpdate = true;
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this debt')) {
      this.service.deleteDebt(id).subscribe({
        next: (res: any) => {
          this.service.list = res as Debt[];
          this.toastr.error('Deleted successfully', 'Debt');
          this.service.formData = new Debt();
          this.service.formData.DueDate = this.service.userService.getDate(
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
