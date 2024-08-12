import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { DebtService } from '../../../services/debt/debt.service';
import { Debt } from '../../../Models/debt.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debt-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './debt-form.component.html',
  styleUrl: './debt-form.component.css',
})
export class DebtFormComponent implements OnInit {
  constructor(public service: DebtService, private toastr: ToastrService) {}
  router = inject(Router);

  ngOnInit(): void {
    this.service.formData.DueDate = this.service.userService.getDate(
      new Date()
    );
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
  }

  insertRecord(form: NgForm) {
    this.service.postDebt().subscribe({
      next: (res: any) => {
        this.service.list = res as Debt[];
        this.service.resetForm(form);
        this.toastr.success('Inserted successfully', 'Investment');
        if (!this.service.isReturnHereChecked) {
          this.router.navigateByUrl('/debt');
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateRecord(form: NgForm) {
    this.service.putDebt().subscribe({
      next: (res: any) => {
        this.service.list = res as Debt[];
        this.service.resetForm(form);
        this.toastr.info('Updated successfully', 'Investment');
        this.router.navigateByUrl('/debt');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
