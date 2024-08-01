package ma.stage.fraude.services;

import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.entities.Transaction;
import org.springframework.stereotype.Service;

import java.util.List;

public interface FraudAlertService {
    List<FraudAlert> getAllFraudAlerts();
    FraudAlert getFraudAlertById(String id);
    boolean isFraudulent(Transaction transaction);

}
