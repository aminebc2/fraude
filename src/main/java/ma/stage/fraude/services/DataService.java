package ma.stage.fraude.services;

import com.github.javafaker.Faker;
import ma.stage.fraude.entities.*;
import ma.stage.fraude.enums.*;
import ma.stage.fraude.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Date;
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

    private Faker faker = new Faker();

    // Listes des noms marocains
    private String[] prenomsMarocains = {
            "Mohamed", "Fatima", "Ahmed", "Amina", "Hassan", "Khadija", "Youssef", "Malika", "Rachid", "Nadia",
            "Saïd", "Mounia", "Taha", "Leila", "Soufiane", "Hajar", "Mustapha", "Imane", "Yassine", "Zineb",
            "Omar", "Rim", "Bilal", "Latifa", "Rayan", "Ikram", "Ali", "Rania", "Amine", "Salma",
            "Karim", "Ghizlane", "Abdelaziz", "Asmae", "Hamza", "Sara", "Samir", "Meryem", "Abdellah", "Noura"
    };

    private String[] nomsMarocains = {
            "El Idrissi", "Alaoui", "Bennani", "Fassi", "Haddad", "Amrani", "Sefrioui", "Qadiri", "Benjelloun", "Chraibi",
            "El Mansouri", "Taoufik", "Bouazza", "El Kabbaj", "Raji", "El Alami", "Mouhajir", "El Baz", "Bennis", "Jaafari",
            "El Guerrouj", "Moutawakel", "Lahlou", "El Kadiri", "Bourkia", "El Fassi", "El Hammouchi", "Harrouchi", "El Bahri", "Naciri",
            "Kabbaj", "Boujemaa", "El Mahi", "Talbi", "Benabbou", "Bourj", "El Hajji", "Oulad", "Ben Tahar", "Ben Amrane"
    };

    // Liste des villes marocaines
    private String[] villesMarocaines = {
            "Casablanca", "Rabat", "Fès", "Marrakech", "Agadir", "Tanger", "Meknès", "Oujda", "Tetouan", "Safi",
            "Salé", "El Jadida", "Nador", "Kenitra", "Khouribga", "Beni Mellal", "Ksar El Kebir", "Larache", "Khemisset", "Guelmim",
            "Taza", "Settat", "Ifrane", "Azrou", "Essaouira", "Chefchaouen", "Ouarzazate", "Errachidia", "Taroudant", "Al Hoceima"
    };

    // Exemples de commentaires et détails
    private String[] commentairesFraude = {
            "TransactionModel suspecte détectée à l'étranger",
            "Montant élevé retiré en une seule opération",
            "Multiples tentatives de connexion échouées",
            "Changement soudain de l'adresse IP",
            "Activité inhabituelle en dehors des heures de bureau",
            "Tentative de retrait non autorisée",
            "Paiement récurrent non reconnu par le titulaire",
            "Utilisation de la carte dans un endroit inhabituel",
            "TransactionModel avec une devise étrangère non courante",
            "Utilisation de la carte après un signalement de perte",
            "Suspicion de vol d'identité suite à une plainte",
            "Multiples transactions en peu de temps",
            "Montant inhabituel par rapport aux habitudes du client",
            "Activité suspecte détectée à partir de multiples localisations",
            "Tentative de modification des informations de compte",
            "TransactionModel effectuée hors du pays de résidence",
            "Tentative de connexion à partir d'un appareil inconnu",
            "Retrait important après un dépôt anormal",
            "Utilisation excessive de la carte dans une courte période",
            "-"
    };

    @PostConstruct
    public void generateData() {
        generateUsers(6);
        generateAccounts(10);
        generateTransactions(50);
        generateFraudAlerts(20);
        generateAuditLogs(30);
    }


    private void generateUsers(int count) {
        for (int i = 0; i < count; i++) {
            User user = User.builder()
                    .userId(UUID.randomUUID().toString())
                    .username(generateName())
                    .password(faker.internet().password())
                    .role(Roles.ANALYST)
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
                    .accountAge(faker.number().numberBetween(1, 120))
                    .transactionFrequency(faker.number().numberBetween(1, 100))
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
                    .status(Tstatus.values()[faker.random().nextInt(Tstatus.values().length)])
                    .location(generateCity())
                    .build();
            transactionRepository.save(transaction);
        }
    }

    private void generateFraudAlerts(int count) {
        List<Transaction> transactions = transactionRepository.findAll();
        for (int i = 0; i < count; i++) {
            FraudAlert alert = FraudAlert.builder()
                    .alertId(UUID.randomUUID().toString())
                    .transactionId(transactions.get(faker.random().nextInt(transactions.size())).getTransactionId())
                    .alertDate(faker.date().past(365, TimeUnit.DAYS))
                    .fraudType(FraudType.values()[faker.random().nextInt(FraudType.values().length)])
                    .status(Fstatus.values()[faker.random().nextInt(Fstatus.values().length)])
                    .comments(generateFraudComment())
                    .build();
            fraudAlertRepository.save(alert);
        }
    }

    private void generateAuditLogs(int count) {
        for (int i = 0; i < count; i++) {
            AuditLog log = AuditLog.builder()
                    .logId(UUID.randomUUID().toString())
                    .userId(UUID.randomUUID().toString()) // Replace with actual userId from User entities if necessary
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
