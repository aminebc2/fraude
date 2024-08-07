package ma.stage.fraude.controller;

import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.enums.Tstatus;
import ma.stage.fraude.services.FraudAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fraudAlerts")
@CrossOrigin(origins = "*")
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

    @PutMapping("/{id}")
    public FraudAlert updateFraudAlert(@PathVariable String id, @RequestBody FraudAlert fraudAlert) {
        fraudAlert.setAlertId(id);
        return fraudAlertService.updateFraudAlert(fraudAlert);
    }

    @GetMapping("/count/total")
    public long getTotalFraudAlertsCount() {
        return fraudAlertService.getTotalFraudAlertsCount();
    }

    @GetMapping("/count/normals")
    public long getNormalFraudAlertsCount() {
        return fraudAlertService.getNormalFraudAlertsCount();
    }

    @GetMapping("/count/analisys")
    public long getAnalysingFraudAlertsCount() {
        return fraudAlertService.getAnalysingFraudAlertsCount();
    }

    @GetMapping("/count/frauds")
    public long getFraudAlertsCount() {
        return fraudAlertService.getFraudAlertsCount();
    }

    @GetMapping("/status/{status}")
    public List<FraudAlert> getFraudAlertsByStatus(@PathVariable Tstatus status) {
        return fraudAlertService.getFraudAlertsByStatus(status);
    }
}