import { UserAccount } from './user-account.model';

export class Transaction {
  transactionId: string = '';
  date: Date = new Date();
  amount: number = 0;
  userAccount: UserAccount = new UserAccount();
  transactionType: string = '';
  location: string = '';
}

