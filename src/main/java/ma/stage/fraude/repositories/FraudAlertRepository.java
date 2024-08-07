package ma.stage.fraude.repositories;

import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.enums.Tstatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FraudAlertRepository extends JpaRepository<FraudAlert, String> {
    List<FraudAlert> findByTransactionId(String transactionId);
    List<FraudAlert> findByStatus(Tstatus status);
}
