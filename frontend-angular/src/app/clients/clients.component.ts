// clients.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { UserAccountService } from '../services/user-account.service';
import { UserAccount } from '../models/user-account.model';
import { TransactionService } from '../services/transaction.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { Transaction } from '../models/transaction.model';
import {ActivatedRoute, Router} from "@angular/router";

interface TransactionCounts {
  [key: string]: number;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [DatePipe]
})
export class ClientsComponent implements OnInit {
  accounts: UserAccount[] = [];
  filteredAccounts: UserAccount[] = [];
  searchTerm: string = '';
  accountTypeFilter: string = '';
  balanceRange: number = 100000;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalAccounts: number = 0;
  pages: number[] = [];
  sortKey: keyof UserAccount = 'accountId';
  sortOrder: string = 'asc'; // or 'desc'
  dropdowns: { [key: string]: boolean } = {};
  isFilterDropdownOpen: boolean = false;
  selectedAccount!: UserAccount;
  showModal: boolean = false;

  constructor(
    private userAccountService: UserAccountService,
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.userAccountService.getAllUserAccounts().subscribe((data) => {
      this.accounts = data;
      this.totalAccounts = data.length;
      this.filteredAccounts = this.accounts;
      this.loadTransactions(); // Load transactions after accounts are loaded
    });
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(transactions => {
      const transactionCounts: TransactionCounts = transactions.reduce((acc: TransactionCounts, transaction) => {
        const accountId = transaction.userAccount.accountId;
        if (!acc[accountId]) {
          acc[accountId] = 0;
        }
        acc[accountId]++;
        return acc;
      }, {});

      this.accounts.forEach(account => {
        account.numberOfTransactions = transactionCounts[account.accountId] || 0;
      });

      this.filterAccounts(); // Apply filters after loading transactions
      this.updatePagination(); // Update pagination after filtering
    });
  }

  filterAccounts(): void {
    this.filteredAccounts = this.accounts.filter(account => {
      const matchesSearchTerm = account.accountId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        account.accountName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesType = this.accountTypeFilter ? account.accountType === this.accountTypeFilter : true;
      const matchesBalance = account.balance <= this.balanceRange;
      return matchesSearchTerm && matchesType && matchesBalance;
    });
    this.updatePagination();
  }

  sortBy(key: keyof UserAccount): void {
    this.sortKey = key;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.filteredAccounts.sort((a, b) => {
      const aValue = a[key] ?? '';
      const bValue = b[key] ?? '';
      if (aValue < bValue) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  updatePagination(): void {
    const pageCount = Math.ceil(this.filteredAccounts.length / this.itemsPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  paginatedAccounts(): UserAccount[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAccounts.slice(start, start + this.itemsPerPage);
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

  toggleDropdown(accountId: string): void {
    this.dropdowns[accountId] = !this.dropdowns[accountId];
  }

  viewDetails(account: UserAccount): void {
    this.selectedAccount = account;
    this.showModal = true;
  }

  exportAccounts(): void {
    const date = new Date().toLocaleDateString();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.accounts);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'accounts': worksheet },
      SheetNames: ['accounts']
    };
    XLSX.writeFile(workbook, 'accounts_' + date + '.xlsx');
  }

  toggleFilterDropdown(): void {
    this.isFilterDropdownOpen = !this.isFilterDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!event.target || !(event.target instanceof HTMLElement)) {
      return;
    }

    const filterDropdownButton = document.getElementById('filterDropdownButton');
    const filterDropdown = document.getElementById('filterDropdown');

    if (filterDropdownButton && filterDropdown && !filterDropdownButton.contains(event.target) && !filterDropdown.contains(event.target)) {
      this.isFilterDropdownOpen = false;
    }

    for (const accountId in this.dropdowns) {
      const dropdownButton = document.getElementById(`dropdownButton-${accountId}`);
      const dropdownMenu = document.getElementById(`dropdownMenu-${accountId}`);

      if (dropdownButton && dropdownMenu && !dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        this.dropdowns[accountId] = false;
      }
    }
  }

  formatDate(date: string): string {
    return <string>this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  closeModal(): void {
    this.showModal = false;
  }
  viewTransactions(): void {
    this.router.navigate(['/transaction', this.selectedAccount.accountId]);
  }
}
