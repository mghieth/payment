import { Component } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { CurrencyComponent } from './currency/currency.component';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CategoryComponent,CurrencyComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

}
