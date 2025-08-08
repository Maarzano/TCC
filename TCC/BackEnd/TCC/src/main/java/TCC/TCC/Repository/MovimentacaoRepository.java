package TCC.TCC.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import TCC.TCC.Entities.Movimentacao;
import TCC.TCC.Entities.Usuario;

import java.util.List;


@Repository
public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {
    List<Movimentacao> findByCriadoPor(Usuario criadoPor);
}
