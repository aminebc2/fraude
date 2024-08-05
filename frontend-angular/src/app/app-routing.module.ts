import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ClientsComponent } from './clients/clients.component';
import { FraudAlertsComponent } from './fraud-alerts/fraud-alerts.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { breadcrumb: 'Dashboard' } },
  { path: 'clients', component: ClientsComponent, data: { breadcrumb: 'Clients' } },
  { path: 'transaction', component: TransactionComponent, data: { breadcrumb: 'Transactions' } },
  { path: 'fraud', component: FraudAlertsComponent, data: { breadcrumb: 'Fraud Alerts' } },
  { path: 'logs', component: LogsComponent, data: { breadcrumb: 'Logs' } },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
