package ma.stage.fraude.services;

import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.enums.Fstatus;
import ma.stage.fraude.repositories.FraudAlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
        return fraudAlertRepository.findById(id).orElse(null);
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
    public long getTotalFraudAlertsCount() {
        return fraudAlertRepository.count();
    }

    @Override
    public long getPendingFraudAlertsCount() {
        return fraudAlertRepository.findByStatus(Fstatus.PENDING).size();
    }

    @Override
    public long getConfirmedFraudAlertsCount() {
        return fraudAlertRepository.findByStatus(Fstatus.CONFIRMED).size();
    }

    @Override
    public long getRejectedFraudAlertsCount() {
        return fraudAlertRepository.findByStatus(Fstatus.REJECTED).size();
    }

    @Override
    public List<FraudAlert> getFraudAlertsByStatus(Fstatus status) {
        return fraudAlertRepository.findByStatus(status);
    }
}
