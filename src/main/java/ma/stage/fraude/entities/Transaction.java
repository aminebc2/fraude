package ma.stage.fraude.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import ma.stage.fraude.enums.Tstatus;

import java.util.Date;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {
    @Id
    private String transactionId;
    private Date date;
    private double amount;

    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
    private UserAccount userAccount;

    @Enumerated(EnumType.STRING)
    private Tstatus status;
    private String location;
}
