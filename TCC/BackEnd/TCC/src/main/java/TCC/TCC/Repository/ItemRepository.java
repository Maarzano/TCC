package TCC.TCC.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import TCC.TCC.Entities.*;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>{
    Optional<Item> findBynomeItemIgnoreCase(String nomeItem);
    
    boolean existsBynomeItem(String nomeItem);

    @Query("SELECT i FROM Item i WHERE LOWER(i.nomeItem) LIKE LOWER(CONCAT('%', :nomeItem, '%'))")
    List<Item> buscarPorNome(@Param("nomeItem") String nomeitem);

    List<Item> findByCriadoPor(Usuario criadoPor);

    List<Item> findByCriadoPorAndAtivoTrue(Usuario criadoPor);


}
