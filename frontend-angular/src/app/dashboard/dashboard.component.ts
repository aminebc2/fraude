import {Component, HostListener, OnInit} from '@angular/core';
import ApexCharts from 'apexcharts';
import { FraudAlertService } from '../services/fraud-alert.service';
import { TransactionService } from '../services/transaction.service';
import { UserAccountService } from '../services/user-account.service';
import { Transaction } from "../models/transaction.model";
import { FraudAlert } from "../models/fraud-alert.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalTransactions: number = 0;
  totalClients: number = 0;
  averageTransactionAmount: number = 0;
  fraudulentTransactions: number = 0;
  totalTransactionAmount: number = 0;
  transactionGrowth: number = 0.89;

  transactionTypeData: number[] = [];
  fraudStatusData: number[] = [];
  fraudStatusDataAll: number[] = [];
  transactionAmountData: number[] = [];
  fraudAlertsOverTime: number[] = [];
  fraudulentAmounts: number[] = [];
  normalAmounts: number[] = [];
  timeCategories: string[] = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  constructor(
    private fraudAlertService: FraudAlertService,
    private transactionService: TransactionService,
    private userAccountService: UserAccountService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  loadDashboardData(): void {
    this.transactionService.getTotalTransactionCount().subscribe(count => {
      this.totalTransactions = count;
    });

    this.userAccountService.getAllUserAccounts().subscribe(accounts => {
      this.totalClients = accounts.length;
    });

    this.transactionService.getAverageTransactionAmount().subscribe(amount => {
      this.averageTransactionAmount = amount;
    });

    this.transactionService.getTotalTransactionAmount().subscribe(amount => {
      this.totalTransactionAmount = amount;
    });

    this.fraudAlertService.getFraudFraudAlertsCount().subscribe(count => {
      this.fraudulentTransactions = count;
    });

    this.transactionService.getAllTransactions().subscribe(transactions => {
      this.transactionTypeData = this.calculateTransactionTypeData(transactions);
      this.transactionAmountData = this.calculateTransactionAmountData(transactions);
      this.initTransactionTypeChart();
      this.initTransactionAmountChart();
      this.fraudAlertService.getAllFraudAlerts().subscribe(alerts => {
        this.fraudulentAmounts = this.calculateFraudulentAmounts(alerts, transactions);
        this.normalAmounts = this.calculateNormalAmounts(alerts, transactions);
        this.initComparisonChart();
      });
    });

    this.fraudAlertService.getAllFraudAlerts().subscribe(alerts => {
      this.fraudStatusData = this.calculateFraudStatusData(alerts);
      this.fraudAlertsOverTime = this.calculateFraudAlertsOverTime(alerts);
      this.initFraudAlertsChart();
      this.initFraudStatusChart();

      this.transactionService.getAllTransactions().subscribe(transactions => {
        this.fraudStatusDataAll = this.calculateFraudStatusDataAll(alerts, transactions);
        this.initFraudStatusRadar();
      });
    });
  }

  calculateTransactionTypeData(transactions: Transaction[]): number[] {
    let deposit = 0, transfer = 0, withdrawal = 0;
    transactions.forEach(transaction => {
      if (transaction.transactionType === 'DEPOSIT') deposit++;
      else if (transaction.transactionType === 'TRANSFER') transfer++;
      else if (transaction.transactionType === 'WITHDRAWAL') withdrawal++;
    });
    return [deposit, transfer, withdrawal];
  }

  calculateTransactionAmountData(transactions: Transaction[]): number[] {
    return transactions.map(transaction => transaction.amount);
  }

  calculateFraudStatusData(alerts: FraudAlert[]): number[] {
    let normal = 0, fraudulent = 0, analyzing = 0;
    alerts.forEach(alert => {
      if (alert.status === 'NORMAL') normal++;
      else if (alert.status === 'FRAUDULENT') fraudulent++;
      else if (alert.status === 'ANALYZING') analyzing++;
    });
    return [normal, fraudulent, analyzing];
  }

  calculateFraudStatusDataAll(alerts: FraudAlert[], transactions: Transaction[]): number[] {
    let normal = 0, fraudulent = 0, analyzing = 0;
    transactions.forEach(transaction => {
      const alert = alerts.find(a => a.transactionId === transaction.transactionId);
      if (alert) {
        if (alert.status === 'FRAUDULENT') fraudulent++;
        else if (alert.status === 'ANALYZING') analyzing++;
      } else {
        normal++;
      }
    });
    return [normal, fraudulent, analyzing];
  }

  calculateFraudAlertsOverTime(alerts: FraudAlert[]): number[] {
    const monthlyCounts = Array(12).fill(0);
    alerts.forEach(alert => {
      const monthIndex = new Date(alert.alertDate).getMonth();
      monthlyCounts[monthIndex]++;
    });
    return monthlyCounts;
  }

  initFraudAlertsChart(): void {
    const options = {
      chart: {
        type: 'line',
        height: '100%',
      },
      series: [{
        name: 'Alertes de Fraude',
        data: this.fraudAlertsOverTime
      }],
      xaxis: {
        categories: this.timeCategories,
        labels: {
          show: true,
          style: {
            colors: ["#a8a8a8"],
            fontSize: "11px",
            fontFamily: 'Arial'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val;
        },
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold'
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 3,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
        },
        dropShadow: {
          enabled: false,
        }
      },
      stroke: {
        curve: 'smooth'
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -26
        },
      },
      colors: ['#d62121']
    };

    if (document.getElementById('fraudAlertsChart') && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById('fraudAlertsChart'), options);
      chart.render();
    }
  }

  initTransactionTypeChart(): void {
    const options = {
      chart: {
        type: 'donut',
        height: '100%',
      },
      series: this.transactionTypeData,
      labels: ['Dépôt', 'Transfert', 'Retrait'],
      colors: ['#28a745', '#007bff', '#ffc107'],
    };

    const chart = new ApexCharts(document.getElementById('transactionTypeChart'), options);
    chart.render();
  }

  initFraudStatusChart(): void {
    const options = {
      chart: {
        type: 'donut',
        height: '100%',
      },
      series: this.fraudStatusData,
      labels: ['Normal', 'Frauduleux', 'En Analyse'],
      colors: ['#28a745', '#dc3545', '#ffc107'],
    };

    const chart = new ApexCharts(document.getElementById('fraudStatusChart'), options);
    chart.render();
  }

  initTransactionAmountChart(): void {
    const generateSeriesData = (timeCategories: string[], totalTransactionAmount: number): {
      x: string,
      y: number
    }[] => {
      return timeCategories.map(month => ({
        x: month,
        y: Math.floor(Math.random() * (totalTransactionAmount - 900000 + 1)) + 3000,
      }));
    };

    const options = {
      colors: ["#1A56DB", "#FDBA8C"],
      series: [
        {
          name: "Montant",
          data: generateSeriesData(this.timeCategories, this.totalTransactionAmount)
        }
      ],
      chart: {
        type: "bar",
        height: "320px",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadiusApplication: "end",
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 1,
          },
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        floating: false,
        labels: {
          show: true,
          style: {
            fontFamily: "Inter, sans-serif",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
          }
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    };

    if (document.getElementById("column-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("column-chart"), options);
      chart.render();
    }
  }

  initFraudStatusRadar(): void {
    const options = {
      chart: {
        type: 'radar',
        height: '150%',
      },
      series: [{
        name: 'Transactions',
        data: this.fraudStatusDataAll
      }],
      xaxis: {
        categories: ['Normal', 'Frauduleux', 'En Analyse'],
        labels: {
          show: true,
          style: {
            colors: ['#36ac1b', '#b82436', '#cdb81d'],
            fontSize: "13px",
            fontFamily: 'Arial'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number): string {
          return val.toString();
        },
        textAnchor: 'middle',
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold'
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 1,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.8,
        },
        dropShadow: {
          enabled: false,
        }
      }
    };

    if (document.getElementById('transactionStatusRadar') && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById('transactionStatusRadar'), options);
      chart.render();
    }
  }

  private calculateFraudulentAmounts(alerts: FraudAlert[], transactions: Transaction[]): number[] {
    const fraudulentAmounts: number[] = Array(12).fill(0); // Initialize an array of size 12 (for 12 months) with 0

    alerts.forEach(alert => {
      const relatedTransaction = transactions.find(transaction => transaction.transactionId === alert.transactionId);

      if (relatedTransaction) {
        const transactionMonth = new Date(relatedTransaction.date).getMonth(); // Get the month index (0-11)
        fraudulentAmounts[transactionMonth] += relatedTransaction.amount; // Accumulate the amount for the corresponding month
      }
    });

    return fraudulentAmounts;
  }

  private calculateNormalAmounts(alerts: FraudAlert[], transactions: Transaction[]): number[] {
    const normalAmounts: number[] = Array(12).fill(0); // Initialize an array of size 12 (for 12 months) with 0

    transactions.forEach(transaction => {
      const transactionMonth = new Date(transaction.date).getMonth(); // Get the month index (0-11)
      normalAmounts[transactionMonth] += transaction.amount; // Accumulate the amount for the corresponding month
    });

    return normalAmounts;
  }

  initComparisonChart(): void {
    const options = {
      dataLabels: {
        enabled: true,
        style: {
          cssClass: 'text-xs text-white font-medium'
        },
        formatter: function (value : any) {
          return ' د.م ' + value.toFixed(1);
        }
      },
      grid: {
        show: true,
        strokeDashArray: 5,
        padding: {
          left: 16,
          right: 16,
          top: -26
        },
      },
      series: [
        {
          name: 'Fraude',
          data: this.fraudulentAmounts,
          color: "#dc3545",
        },
        {
          name: 'Normal',
          data: this.normalAmounts,
          color: "#28a745",
        },
      ],
      chart: {
        type: "area",
        height: "100%",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: true,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
      },
      legend: {
        show: true,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "light",
        },
      },
      stroke: {
        width: 6,
      },
      xaxis: {
        categories: this.timeCategories,
        labels: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: function (value : any) {
            return ' د.م ' + value.toFixed(1);
          }
        }
      }
    };

    const chart = new ApexCharts(document.getElementById('comparisonChart'), options);
    chart.render();
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownButton = document.getElementById('yearDropdownButton');
    const dropdown = document.getElementById('yearDropdown');

    if (dropdownButton && !dropdownButton.contains(target) && dropdown && !dropdown.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  selectYear(year: number) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-right",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false
    });
    Toast.fire({
      icon: "info",
      title: "Aucune donnée disponible pour l'année " + year+ " !"
    });

    this.isDropdownOpen = false;
  }
}
