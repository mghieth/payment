import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentDetailsComponent } from "./payment-details/payment-details.component";
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from "./pages/layout/layout.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PaymentDetailsComponent, LoginComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'payment';
}
