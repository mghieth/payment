import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { InvestmentService } from '../../../services/investment/investment.service';
import { Investment } from '../../../Models/investment.model';


@Component({
  selector: 'app-investment-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './investment-form.component.html',
  styleUrl: './investment-form.component.css'
})
export class InvestmentFormComponent {
  constructor(public service: InvestmentService,private toastr: ToastrService){

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
    this.service.postInvestment()
    .subscribe({
      next:(res:any) => {
        debugger;
        this.service.list = res as  Investment[]
        this.service.resetForm(form)
        this.toastr.success('Inserted successfully', 'Investment')
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
      },
      error:(err: any) => {console.log(err)}
    })
  }
}
