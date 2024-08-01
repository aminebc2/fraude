package ma.stage.fraude.controllers;

import ma.stage.fraude.entities.AuditLog;
import ma.stage.fraude.enums.Action;
import ma.stage.fraude.services.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auditLogs")
public class AuditLogController {

    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    public List<AuditLog> getAllAuditLogs() {
        return auditLogService.getAllAuditLogs();
    }

    @GetMapping("/{id}")
    public AuditLog getAuditLogById(@PathVariable String id) {
        return auditLogService.getAuditLogById(id);
    }

    @PostMapping
    public AuditLog saveAuditLog(@RequestBody AuditLog auditLog) {
        return auditLogService.saveAuditLog(auditLog);
    }

    @GetMapping("/logins/total")
    public long getTotalLogins() {
        return auditLogService.getTotalLogins();
    }

    @GetMapping("/actions/{action}/total")
    public long getTotalActions(@PathVariable Action action) {
        return auditLogService.getTotalActions(action);
    }
}
