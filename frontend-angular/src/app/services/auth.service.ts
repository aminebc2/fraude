import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {
    this.isAuthenticated = !!localStorage.getItem('isAuthenticated');
  }

  login(email: string, password: string): boolean {
    if ((email === 'amine' && password === '123') || (email === 'zaid' && password === '123')) {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', email === 'amine' ? 'Mohamed Amine Bicha' : 'Zaid El Mouaddibe');
      localStorage.setItem('role', email === 'amine' ? 'Administrateur' : 'Analyste');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
