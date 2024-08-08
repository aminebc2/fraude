package ma.stage.fraude.services;

import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.enums.Tstatus;

import java.util.List;

public interface FraudAlertService {
    List<FraudAlert> getAllFraudAlerts();
    FraudAlert getFraudAlertById(String id);
    List<FraudAlert> getFraudAlertsByTransactionId(String transactionId);
    FraudAlert saveFraudAlert(FraudAlert fraudAlert);
    FraudAlert updateFraudAlert(FraudAlert fraudAlert);
    long getTotalFraudAlertsCount();
    long getNormalFraudAlertsCount();
    long getAnalysingFraudAlertsCount();
    long getFraudAlertsCount();
    List<FraudAlert> getFraudAlertsByStatus(Tstatus status);
    void updateFraudAlertStatusAndComments(String id, Tstatus status, String comments);

}
