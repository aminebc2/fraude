import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { UserAccountService } from '../services/user-account.service';
import { Transaction } from '../models/transaction.model';
import * as XLSX from 'xlsx';
import { FraudAlertService } from '../services/fraud-alert.service';
import { FraudAlert } from '../models/fraud-alert.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  fraudAlerts: FraudAlert[] = [];
  filteredTransactions: Transaction[] = [];
  searchTerm: string = '';
  fromTime: string = '';
  toTime: string = '';
  statusFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalTransactions: number = 0;
  normalCount: number = 0;
  fraudulentCount: number = 0;
  pages: number[] = [];
  usernames: { [key: string]: string } = {};
  analyzingCount: number = 0;

  constructor(
    private transactionService: TransactionService,
    private userAccountService: UserAccountService,
    private fraudAlertService: FraudAlertService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadFraudAlerts();
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe((data) => {
      this.transactions = data;
      this.totalTransactions = data.length;
      this.filteredTransactions = this.transactions;
      this.updatePagination();

      this.transactions.forEach(transaction => {
        const accountId = transaction.userAccount.accountId;
        this.userAccountService.getUserAccountById(accountId).subscribe(account => {
          this.usernames[accountId] = account.accountName;
        });
      });
    });
  }

  loadFraudAlerts(): void {
    this.fraudAlertService.getAllFraudAlerts().subscribe((data) => {
      this.fraudAlerts = data;
      this.normalCount = this.fraudAlerts.filter(alert => alert.status === 'NORMAL').length;
      this.fraudulentCount = this.fraudAlerts.filter(alert => alert.status === 'FRAUDULENT').length;
      this.analyzingCount = this.fraudAlerts.filter(alert => alert.status === 'ANALYZING').length;
    });
  }

  getStatus(transactionId: string): string {
    const alert = this.fraudAlerts.find(alert => alert.transactionId === transactionId);
    return alert ? alert.status : 'NORMAL';
  }

  filterTransactions(): void {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesSearchTerm = transaction.transactionId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        this.usernames[transaction.userAccount.accountId]?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFromTime = this.fromTime ? new Date(transaction.date) >= new Date(this.fromTime) : true;
      const matchesToTime = this.toTime ? new Date(transaction.date) <= new Date(this.toTime) : true;
      const matchesStatus = this.statusFilter ? this.getStatus(transaction.transactionId) === this.statusFilter : true;
      return matchesSearchTerm && matchesFromTime && matchesToTime && matchesStatus;
    });
    this.updatePagination();
  }

  updatePagination(): void {
    const pageCount = Math.ceil(this.filteredTransactions.length / this.itemsPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  paginatedTransactions(): Transaction[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTransactions.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getUserName(accountId: string): string {
    return this.usernames[accountId] || 'Inconnu';
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  exportTransactions(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredTransactions);
    const date = new Date().toISOString().split('T')[0];
    const workbook: XLSX.WorkBook = {
      Sheets: { 'transactions': worksheet },
      SheetNames: ['transactions']
    };
    XLSX.writeFile(workbook, 'transactions_' + date + '.xlsx');
  }
}
