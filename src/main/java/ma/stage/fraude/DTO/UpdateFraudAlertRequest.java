package ma.stage.fraude.DTO;

import lombok.*;
import ma.stage.fraude.enums.Tstatus;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class UpdateFraudAlertRequest {
    private Tstatus status;
    private String comments;

    public void setStatus(Tstatus status) {
        this.status = status;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}