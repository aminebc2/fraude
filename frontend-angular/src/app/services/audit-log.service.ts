import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../models/audit-log.model';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private apiUrl = 'http://localhost:8080/api/auditLogs';

  constructor(private http: HttpClient) {}

  getAllAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(this.apiUrl);
  }

  getAuditLogById(id: string): Observable<AuditLog> {
    return this.http.get<AuditLog>(`${this.apiUrl}/${id}`);
  }

  saveAuditLog(auditLog: AuditLog): Observable<AuditLog> {
    return this.http.post<AuditLog>(this.apiUrl, auditLog);
  }

  getTotalLogins(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/logins/total`);
  }

  getTotalActions(action: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/actions/${action}/total`);
  }
}
