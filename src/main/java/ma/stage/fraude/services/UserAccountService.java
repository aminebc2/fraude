package ma.stage.fraude.services;

import ma.stage.fraude.entities.UserAccount;

import java.util.List;

public interface UserAccountService {
    List<UserAccount> getAllUserAccounts();
    UserAccount getUserAccountByaccountName(String accountName);
}
