package TCC.TCC.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import TCC.TCC.Entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByEmailAndSenha(String email, String senha);
    
    boolean existsByEmail(String email);

    @Query("SELECT u FROM Usuario u WHERE (u.email = :login OR u.cpf = :login) AND u.senha = :senha")
    Optional<Usuario> findByLoginAndSenha(@Param("login") String login, @Param("senha") String senha);

}
