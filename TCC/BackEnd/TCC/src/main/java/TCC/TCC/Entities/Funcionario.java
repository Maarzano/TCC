package TCC.TCC.Entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "funcionarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Funcionario {

    public Funcionario(String nomeFuncionario, String emailFuncionario, String cpfFuncionario,
                         String celularFuncionario, Date dataNascimentoFuncionario, 
                         String descricaoFuncionario, Boolean ativo, String image) {
        this.nomeFuncionario = nomeFuncionario;
        this.emailFuncionario = emailFuncionario;
        this.cpfFuncionario = cpfFuncionario;
        this.celularFuncionario = celularFuncionario;
        this.dataNascimentoFuncionario = dataNascimentoFuncionario;
        this.descricaoFuncionario = descricaoFuncionario;
        this.ativo = ativo;
        this.image = image;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_funcionario")
    private long funcionarioId;

    @Column(name = "nome_funcionario", unique = false, nullable = false)
    private String nomeFuncionario;

    @Column(name = "email_funcionario", unique = true, nullable = false)
    private String emailFuncionario;

    @Column(name = "cpf_funcionario", unique = true, nullable = false)
    private String cpfFuncionario;

    @Column(name = "celular_funcionario", nullable = false)
    private String celularFuncionario;

    @Column(name = "data_nascimento_funcionario", nullable = true)
    private Date dataNascimentoFuncionario;

    @Column(name = "descricao_funcionario", nullable = true)
    private String descricaoFuncionario;

    @Column(name = "ativo_desativo_funcionario", nullable = false)
    private Boolean ativo = true;

    @Column(name = "image_profile", nullable = true)
    private String image;

    @ManyToOne
    @JoinColumn(name = "criado_por", referencedColumnName = "id_usuario", nullable = false)
    private Usuario criadoPor;


}
