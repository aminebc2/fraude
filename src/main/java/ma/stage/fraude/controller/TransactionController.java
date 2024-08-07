package ma.stage.fraude.controller;

import ma.stage.fraude.entities.Transaction;
import ma.stage.fraude.entities.UserAccount;
import ma.stage.fraude.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin("*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable String id) {
        return transactionService.getTransactionById(id);
    }

    @GetMapping("/userAccount/{accountId}")
    public List<Transaction> getTransactionsByUserAccount(@PathVariable String accountId) {
        UserAccount userAccount = new UserAccount();
        userAccount.setAccountId(accountId);
        return transactionService.getTransactionsByUserAccount(userAccount);
    }

    @PostMapping
    public Transaction saveTransaction(@RequestBody Transaction transaction) {
        return transactionService.saveTransaction(transaction);
    }

    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable String id, @RequestBody Transaction transaction) {
        transaction.setTransactionId(id);
        return transactionService.updateTransaction(transaction);
    }

    @GetMapping("/amount/total")
    public double getTotalTransactionAmount() {
        return transactionService.getTotalTransactionAmount();
    }

    @GetMapping("/count")
    public long getTotalTransactionCount() {
        return transactionService.getTotalTransactionCount();
    }

    @GetMapping("/amount/average")
    public double getAverageTransactionAmount() {
        return transactionService.getAverageTransactionAmount();
    }
}