package ma.stage.fraude.services;

import ma.stage.fraude.entities.AuditLog;
import ma.stage.fraude.enums.Action;
import ma.stage.fraude.repositories.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AuditLogServiceImpl implements AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public List<AuditLog> getAllAuditLogs() {
        return auditLogRepository.findAll();
    }

    @Override
    public AuditLog getAuditLogById(String id) {
        return auditLogRepository.findById(id).orElse(null);
    }

    @Override
    public AuditLog saveAuditLog(AuditLog auditLog) {
        return auditLogRepository.save(auditLog);
    }

    @Override
    public long getTotalLogins() {
        return auditLogRepository.findAll()
                .stream()
                .filter(log -> log.getAction() == Action.LOGIN)
                .count();
    }

    @Override
    public long getTotalActions(Action action) {
        return auditLogRepository.findAll()
                .stream()
                .filter(log -> log.getAction() == action)
                .count();
    }
}
