package ma.stage.fraude.services;

import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.entities.Transaction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
public class FraudAlertServiceImpl implements FraudAlertService{
    @Override
    public List<FraudAlert> getAllFraudAlerts() {
        return List.of();
    }

    @Override
    public FraudAlert getFraudAlertById(String id) {
        return null;
    }

    @Override
    public boolean isFraudulent(Transaction transaction) {
        return false;
    }
}
