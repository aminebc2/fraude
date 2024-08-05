import { Component, OnInit } from '@angular/core';
import { AuditLog } from '../models/audit-log.model';
import { AuditLogService } from '../services/audit-log.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: AuditLog[] = [];
  filteredLogs: AuditLog[] = [];
  searchTerm: string = '';
  fromTime: string = '';
  toTime: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalLogs: number = 0;
  pages: number[] = [];

  constructor(private auditLogService: AuditLogService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.auditLogService.getAllAuditLogs().subscribe((data) => {
      this.logs = data;
      this.totalLogs = data.length;
      this.filteredLogs = this.logs;
      this.updatePagination();
    });
  }

  filterLogs(): void {
    this.filteredLogs = this.logs.filter(log =>
      (log.logId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        log.userId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.fromTime || new Date(log.timestamp) >= new Date(this.fromTime)) &&
      (!this.toTime || new Date(log.timestamp) <= new Date(this.toTime))
    );
    this.updatePagination();
  }

  formatDate(timestamp: Date): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  paginatedLogs(): AuditLog[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredLogs.slice(start, start + this.itemsPerPage);
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

  updatePagination(): void {
    const pageCount = Math.ceil(this.filteredLogs.length / this.itemsPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  exportLogs(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.logs);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'logs': worksheet },
      SheetNames: ['logs']
    };
    XLSX.writeFile(workbook, 'logs.xlsx');
  }

  getUserEmail(userId: string): string {
    // Implement the logic to get user email by user ID
    return 'user@example.com'; // Placeholder
  }
}
