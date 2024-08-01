package ma.stage.fraude.services;

import ma.stage.fraude.entities.Transaction;

public interface FraudDetectionService {
    boolean isFraudulent(Transaction transaction);
}
