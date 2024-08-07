package ma.stage.fraude.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import ma.stage.fraude.enums.AccountType;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Entity
@Table(name = "clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String accountId;

    private String accountName;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    private double balance;
    private Date creationDate;
    private int accountAge; // in months
    private int transactionFrequency; // Calculated based on the number of transactions over a specific period

    @OneToMany(mappedBy = "userAccount", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Transaction> transactions;

    @PostLoad
    private void calculateDerivedFields() {
        if (creationDate != null) {
            long diffInMillies = Math.abs(new Date().getTime() - creationDate.getTime());
            long diffInDays = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
            accountAge = (int) (diffInDays / 30);
        }
        if (transactions != null) {
            long now = new Date().getTime();
            long oneMonthAgo = now - TimeUnit.DAYS.toMillis(30);
            transactionFrequency = (int) transactions.stream()
                    .filter(transaction -> transaction.getDate().getTime() > oneMonthAgo)
                    .count();
        }
    }
}
