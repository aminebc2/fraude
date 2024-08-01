package ma.stage.fraude.repositories;

import ma.stage.fraude.entities.FraudAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FraudAlertRepository extends JpaRepository<FraudAlert, String> {

}

