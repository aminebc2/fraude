package ma.stage.fraude.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import ma.stage.fraude.enums.FraudType;
import ma.stage.fraude.enums.Fstatus;

import java.util.Date;

@Entity
@Table(name = "fraud_alerts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FraudAlert {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String alertId;

    private String transactionId;
    private Date alertDate;

    @Enumerated(EnumType.STRING)
    private FraudType fraudType;

    @Enumerated(EnumType.STRING)
    private Fstatus status;
    private String comments;
}
