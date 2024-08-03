import { Transaction } from './transaction.model';

export class UserAccount {
  accountId: string = '';
  accountName: string = '';
  accountType: string = '';
  balance: number = 0;
  creationDate: Date = new Date();
  accountAge: number = 0;
  transactionFrequency: number = 0;
  transactions: Transaction[] = [];
}
