import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FraudAlert } from '../models/fraud-alert.model';

@Injectable({
  providedIn: 'root'
})
export class FraudAlertService {
  private apiUrl = 'http://localhost:8080/api/fraudAlerts';

  constructor(private http: HttpClient) {}

  getAllFraudAlerts(): Observable<FraudAlert[]> {
    return this.http.get<FraudAlert[]>(this.apiUrl);
  }

  getFraudAlertById(id: string): Observable<FraudAlert> {
    return this.http.get<FraudAlert>(`${this.apiUrl}/${id}`);
  }

  getFraudAlertsByTransactionId(transactionId: string): Observable<FraudAlert[]> {
    return this.http.get<FraudAlert[]>(`${this.apiUrl}/transaction/${transactionId}`);
  }

  saveFraudAlert(fraudAlert: FraudAlert): Observable<FraudAlert> {
    return this.http.post<FraudAlert>(this.apiUrl, fraudAlert);
  }

  updateFraudAlert(id: string, fraudAlert: FraudAlert): Observable<FraudAlert> {
    return this.http.put<FraudAlert>(`${this.apiUrl}/${id}`, fraudAlert);
  }

  updateFraudAlertStatusAndComments(id: string, status: string, comments: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}`, { status, comments });
  }

  getTotalFraudAlertsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/total`);
  }

  getNormalFraudAlertsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/normals`);
  }

  getAnalysedFraudAlertsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/analisys`);
  }

  getFraudFraudAlertsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/frauds`);
  }

  getFraudAlertsByStatus(status: string): Observable<FraudAlert[]> {
    return this.http.get<FraudAlert[]>(`${this.apiUrl}/status/${status}`);
  }
}
