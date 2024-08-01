package ma.stage.fraude.services;

import ma.stage.fraude.entities.AuditLog;
import ma.stage.fraude.enums.Action;

import java.util.List;

public interface AuditLogService {
    List<AuditLog> getAllAuditLogs();
    AuditLog getAuditLogById(String id);
    AuditLog saveAuditLog(AuditLog auditLog);
    long getTotalLogins();
    long getTotalActions(Action action);
}
