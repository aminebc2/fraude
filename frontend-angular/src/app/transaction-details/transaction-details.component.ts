import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../services/user-account.service';
import { TransactionService } from '../services/transaction.service';
import { FraudAlertService } from '../services/fraud-alert.service';
import { UserAccount } from '../models/user-account.model';
import { Transaction } from '../models/transaction.model';
import { FraudAlert } from '../models/fraud-alert.model';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  account: UserAccount = new UserAccount();
  transactions: Transaction[] = [];
  fraudAlerts: FraudAlert[] = [];
  accountId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userAccountService: UserAccountService,
    private transactionService: TransactionService,
    private fraudAlertService: FraudAlertService
  ) { }

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('id');
    this.loadAccountDetails();
    this.loadTransactions();
    this.loadFraudAlerts();
  }

  loadAccountDetails(): void {
    this.userAccountService.getUserAccountById(this.accountId).subscribe((data) => {
      this.account = data;
    });
  }

  loadTransactions(): void {
    this.transactionService.getTransactionsByAccountId(this.accountId).subscribe((data) => {
      this.transactions = data;
    });
  }

  loadFraudAlerts(): void {
    this.fraudAlertService.getAllFraudAlerts().subscribe((data) => {
      this.fraudAlerts = data;
    });
  }

  getStatus(transactionId: string): string {
    const alert = this.fraudAlerts.find(alert => alert.transactionId === transactionId);
    return alert ? alert.status : 'NORMAL';
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }
  formatDateS(date: string): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  countTransactions(): number {
    return this.transactions.length;
  }

  goBack(): void {
    this.router.navigate(['/transaction']);
  }
}
