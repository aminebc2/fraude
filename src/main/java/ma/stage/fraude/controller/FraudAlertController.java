package ma.stage.fraude.controller;

import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.services.FraudAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fraud-alerts")
public class FraudAlertController {

    @Autowired
    private FraudAlertService fraudAlertService;

    @GetMapping
    public List<FraudAlert> getAllFraudAlerts() {
        return fraudAlertService.getAllFraudAlerts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FraudAlert> getFraudAlertById(@PathVariable String id) {
        FraudAlert fraudAlert = fraudAlertService.getFraudAlertById(id);
        return fraudAlert != null ? ResponseEntity.ok(fraudAlert) : ResponseEntity.notFound().build();
    }

}
