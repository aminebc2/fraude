package ma.stage.fraude.controller;

import ma.stage.fraude.entities.UserAccount;
import ma.stage.fraude.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userAccounts")
@CrossOrigin("*")
public class UserAccountController {

    @Autowired
    private UserAccountService userAccountService;

    @GetMapping
    public List<UserAccount> getAllUserAccounts() {
        return userAccountService.getAllUserAccounts();
    }

    @GetMapping("/{id}")
    public UserAccount getUserAccountById(@PathVariable String id) {
        return userAccountService.getUserAccountById(id);
    }

    @PostMapping
    public UserAccount saveUserAccount(@RequestBody UserAccount userAccount) {
        return userAccountService.saveUserAccount(userAccount);
    }

    @GetMapping("/balance/total")
    public double getTotalBalance() {
        return userAccountService.getTotalBalance();
    }

    @GetMapping("/age/average")
    public double getAverageAccountAge() {
        return userAccountService.getAverageAccountAge();
    }

    @GetMapping("/frequency/average")
    public double getAverageTransactionFrequency() {
        return userAccountService.getAverageTransactionFrequency();
    }
}
