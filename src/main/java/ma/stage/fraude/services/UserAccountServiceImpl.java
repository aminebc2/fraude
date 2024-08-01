package ma.stage.fraude.services;

import ma.stage.fraude.entities.UserAccount;
import ma.stage.fraude.repositories.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserAccountServiceImpl implements UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Override
    public List<UserAccount> getAllUserAccounts() {
        return userAccountRepository.findAll();
    }

    @Override
    public UserAccount getUserAccountById(String id) {
        return userAccountRepository.findById(id).orElse(null);
    }

    @Override
    public UserAccount saveUserAccount(UserAccount userAccount) {
        return userAccountRepository.save(userAccount);
    }

    @Override
    public double getTotalBalance() {
        return userAccountRepository.findAll()
                .stream()
                .mapToDouble(UserAccount::getBalance)
                .sum();
    }

    @Override
    public double getAverageAccountAge() {
        return userAccountRepository.findAll()
                .stream()
                .collect(Collectors.averagingInt(UserAccount::getAccountAge));
    }

    @Override
    public double getAverageTransactionFrequency() {
        return userAccountRepository.findAll()
                .stream()
                .collect(Collectors.averagingInt(UserAccount::getTransactionFrequency));
    }
}
