import { Component, OnInit } from '@angular/core';
import { FraudAlertService } from '../services/fraud-alert.service';
import { TransactionService } from '../services/transaction.service';
import { FraudAlert } from '../models/fraud-alert.model';
import { Transaction } from '../models/transaction.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-fraud-alerts',
  templateUrl: './fraud-alerts.component.html',
  styleUrls: ['./fraud-alerts.component.css']
})
export class FraudAlertsComponent implements OnInit {
  fraudAlerts: FraudAlert[] = [];
  transactions: { [key: string]: Transaction } = {};
  filteredAlerts: FraudAlert[] = [];
  userAccount: any;
  searchTerm: string = '';
  fromTime: string = '';
  toTime: string = '';
  statusFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalAlerts: number = 0;
  normalCount: number = 0;
  fraudulentCount: number = 0;
  analysingCount: number = 0;
  pages: number[] = [];
  selectedAlert: FraudAlert = {
    alertId: '',
    transactionId: '',
    alertDate: new Date(),
    status: '',
    comments: ''
  };

  selectedTransaction: Transaction = {
    transactionId: '',
    date: new Date(),
    amount: 0,
    userAccount: {
      accountId: '',
      accountName: '',
      accountType: '',
      balance: 0,
      accountAge: 0,
      creationDate: '',
      transactionFrequency: 0,
      numberOfTransactions: 0
    },
    transactionType: '',
    location: ''
  };

  constructor(
    private fraudAlertService: FraudAlertService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.loadFraudAlerts();
  }

  loadFraudAlerts(): void {
    this.fraudAlertService.getAllFraudAlerts().subscribe((alerts) => {
      this.fraudAlerts = alerts;
      this.totalAlerts = this.fraudAlerts.length;
      this.normalCount = this.fraudAlerts.filter(alert => alert.status === 'NORMAL').length;
      this.fraudulentCount = this.fraudAlerts.filter(alert => alert.status === 'FRAUDULENT').length;
      this.analysingCount = this.fraudAlerts.filter(alert => alert.status === 'ANALYZING').length;
      this.filteredAlerts = this.fraudAlerts;
      this.loadTransactions();
      this.updatePagination();
    });
  }

  loadTransactions(): void {
    this.fraudAlerts.forEach(alert => {
      this.transactionService.getTransactionById(alert.transactionId).subscribe(transaction => {
        this.transactions[alert.transactionId] = transaction;
      });
    });
  }

  filterAlerts(): void {
    this.filteredAlerts = this.fraudAlerts.filter(alert => {
      const matchesSearchTerm = alert.alertId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        alert.transactionId.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFromTime = this.fromTime ? new Date(alert.alertDate) >= new Date(this.fromTime) : true;
      const matchesToTime = this.toTime ? new Date(alert.alertDate) <= new Date(this.toTime) : true;
      const matchesStatus = this.statusFilter ? alert.status === this.statusFilter : true;
      return matchesSearchTerm && matchesFromTime && matchesToTime && matchesStatus;
    });
    this.updatePagination();
  }

  updatePagination(): void {
    const pageCount = Math.ceil(this.filteredAlerts.length / this.itemsPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  paginatedAlerts(): FraudAlert[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAlerts.slice(start, start + this.itemsPerPage);
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


  exportAlerts(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredAlerts);
    const date = new Date().toISOString().split('T')[0];
    const workbook: XLSX.WorkBook = {
      Sheets: { 'alertes_de_fraude': worksheet },
      SheetNames: ['alertes_de_fraude']
    };
    XLSX.writeFile(workbook, 'alertes_de_fraude_' + date + '.xlsx');
  }

  openUpdateModal(alert: FraudAlert): void {
    this.selectedAlert = { ...alert };
    this.transactionService.getTransactionById(alert.transactionId).subscribe(transaction => {
      this.selectedTransaction = transaction;
      const modal = document.getElementById('updateModal');
      if (modal) {
        modal.style.display = 'block';
      }
    });
  }

  closeUpdateModal(): void {
    const modal = document.getElementById('updateModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  updateAlert(): void {
    if (this.selectedAlert) {
      this.fraudAlertService.updateFraudAlertStatusAndComments(this.selectedAlert.alertId, this.selectedAlert.status, this.selectedAlert.comments).subscribe(() => {
        this.loadFraudAlerts();
        this.closeUpdateModal();
      });
    }
  }

  getAccountAge(transaction: Transaction): number {
    if (transaction && transaction.userAccount) {
      const creationDate = new Date(transaction.userAccount.creationDate);
      const currentDate = new Date();
      const timeDiff = Math.abs(currentDate.getTime() - creationDate.getTime());
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    return 0;
  }

  protected readonly Transaction = Transaction;
}
