import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './gurd/auth.guard';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { SavingGoalComponent } from './pages/saving-goal/saving-goal.component';
import { InvestmentComponent } from './pages/investment/investment.component';
import { DebtComponent } from './pages/debt/debt.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent,
                canActivate:[authGuard]
            },
            {
                path:'transaction',
                component:TransactionsComponent,
                canActivate:[authGuard]
            },
            {
                path:'budget',
                component:BudgetComponent,
                canActivate:[authGuard]
            },
            {
                path:'goal',
                component:SavingGoalComponent,
                canActivate:[authGuard]
            },
            {
                path:'investment',
                component:InvestmentComponent,
                canActivate:[authGuard]
            },
            {
                path:'debt',
                component:DebtComponent,
                canActivate:[authGuard]
            }
        ]
    }
];
