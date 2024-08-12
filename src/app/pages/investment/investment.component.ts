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

  ngOnInit(): void {
    this.service.refreshList();
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
