package ma.stage.fraude.services;

import com.github.javafaker.Faker;
import ma.stage.fraude.entities.*;
import ma.stage.fraude.enums.*;
import ma.stage.fraude.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class DataService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private FraudAlertRepository fraudAlertRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    private final Faker faker = new Faker();

    // Listes des noms marocains
    private final String[] prenomsMarocains = {
            "Mohamed", "Fatima", "Ahmed", "Amina", "Hassan", "Khadija", "Youssef", "Malika", "Rachid", "Nadia",
            "Saïd", "Mounia", "Taha", "Leila", "Soufiane", "Hajar", "Mustapha", "Imane", "Yassine", "Zineb",
            "Omar", "Rim", "Bilal", "Latifa", "Rayan", "Ikram", "Ali", "Rania", "Amine", "Salma",
            "Karim", "Ghizlane", "Abdelaziz", "Asmae", "Hamza", "Sara", "Samir", "Meryem", "Abdellah", "Noura"
    };

    private final String[] nomsMarocains = {
            "El Idrissi", "Alaoui", "Bennani", "Fassi", "Haddad", "Amrani", "Sefrioui", "Qadiri", "Benjelloun", "Chraibi",
            "El Mansouri", "Taoufik", "Bouazza", "El Kabbaj", "Raji", "El Alami", "Mouhajir", "El Baz", "Bennis", "Jaafari",
            "El Guerrouj", "Moutawakel", "Lahlou", "El Kadiri", "Bourkia", "El Fassi", "El Hammouchi", "Harrouchi", "El Bahri", "Naciri",
            "Kabbaj", "Boujemaa", "El Mahi", "Talbi", "Benabbou", "Bourj", "El Hajji", "Oulad", "Ben Tahar", "Ben Amrane"
    };

    // Liste des villes marocaines
    private final String[] villesMarocaines = {
            "Casablanca", "Rabat", "Fès", "Marrakech", "Agadir", "Tanger", "Meknès", "Oujda", "Tetouan", "Safi",
            "Salé", "El Jadida", "Nador", "Kenitra", "Khouribga", "Beni Mellal", "Ksar El Kebir", "Larache", "Khemisset", "Guelmim",
            "Taza", "Settat", "Ifrane", "Azrou", "Essaouira", "Chefchaouen", "Ouarzazate", "Errachidia", "Taroudant", "Al Hoceima"
    };

    // Exemples de commentaires et détails
    private final String[] commentairesFraude = {
            "Transaction suspecte détectée à l'étranger",
            "Montant élevé retiré en une seule opération",
            "Multiples tentatives de connexion échouées",
            "Changement soudain de l'adresse IP",
            "Activité inhabituelle en dehors des heures de bureau",
            "Tentative de retrait non autorisée",
            "Paiement récurrent non reconnu par le titulaire",
            "Utilisation de la carte dans un endroit inhabituel",
            "Transaction avec une devise étrangère non courante",
            "Utilisation de la carte après un signalement de perte",
            "Suspicion de vol d'identité suite à une plainte",
            "Multiples transactions en peu de temps",
            "Montant inhabituel par rapport aux habitudes du client",
            "Activité suspecte détectée à partir de multiples localisations",
            "Tentative de modification des informations de compte",
            "Transaction effectuée hors du pays de résidence",
            "Tentative de connexion à partir d'un appareil inconnu",
            "Retrait important après un dépôt anormal",
            "Utilisation excessive de la carte dans une courte période",
            "-"
    };


    @PostConstruct
    public void generateData() {
        generateUsers(10);
        generateAccounts(50);
        generateTransactions(300);
        generateFraudAlerts((int) faker.number().randomDouble(2, 100, 300));
        generateAuditLogs(30);
    }

    private void generateUsers(int count) {
        Roles[] roles = {Roles.ANALYST, Roles.SUPERVISOR};
        for (int i = 0; i < count; i++) {
            User user = User.builder()
                    .userId(UUID.randomUUID().toString())
                    .username(generateName())
                    .password(faker.internet().password())
                    .role(roles[faker.random().nextInt(roles.length)])
                    .build();
            userRepository.save(user);
        }
    }

    private void generateAccounts(int count) {
        for (int i = 0; i < count; i++) {
            UserAccount account = UserAccount.builder()
                    .accountId(UUID.randomUUID().toString())
                    .accountName(generateName())
                    .accountType(AccountType.values()[faker.random().nextInt(AccountType.values().length)])
                    .balance(faker.number().randomDouble(2, 1000, 100000))
                    .creationDate(faker.date().past(1000, TimeUnit.DAYS))
                    .build();
            userAccountRepository.save(account);
        }
    }

    private void generateTransactions(int count) {
        List<UserAccount> accounts = userAccountRepository.findAll();
        for (int i = 0; i < count; i++) {
            Transaction transaction = Transaction.builder()
                    .transactionId(UUID.randomUUID().toString())
                    .date(faker.date().past(365, TimeUnit.DAYS))
                    .amount(faker.number().randomDouble(2, 10, 10000))
                    .userAccount(accounts.get(faker.random().nextInt(accounts.size())))
                    .transactionType(TransactionType.values()[faker.random().nextInt(TransactionType.values().length)])
                    .location(generateCity())
                    .build();
            transactionRepository.save(transaction);
        }
    }

    private void generateFraudAlerts(int count) {
        List<Transaction> transactions = transactionRepository.findAll();

        int fraudulentCount = (int) (count * 0.8123);
        int analyzingCount = count - fraudulentCount;

        for (int i = 0; i < count; i++) {
            Transaction transaction = transactions.get(faker.random().nextInt(transactions.size()));
            Tstatus status;

            if (fraudulentCount > 0) {
                status = Tstatus.FRAUDULENT;
                fraudulentCount--;
            } else if (analyzingCount > 0) {
                status = Tstatus.ANALYZING;
                analyzingCount--;
            } else {
                status = Tstatus.NORMAL;
            }

            FraudAlert alert = FraudAlert.builder()
                    .alertId(UUID.randomUUID().toString())
                    .transactionId(transaction.getTransactionId())
                    .alertDate(faker.date().past(365, TimeUnit.DAYS))
                    .fraudType(FraudType.values()[faker.random().nextInt(FraudType.values().length)])
                    .status(status)
                    .comments(generateFraudComment())
                    .build();
            fraudAlertRepository.save(alert);
        }
    }


    private void generateAuditLogs(int count) {
        List<User> users = userRepository.findAll();
        for (int i = 0; i < count; i++) {
            AuditLog log = AuditLog.builder()
                    .logId(UUID.randomUUID().toString())
                    .userId(users.get(faker.random().nextInt(users.size())).getUserId())
                    .action(Action.values()[faker.random().nextInt(Action.values().length)])
                    .timestamp(faker.date().past(365, TimeUnit.DAYS))
                    .build();
            auditLogRepository.save(log);
        }
    }

    private String generateName() {
        return prenomsMarocains[faker.random().nextInt(prenomsMarocains.length)] + " " + nomsMarocains[faker.random().nextInt(nomsMarocains.length)];
    }

    private String generateCity() {
        return villesMarocaines[faker.random().nextInt(villesMarocaines.length)];
    }

    private String generateFraudComment() {
        return commentairesFraude[faker.random().nextInt(commentairesFraude.length)];
    }
}
