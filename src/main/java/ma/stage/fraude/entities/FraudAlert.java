package ma.stage.fraude.entities;

import lombok.Data;
import jakarta.persistence.*;
import ma.stage.fraude.enums.FraudType;
import ma.stage.fraude.enums.Fstatus;

import java.util.Date;

@Entity
@Table(name = "fraud_alerts")
@Data
public class FraudAlert {
    @Id
    private String alertId;
    private String transactionId;
    private Date alertDate;

    @Enumerated(EnumType.STRING)
    private FraudType fraudType;

    @Enumerated(EnumType.STRING)
    private Fstatus status;
    private String comments;
}

