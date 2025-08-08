package TCC.TCC.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TCC.TCC.Entities.Funcionario;
import TCC.TCC.Entities.Usuario;

import java.util.List;


@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>{

    List<Funcionario> findByCriadoPor(Usuario criadoPor);

    List<Funcionario> findByCriadoPorAndAtivoTrue(Usuario usuario);

}
