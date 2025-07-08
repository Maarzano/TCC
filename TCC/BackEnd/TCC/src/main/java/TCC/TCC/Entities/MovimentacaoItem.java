// Novo arquivo: MovimentacaoItem.java
package TCC.TCC.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "movimentacao_itens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MovimentacaoItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "movimentacao_id", nullable = false)
    private Movimentacao movimentacao;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    private int quantidade;
}