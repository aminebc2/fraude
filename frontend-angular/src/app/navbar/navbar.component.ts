import {Component, OnInit, AfterViewInit, HostListener} from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { FraudAlertService } from "../services/fraud-alert.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  pendingFraudAlertsCount: number = 0;
  location: string = "Rabat, Morocco";
  dateTime: string = "";

  constructor(private fraudAlertService: FraudAlertService) { }

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
    this.fraudAlertService.getPendingFraudAlertsCount().subscribe(count => {
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
}