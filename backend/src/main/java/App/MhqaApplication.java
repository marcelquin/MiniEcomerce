package App;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "MHQA sistemas mini-ecommerce",
		version = "1.8",
		description = "Gerencia de estoque e venda"))
@EnableFeignClients
public class MhqaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MhqaApplication.class, args);
	}

}
