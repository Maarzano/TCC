package TCC.TCC.Entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    public Usuario(String nome, String senha, String CPF, String celular, String email, Instant creationTimestamp, Instant updateTimestamp) {
        this.nomeCompleto = nome;
        this.senha = senha;
        this.cpf = CPF;
        this.celular = celular;
        this.email = email;
        this.updateTimestamp = updateTimestamp;
        this.creationTimestamp = creationTimestamp;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private long usuarioID;

    @Column(name =  "NomeCompleto", nullable = false)
    private String nomeCompleto;

    @Column(name = "Senha", nullable = false)
    private String senha;

    @Column(name = "CPF", unique = true, nullable = false)
    private String cpf;

    @Column(name = "Celular", nullable = false)
    private String celular;

    @Column(name = "Email", unique = true, nullable = false)
    private String email;

    @Column(name = "imagem_perfil", nullable = true)
    private String imagem;

    @Column(name = "DataDeCriação", updatable = false)
    @CreationTimestamp
    private Instant creationTimestamp;
    
    @Column(name = "DataDeAtualização")
    @UpdateTimestamp
    private Instant updateTimestamp;


}
