import { Component,OnInit,inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {HttpClient} from "@angular/common/http";
import{NgFor} from '@angular/common';
import { InvestmentFormComponent } from './investment-form/investment-form.component';
import { InvestmentService } from '../../services/investment/investment.service';
import { Investment } from '../../Models/investment.model';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [InvestmentFormComponent,NgFor],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css'
})
export class InvestmentComponent implements OnInit{
  toastr= inject(ToastrService)
  http= inject(HttpClient)
  service=inject(InvestmentService)

  ngOnInit():void{
    this.service.refreshList();
  }

  populateForm(selectedRecord: Investment){
    this.service.formData = Object.assign({},selectedRecord) 
  }
}
