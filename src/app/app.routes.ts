import { SettingComponent } from './pages/setting/setting.component';
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
import { UserRegisterFormComponent } from './pages/register/user-register-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BudgetFormComponent } from './pages/budget/budget-form/budget-form.component';
import { TransactionFormComponent } from './pages/transactions/transaction-form/transaction-form.component';

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
        path:'register',
        component:UserRegisterFormComponent
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
                path:'transaction/create',
                component:TransactionFormComponent,
                canActivate:[authGuard]
            },
            {
                path:'budget',
                component:BudgetComponent,
                canActivate:[authGuard]
            },
            {
                path:'budget/create',
                component:BudgetFormComponent,
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
            },
            {
                path:'profile',
                component:ProfileComponent,
                canActivate:[authGuard]
            },
            {
                path:'setting',
                component:SettingComponent,
                canActivate:[authGuard]
            }
        ]
    }
];
