package ma.stage.fraude.repositories;

import ma.stage.fraude.entities.Transaction;
import ma.stage.fraude.entities.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
    List<Transaction> findByTransactionId(String transactionId);
    List<Transaction> findByUserAccount(UserAccount userAccount);

}
