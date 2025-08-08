package TCC.TCC.Entities;

import org.hibernate.annotations.CreationTimestamp;

import TCC.TCC.Entities.Enum.StatusMovimentacao;
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

    public Movimentacao(Funcionario funcionario, TipoMovimentacao tipoMovimentacao, StatusMovimentacao status, Instant dataMovimentacao) {
        this.funcionario = funcionario;
        this.tipoMovimentacao = tipoMovimentacao;
        this.statusMovimentacao = status;
        this.dataMovimentacao = dataMovimentacao;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimentacao")
    private long idMovimentacao;

    @ManyToOne
    @JoinColumn(name = "id_funcionario", nullable = false)
    private Funcionario funcionario;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_movimentacao", nullable = false)
    private TipoMovimentacao tipoMovimentacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "Status_movimentacao", nullable = false)
    private StatusMovimentacao statusMovimentacao;

    @CreationTimestamp
    @Column(name = "data_movimentacao", nullable = false, updatable = false)
    private Instant dataMovimentacao;

    @ManyToOne
    @JoinColumn(name = "criado_por", referencedColumnName = "id_usuario", nullable = false)
    private Usuario criadoPor;

}
