import { Component, HostListener, OnInit } from '@angular/core';
import { UserAccountService } from '../services/user-account.service';
import { TransactionService } from '../services/transaction.service';
import { UserAccount } from '../models/user-account.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
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

  constructor(
    private userAccountService: UserAccountService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.userAccountService.getAllUserAccounts().subscribe((data) => {
      this.accounts = data;
      this.totalAccounts = data.length;

      data.forEach(account => {
        this.transactionService.getTransactionsByUserAccount(account.accountId).subscribe(transactions => {
          account.numberOfTransactions = transactions.length;
        });
      });

      this.filteredAccounts = this.accounts;
      this.updatePagination();
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
    // Implement the logic to view account details
  }

  exportAccounts(): void {
    const date = new Date().toDateString();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.accounts);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'accounts': worksheet },
      SheetNames: ['accounts']
    };
    XLSX.writeFile(workbook, 'accounts' + date + '.xlsx');
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
}
