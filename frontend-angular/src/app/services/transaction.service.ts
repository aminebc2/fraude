import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  getTransactionsByUserAccount(accountId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/userAccount/${accountId}`);
  }

  saveTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  getTotalTransactionAmount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/amount/total`);
  }

  getTotalTransactionCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  getAverageTransactionAmount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/amount/average`);
  }

  getTransactionsByStatus(status: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/status/${status}`);
  }
}
