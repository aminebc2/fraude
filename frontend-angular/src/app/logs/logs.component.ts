import { Component, OnInit } from '@angular/core';
import { AuditLog } from '../models/audit-log.model';
import { AuditLogService } from '../services/audit-log.service';
import * as XLSX from 'xlsx';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';

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
  usernames: { [key: string]: string } = {};
  roles: { [key: string]: string } = {};
  allUsers: User[] = [];

  constructor(
    private auditLogService: AuditLogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadLogs();
    this.loadAllUsers(); // Load all users once at the beginning
  }

  loadLogs(): void {
    this.auditLogService.getAllAuditLogs().subscribe((data) => {
      this.logs = data;
      this.totalLogs = data.length;
      this.filteredLogs = this.logs;
      this.updatePagination();
    });
  }

  loadAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users;
      this.allUsers.forEach(user => {
        this.usernames[user.userId] = user.username;
        this.roles[user.userId] = user.role;
      });
    });
  }

  filterLogs(): void {
    this.filteredLogs = this.logs.filter(log => {
      const matchesSearchTerm = log.logId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        log.userId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        this.getUserName(log.userId).toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesFromTime = this.fromTime ? new Date(log.timestamp) >= new Date(this.fromTime) : true;
      const matchesToTime = this.toTime ? new Date(log.timestamp) <= new Date(this.toTime) : true;
      return matchesSearchTerm && matchesFromTime && matchesToTime;
    });
    this.updatePagination();
  }

  updatePagination(): void {
    const pageCount = Math.ceil(this.filteredLogs.length / this.itemsPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
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

  exportLogs(): void {
    const date = new Date().toLocaleDateString();
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.logs);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'logs': worksheet },
      SheetNames: ['logs']
    };
    XLSX.writeFile(workbook, 'logs_' + date + '.xlsx');
  }

  getUserName(userId: string): string {
    return this.usernames[userId] || 'Inconnu';
  }

  getUserRole(userId: string): string {
    return this.roles[userId] || 'Inconnu';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  showDetails(log: AuditLog) {
    Swal.fire({
      title: 'Détails du log',
      html: `
      <div style="text-align: left">
        <p><strong>ID:</strong> ${log.logId}</p>
        <p><strong>Utilisateur:</strong> ${this.getUserName(log.userId)}</p>
        <p><strong>Rôle:</strong> ${this.getUserRole(log.userId)}</p>
        <p><strong>Action:</strong> ${log.action}</p>
        <p><strong>Date et Heure:</strong> ${this.formatDate(log.timestamp)}</p>
      </div>`,
      icon: 'info',
      confirmButtonText: 'Fermer',
      confirmButtonColor: '#3085d6'

    });
  }


}
