package ma.stage.fraude.services;

import ma.stage.fraude.entities.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserByUsername(String username);
}
