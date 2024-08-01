package ma.stage.fraude.entities;

import lombok.Data;
import jakarta.persistence.*;
import ma.stage.fraude.enums.Action;

import java.util.Date;

@Entity
@Table(name = "audit_logs")
@Data
public class AuditLog {
    @Id
    private String logId;
    private String userId;

    @Enumerated(EnumType.STRING)
    private Action action;

    private Date timestamp;
    private String details;
}
