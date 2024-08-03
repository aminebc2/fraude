import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  private apiUrl = 'http://localhost:8080/api/userAccounts';

  constructor(private http: HttpClient) {}

  getAllUserAccounts(): Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.apiUrl);
  }

  getUserAccountById(id: string): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${this.apiUrl}/${id}`);
  }

  saveUserAccount(userAccount: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(this.apiUrl, userAccount);
  }

  getTotalBalance(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/balance/total`);
  }

  getAverageAccountAge(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/age/average`);
  }

  getAverageTransactionFrequency(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/frequency/average`);
  }
}
