package ma.stage.fraude.repositories;

import ma.stage.fraude.entities.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface AuditLogRepository extends JpaRepository<AuditLog, String> {

}