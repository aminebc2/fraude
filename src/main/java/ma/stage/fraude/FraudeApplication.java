package ma.stage.fraude;

import ma.stage.fraude.repositories.UserRepository;
import ma.stage.fraude.services.UserAccountService;
import ma.stage.fraude.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FraudeApplication {

    public static void main(String[] args) {
        SpringApplication.run(FraudeApplication.class, args);
    }


}
CommandLineRunner runner(UserAccountService userAccountService){
    return args -> {

    }
}