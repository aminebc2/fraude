package ma.stage.fraude.controller;

import lombok.AllArgsConstructor;
import ma.stage.fraude.entities.FraudAlert;
import ma.stage.fraude.services.FraudAlertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/fraud-alerts")
public class FraudAlertController {

    private final FraudAlertService fraudAlertService;

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