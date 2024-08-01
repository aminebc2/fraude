package ma.stage.fraude.repositories;

import ma.stage.fraude.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
