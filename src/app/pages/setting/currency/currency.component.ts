import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Currency } from '../../../Models/currency.model';
import { NgFor } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { User } from '../../../Models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent implements OnInit {
  toastr=inject(ToastrService)

  userService=inject(UserService)
  User = new User() 
  Currencies: Currency[]=[    
    {cc:"USD",symbol:"$",name:"United States dollar"},{cc:"ILS",symbol:"\u20aa",name:"Israeli new sheqel"},
    {cc:"JOD",symbol:"JOD",name:"Jordanian dinar"}, {cc:"EUR",symbol:"\u20ac",name:"European Euro"},
    {cc:"TRY",symbol:"TRY",name:"Turkish new lira"}, {cc:"CNY",symbol:"\u00a5",name:"Chinese/Yuan renminbi"},
    {cc:"EGP",symbol:"\u00a3",name:"Egyptian pound"}]

    
    ngOnInit(): void {
      this.userService.getUser()
      debugger
    }

    updateCurrency(){
      debugger
      this.userService.UpdateUser().subscribe({
        next:(res:any) => {
          this.toastr.info('Updated successfully', 'Currency')
        },
        error:(err: any) => {console.log(err)}
      })


    }
}
