import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgFor } from '@angular/common';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { InvestmentService } from '../../services/investment/investment.service';
import { Investment } from '../../Models/investment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [InvestmentFormComponent, NgFor, CommonModule],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css',
})
export class InvestmentComponent implements OnInit {
  toastr = inject(ToastrService);
  router = inject(Router);
  service = inject(InvestmentService);
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

  populateForm(selectedRecord: Investment) {
    this.service.formData = Object.assign({}, selectedRecord);
    let tempDate = new Date(
      this.service.formData.DateOfInvestment ?? new Date()
    );
    this.service.formData.DateOfInvestment =
      this.service.userService.getDate(tempDate);
    this.router.navigateByUrl('investment/create');
    this.service.isUpdate = true;
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this investment')) {
      this.service.deleteInvestment(id).subscribe({
        next: (res: any) => {
          this.service.list = res as Investment[];
          this.toastr.error('Deleted successfully', 'Investment');
          this.service.formData = new Investment();
          this.service.formData.DateOfInvestment =
            this.service.userService.getDate(new Date());
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }
}
