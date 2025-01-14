package ma.stage.fraude.services;

import ma.stage.fraude.entities.User;

import java.util.List;

public interface UserService {
    User getUserById(String userId);
    List<User> getAllUsers();
    User createUser(User user);
    User updateUser(String userId, User user);
    void deleteUser(String userId);
}
