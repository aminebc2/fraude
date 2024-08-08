import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ClientsComponent } from './clients/clients.component';
import { FraudAlertsComponent } from './fraud-alerts/fraud-alerts.component';
import { LogsComponent } from './logs/logs.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import {NoAuthGuard} from "./guard/no-auth-guard.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Dashboard' } },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Clients' } },
  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Transactions' } },
  { path: 'fraud', component: FraudAlertsComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Fraud Alerts' } },
  { path: 'logs', component: LogsComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Logs' } },
  { path: 'transaction/:id', component: TransactionDetailsComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Transaction Details' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
