package TCC.TCC.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TCC.TCC.Entities.Movimentacao;
import TCC.TCC.Entities.MovimentacaoItem;


@Repository
public interface MovimentacaoItemRepository extends JpaRepository<MovimentacaoItem, Long >{
    List<MovimentacaoItem> findByMovimentacao(Movimentacao movimentacao);
}
