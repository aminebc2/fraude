package ma.stage.fraude.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import ma.stage.fraude.enums.Action;

import java.util.Date;

@Entity
@Table(name = "logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String logId;

    private String userId;

    @Enumerated(EnumType.STRING)
    private Action action;

    private Date timestamp;
}
