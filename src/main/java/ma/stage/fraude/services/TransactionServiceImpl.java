package ma.stage.fraude.services;

import ma.stage.fraude.entities.Transaction;
import ma.stage.fraude.entities.UserAccount;
import ma.stage.fraude.enums.Tstatus;
import ma.stage.fraude.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction getTransactionById(String id) {
        return transactionRepository.findById(id).orElse(null);
    }

    @Override
    public List<Transaction> getTransactionsByUserAccount(UserAccount userAccount) {
        return transactionRepository.findByUserAccount(userAccount);
    }

    @Override
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public double getTotalTransactionAmount() {
        return transactionRepository.findAll()
                .stream()
                .mapToDouble(Transaction::getAmount)
                .sum();
    }

    @Override
    public long getTotalTransactionCount() {
        return transactionRepository.count();
    }

    @Override
    public double getAverageTransactionAmount() {
        return transactionRepository.findAll()
                .stream()
                .mapToDouble(Transaction::getAmount)
                .average()
                .orElse(0.0);
    }

    @Override
    public List<Transaction> getSuspectTransactions() {
        return List.of();
    }

    @Override
    public List<Transaction> getFraudulentTransactions() {
        return List.of();
    }

    @Override
    public List<Transaction> getTransactionsByStatus(Tstatus status) {
        return transactionRepository.findByStatus(status);
    }
}
