package ma.stage.fraude.services;

import ma.stage.fraude.entities.Transaction;
import ma.stage.fraude.entities.UserAccount;

import java.util.List;

public interface TransactionService {
    List<Transaction> getAllTransactions();
    Transaction getTransactionById(String id);
    List<Transaction> getTransactionsByUserAccount(UserAccount userAccount);
    Transaction saveTransaction(Transaction transaction);
    Transaction updateTransaction(Transaction transaction);
    double getTotalTransactionAmount();
    long getTotalTransactionCount();
    double getAverageTransactionAmount();
}