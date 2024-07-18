import { PaymentDetailService } from './../shared/payment-detail.service';
import { Component,OnInit} from '@angular/core';
import{NgFor} from '@angular/common';
import { PaymentDetailsFormComponent } from "./payment-details-form/payment-details-form.component";
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [PaymentDetailsFormComponent, NgFor],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})

export class PaymentDetailsComponent implements OnInit{

  constructor(public service: PaymentDetailService,private toastr: ToastrService){
  }

  ngOnInit():void{
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail){
    this.service.formData = Object.assign({},selectedRecord) 
  }

  onDelete(id:string){
    if(confirm('Are you sure to delete this student')){
      this.service.deletePaymentDetail(id)
      .subscribe({
        next:
        (res:any) => {
          this.service.list = res as PaymentDetail[]
          this.toastr.error('Deleted successfully', 'Student')
        },
        error: (err:any) => {console.log(err)}
      })
    }
   
  }
}
