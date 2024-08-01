package ma.stage.fraude.entities;

import lombok.Data;
import jakarta.persistence.*;
import ma.stage.fraude.enums.Roles;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    private String userId;
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Roles role;
}
