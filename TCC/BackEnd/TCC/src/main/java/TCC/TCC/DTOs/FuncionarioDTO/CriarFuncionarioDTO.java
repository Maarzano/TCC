package TCC.TCC.DTOs.FuncionarioDTO;

import java.util.Date;

import jakarta.validation.constraints.*;


public record CriarFuncionarioDTO(

    @NotBlank(message = "Nome é obrigatório")
    String nomeFuncionario,

    @Email(message = "E-mail inválido")
    String emailFuncionario,

    @Pattern(regexp = "\\d{11}", message = "CPF deve ter 11 dígitos")
    String cpfFuncionario,

    @Pattern(regexp = "\\d{9,11}", message = "Celular inválido")
    String celularFuncionario,

    @Past(message = "Data de nascimento deve ser no passado")
    Date dataNascimentoFuncionario,

    String descricaoFuncionario,

    @NotNull(message = "O status ativo deve ser informado")
    Boolean ativo,

    String image
) { }
