package ma.stage.fraude.services;

import ma.stage.fraude.entities.UserAccount;

import java.util.List;

public interface UserAccountService {
    List<UserAccount> getAllUserAccounts();
    UserAccount getUserAccountById(String id);
    UserAccount saveUserAccount(UserAccount userAccount);
    double getTotalBalance();
    double getAverageAccountAge();
    double getAverageTransactionFrequency();
}
