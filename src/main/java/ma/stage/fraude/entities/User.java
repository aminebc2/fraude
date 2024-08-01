package ma.stage.fraude.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import ma.stage.fraude.enums.Roles;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    private String userId;
    private String username;
    private String password;

    @Enumerated(EnumType.STRING)
    private Roles role;
}
