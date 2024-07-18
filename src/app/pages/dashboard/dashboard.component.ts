import { Component } from '@angular/core';
import { PaymentDetailsComponent } from "../../payment-details/payment-details.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PaymentDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
