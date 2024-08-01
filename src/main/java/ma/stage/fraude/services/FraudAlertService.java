package ma.stage.fraude.services;

import ma.stage.fraude.entities.FraudAlert;
import java.util.List;

public interface FraudAlertService {
    List<FraudAlert> getAllFraudAlerts();
    FraudAlert getFraudAlertById(String id);
}
