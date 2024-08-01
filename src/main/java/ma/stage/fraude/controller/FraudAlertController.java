package ma.stage.fraude.controller;

import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.enums.Fstatus;
import ma.stage.fraude.services.FraudAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fraudAlerts")
public class FraudAlertController {

    @Autowired
    private FraudAlertService fraudAlertService;

    @GetMapping
    public List<FraudAlert> getAllFraudAlerts() {
        return fraudAlertService.getAllFraudAlerts();
    }

    @GetMapping("/{id}")
    public FraudAlert getFraudAlertById(@PathVariable String id) {
        return fraudAlertService.getFraudAlertById(id);
    }

    @GetMapping("/transaction/{transactionId}")
    public List<FraudAlert> getFraudAlertsByTransactionId(@PathVariable String transactionId) {
        return fraudAlertService.getFraudAlertsByTransactionId(transactionId);
    }

    @PostMapping
    public FraudAlert saveFraudAlert(@RequestBody FraudAlert fraudAlert) {
        return fraudAlertService.saveFraudAlert(fraudAlert);
    }

    @GetMapping("/count/total")
    public long getTotalFraudAlertsCount() {
        return fraudAlertService.getTotalFraudAlertsCount();
    }

    @GetMapping("/count/pending")
    public long getPendingFraudAlertsCount() {
        return fraudAlertService.getPendingFraudAlertsCount();
    }

    @GetMapping("/count/confirmed")
    public long getConfirmedFraudAlertsCount() {
        return fraudAlertService.getConfirmedFraudAlertsCount();
    }

    @GetMapping("/count/rejected")
    public long getRejectedFraudAlertsCount() {
        return fraudAlertService.getRejectedFraudAlertsCount();
    }

    @GetMapping("/status/{status}")
    public List<FraudAlert> getFraudAlertsByStatus(@PathVariable Fstatus status) {
        return fraudAlertService.getFraudAlertsByStatus(status);
    }
}
