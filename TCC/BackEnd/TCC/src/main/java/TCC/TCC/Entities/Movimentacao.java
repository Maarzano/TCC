package TCC.TCC.Entities;

import org.hibernate.annotations.CreationTimestamp;

import TCC.TCC.Entities.Enum.TipoMovimentacao;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "movimentacoes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Movimentacao {

    public Movimentacao(Item item, Funcionario funcionario, int quantidade, TipoMovimentacao tipoMovimentacao, Instant dataMovimentacao) {
        this.item = item;
        this.funcionario = funcionario;
        this.quantidade = quantidade;
        this.tipoMovimentacao = tipoMovimentacao;
        this.dataMovimentacao = dataMovimentacao;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimentacao")
    private Long idMovimentacao;

    @ManyToOne
    @JoinColumn(name = "id_item", nullable = false)
    private Item item;

    @ManyToOne
    @JoinColumn(name = "id_funcionario", nullable = false)
    private Funcionario funcionario;

    @Column(name = "quantidade", nullable = false)
    private int quantidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_movimentacao", nullable = false)
    private TipoMovimentacao tipoMovimentacao;

    @CreationTimestamp
    @Column(name = "data_movimentacao", nullable = false, updatable = false)
    private Instant dataMovimentacao;

}
