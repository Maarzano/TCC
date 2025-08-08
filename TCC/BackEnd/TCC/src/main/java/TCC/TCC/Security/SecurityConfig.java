package TCC.TCC.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    public SecurityConfig(OAuth2SuccessHandler oAuth2SuccessHandler) {
        this.oAuth2SuccessHandler = oAuth2SuccessHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/oauth2/**"
                ).permitAll()
                .requestMatchers("/v1/auth/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/v1/Usuarios").permitAll()
                .requestMatchers(HttpMethod.POST, "/v1/Usuarios/esqueci-senha").permitAll()
                .requestMatchers(HttpMethod.GET, "/v1/Usuarios/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/v1/Funcionarios/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/v1/Items/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/v1/movimentacoes/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/v1/Funcionarios/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/v1/Funcionarios/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/v1/Funcionarios/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/v1/Items/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/v1/Items/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/v1/Items/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/v1/movimentacoes/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/v1/movimentacoes/**").authenticated()
                .requestMatchers(HttpMethod.PATCH, "/v1/movimentacoes/**").authenticated()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .successHandler(oAuth2SuccessHandler)
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt()
            );
        return http.build();
    }
}
