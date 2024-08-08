package ma.stage.fraude.services;

import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.enums.Tstatus;
import ma.stage.fraude.repositories.FraudAlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FraudAlertServiceImpl implements FraudAlertService {

    @Autowired
    private FraudAlertRepository fraudAlertRepository;

    @Override
    public List<FraudAlert> getAllFraudAlerts() {
        return fraudAlertRepository.findAll();
    }

    @Override
    public FraudAlert getFraudAlertById(String id) {
        return fraudAlertRepository.findById(id).orElseThrow(() -> new RuntimeException("Fraud Alert not found"));
    }

    @Override
    public List<FraudAlert> getFraudAlertsByTransactionId(String transactionId) {
        return fraudAlertRepository.findByTransactionId(transactionId);
    }

    @Override
    public FraudAlert saveFraudAlert(FraudAlert fraudAlert) {
        return fraudAlertRepository.save(fraudAlert);
    }

    @Override
    public FraudAlert updateFraudAlert(FraudAlert fraudAlert) {
        if (!fraudAlertRepository.existsById(fraudAlert.getAlertId())) {
            throw new RuntimeException("Fraud Alert not found");
        }
        return fraudAlertRepository.save(fraudAlert);
    }

    @Override
    public long getTotalFraudAlertsCount() {
        return fraudAlertRepository.count();
    }

    @Override
    public long getNormalFraudAlertsCount() {
        return fraudAlertRepository.findByStatus(Tstatus.NORMAL).size();
    }

    @Override
    public long getAnalysingFraudAlertsCount() {
        return fraudAlertRepository.findByStatus(Tstatus.ANALYZING).size();
    }

    @Override
    public long getFraudAlertsCount() {
        return fraudAlertRepository.findByStatus(Tstatus.FRAUDULENT).size();
    }

    @Override
    public List<FraudAlert> getFraudAlertsByStatus(Tstatus status) {
        return fraudAlertRepository.findByStatus(status);
    }
    @Override
    public void updateFraudAlertStatusAndComments(String id, Tstatus status, String comments) {
        FraudAlert fraudAlert = fraudAlertRepository.findById(id).orElseThrow(() -> new RuntimeException("Fraud Alert not found"));
        fraudAlert.setStatus(status);
        fraudAlert.setComments(comments);
        fraudAlertRepository.save(fraudAlert);
    }
}
