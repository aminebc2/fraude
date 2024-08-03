import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AuditLogService } from './services/audit-log.service';
import { FraudAlertService } from './services/fraud-alert.service';
import { TransactionService } from './services/transaction.service';
import { UserAccountService } from './services/user-account.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuditLogService,
    FraudAlertService,
    TransactionService,
    UserAccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
