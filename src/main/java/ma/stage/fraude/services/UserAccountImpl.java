package ma.stage.fraude.services;

import ma.stage.fraude.entities.UserAccount;

import java.util.List;

public class UserAccountImpl implements UserAccountService{
    @Override
    public List<UserAccount> getAllUserAccounts() {
        return List.of();
    }

    @Override
    public UserAccount getUserAccountByaccountName(String accountName) {
        return null;
    }

    @Override
    public int getUserAccountCount() {
        return 0;
    }

    @Override
    public UserAccount getUserAccountById(String accountId) {
        return null;
    }
}
