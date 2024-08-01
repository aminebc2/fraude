package ma.stage.fraude.services;

import lombok.Setter;
import ma.stage.fraude.entities.UserAccount;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
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
