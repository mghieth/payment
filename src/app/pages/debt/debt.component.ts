import { Component,OnInit,inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from "@angular/common/http";
import{CommonModule, NgFor} from '@angular/common';
import { DebtFormComponent } from './debt-form/debt-form.component';
import { DebtService } from '../../services/debt/debt.service';
import { Debt } from '../../Models/debt.model';

@Component({
  selector: 'app-debt',
  standalone: true,
  imports: [DebtFormComponent,NgFor,CommonModule],
  templateUrl: './debt.component.html',
  styleUrl: './debt.component.css'
})

export class DebtComponent implements OnInit{
  toastr= inject(ToastrService)
  http= inject(HttpClient)
  service=inject(DebtService)

  ngOnInit():void{
    this.service.refreshList();
  }

  populateForm(selectedRecord: Debt){
    this.service.formData = Object.assign({},selectedRecord) 
    let tempDate = new Date(this.service.formData.DueDate ?? new Date);
    this.service.formData.DueDate= this.service.userService.getDate(tempDate)
  }

  onDelete(id:string){
    if(confirm('Are you sure to delete this debt')){
      this.service.deleteDebt(id)
      .subscribe({
        next:
        (res:any) => {
          this.service.list = res as Debt[]
          this.toastr.error('Deleted successfully', 'Debt')
        },
        error: (err:any) => {console.log(err)}
      })
    }
   
  }

}
