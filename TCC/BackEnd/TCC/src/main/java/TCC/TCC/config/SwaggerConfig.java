package TCC.TCC.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(title = "API do TCC", version = "1.0", description = "Documentação da API gerada pelo swagger"))
public class SwaggerConfig {
    //http://localhost:8080/swagger-ui/index.html
}
