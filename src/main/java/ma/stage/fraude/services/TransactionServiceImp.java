package ma.stage.fraude.services;

import ma.stage.fraude.entities.Transaction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public class TransactionServiceImp implements TransactionService{
    @Override
    public List<Transaction> getAllTransactions() {
        return List.of();
    }

    @Override
    public Transaction getTransactionById(String id) {
        return null;
    }
}
