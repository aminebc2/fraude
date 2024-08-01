package ma.stage.fraude.controller;

import ma.stage.fraude.entities.UserAccount;
import ma.stage.fraude.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-accounts")
public class UserAccountController {

    @Autowired
    private UserAccountService userAccountService;

    @GetMapping
    public List<UserAccount> getAllUserAccounts() {
        return userAccountService.getAllUserAccounts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAccount> getUserAccountByaccountName(@PathVariable String accountName) {
        UserAccount userAccount = userAccountService.getUserAccountByaccountName(accountName);
        return userAccount != null ? ResponseEntity.ok(userAccount) : ResponseEntity.notFound().build();
    }

}
