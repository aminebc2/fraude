package ma.stage.fraude.services;

import ma.stage.fraude.entities.Transaction;

import java.util.List;

public interface TransactionService {
    List<Transaction> getAllTransactions();
    Transaction getTransactionById(String id);
}
