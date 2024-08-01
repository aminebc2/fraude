package ma.stage.fraude.repositories;

import ma.stage.fraude.entities.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
}
