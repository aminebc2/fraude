package ma.stage.fraude.services;

import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.enums.Fstatus;

import java.util.List;

public interface FraudAlertService {
    List<FraudAlert> getAllFraudAlerts();
    FraudAlert getFraudAlertById(String id);
    List<FraudAlert> getFraudAlertsByTransactionId(String transactionId);
    FraudAlert saveFraudAlert(FraudAlert fraudAlert);
    long getTotalFraudAlertsCount();
    long getPendingFraudAlertsCount();
    long getConfirmedFraudAlertsCount();
    long getRejectedFraudAlertsCount();
    List<FraudAlert> getFraudAlertsByStatus(Fstatus status);
}
