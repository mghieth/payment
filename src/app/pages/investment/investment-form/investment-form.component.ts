import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { InvestmentService } from '../../../services/investment/investment.service';
import { Investment } from '../../../Models/investment.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-investment-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './investment-form.component.html',
  styleUrl: './investment-form.component.css'
})
export class InvestmentFormComponent implements OnInit {
  constructor(public service: InvestmentService,private toastr: ToastrService){

  }
  router = inject(Router);

  ngOnInit(): void {
    this.service.formData.DateOfInvestment=this.service.userService.getDate(new Date)
  }

  onSubmit(form:NgForm){
    this.service.formSubmitted = true
    if(form.valid){
    if(this.service.formData.Id=="")
      this.insertRecord(form)

    else this.updateRecord(form)
    }
    
  }
  onclick() {
    this.service.isReturnHereChecked = !this.service.isReturnHereChecked;
  }

  insertRecord(form:NgForm){
    this.service.postInvestment()
    .subscribe({
      next:(res:any) => {
        debugger;
        this.service.list = res as  Investment[]
        this.service.resetForm(form)
        this.toastr.success('Inserted successfully', 'Investment')
        if (!this.service.isReturnHereChecked) {
          this.router.navigateByUrl('/investment');
        }
      },
      error:(err: any) => {console.log(err)}
    })
  }

  updateRecord(form:NgForm){
    this.service.putInvestment()
    .subscribe({
      next:(res:any) => {
        this.service.list = res as  Investment[]
        this.service.resetForm(form)
        this.toastr.info('Updated successfully', 'Investment')
        this.router.navigateByUrl('/investment');
      },
      error:(err: any) => {console.log(err)}
    })
  }
}
