package ma.stage.fraude.entities;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import ma.stage.fraude.enums.AccountType;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user_accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAccount {
    @Id
    private String accountId;
    private String accountName;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    private double balance;
    private Date creationDate;
    private int accountAge; // in months
    private int transactionFrequency; // Calculated based on the number of transactions over a specific period

    @OneToMany(mappedBy = "userAccount", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Transaction> transactions;
}
