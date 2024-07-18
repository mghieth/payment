import { PaymentDetail } from './../../shared/payment-detail.model';
import { FormsModule } from '@angular/forms';
import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment-details-form.component.html',
  styleUrl: './payment-details-form.component.css'
})
export class PaymentDetailsFormComponent {

  constructor(public service: PaymentDetailService,private toastr: ToastrService){

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
    this.service.postPaymentDetail()
    .subscribe({
      next:(res:any) => {
        this.service.list = res as  PaymentDetail[]
        this.service.resetForm(form)
        this.toastr.success('Inserted successfully', 'Student')
      },
      error:(err: any) => {console.log(err)}
    })
  }

  updateRecord(form:NgForm){
    this.service.putPaymentDetail()
    .subscribe({
      next:(res:any) => {
        this.service.list = res as  PaymentDetail[]
        this.service.resetForm(form)
        this.toastr.info('Updated successfully', 'Student')
      },
      error:(err: any) => {console.log(err)}
    })
  }
}
