package ma.stage.fraude.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import ma.stage.fraude.enums.TransactionType;
import ma.stage.fraude.enums.Tstatus;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@Entity
@Table(name = "transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String transactionId;

    private Date date;
    private double amount;

    @ManyToOne
    @JoinColumn(name = "accountId", nullable = false)
    private UserAccount userAccount;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;
    private String location;

}
