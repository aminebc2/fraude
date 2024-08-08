import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AuditLogService } from './services/audit-log.service';
import { FraudAlertService } from './services/fraud-alert.service';
import { TransactionService } from './services/transaction.service';
import { UserAccountService } from './services/user-account.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TransactionComponent } from './transaction/transaction.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FraudAlertsComponent } from './fraud-alerts/fraud-alerts.component';
import { ClientsComponent } from './clients/clients.component';
import { LogsComponent } from './logs/logs.component';
import {FormsModule} from "@angular/forms";
import {TransactionDetailsComponent} from "./transaction-details/transaction-details.component";
import { LoginComponent } from './login/login.component';
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guard/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TransactionComponent,
    DashboardComponent,
    BreadcrumbComponent,
    FraudAlertsComponent,
    ClientsComponent,
    LogsComponent,
    TransactionDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuditLogService,
    FraudAlertService,
    TransactionService,
    UserAccountService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
