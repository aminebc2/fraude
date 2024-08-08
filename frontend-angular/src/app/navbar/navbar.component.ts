import {Component, OnInit, AfterViewInit, HostListener} from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { FraudAlertService } from "../services/fraud-alert.service";
import Swal from 'sweetalert2';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  pendingFraudAlertsCount: number = 0;
  location: string = "Rabat, Morocco";
  dateTime: string = "";

  constructor(private fraudAlertService: FraudAlertService, protected authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.getPendingFraudAlertsCount();
    this.updateDateTime();
  }

  ngAfterViewInit(): void {
    const dropdownToggleEl = document.getElementById('user-menu-button');
    const dropdownMenuEl = document.getElementById('dropdown-user');
    if (dropdownToggleEl && dropdownMenuEl) {
      dropdownToggleEl.addEventListener('click', () => {
        dropdownMenuEl.classList.toggle('hidden');
      });
    }
  }

  getPendingFraudAlertsCount(): void {
    this.fraudAlertService.getAnalysedFraudAlertsCount().subscribe(count => {
      this.pendingFraudAlertsCount = count;
    });
  }

  updateDateTime(): void {
    interval(1000).pipe(
      map(() => new Date())
    ).subscribe(date => {
      this.dateTime = date.toLocaleString('fr-FR', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownMenuEl = document.getElementById('dropdown-user');
    const dropdownToggleEl = document.getElementById('user-menu-button');
    if (dropdownMenuEl && dropdownToggleEl) {
      if (!dropdownMenuEl.contains(event.target as Node) && !dropdownToggleEl.contains(event.target as Node)) {
        dropdownMenuEl.classList.add('hidden');
      }
    }
  }

  notificationTemplate() {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
    Toast.fire({
      icon: "info",
      title: "Vous n'avez aucun nouveau message !"
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);

  }
}
