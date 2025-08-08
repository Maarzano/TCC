package TCC.TCC.DTOs.UsuarioDTO;

public record AtualizarUsuarioDTO(
    String nomeCompleto,
    String senha,
    String cpf,
    String celular,
    String email,
    String imagem
) {}
