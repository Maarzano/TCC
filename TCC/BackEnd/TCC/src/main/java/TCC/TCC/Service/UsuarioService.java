package TCC.TCC.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TCC.TCC.DTOs.UsuarioDTO.AtualizarUsuarioDTO;
import TCC.TCC.DTOs.UsuarioDTO.CriarUsuarioDTO;
import TCC.TCC.Entities.Usuario;
import TCC.TCC.Repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    public long criarUsuario(CriarUsuarioDTO createUserDTO){

        var entity = new Usuario(createUserDTO.nomeCompleto(), createUserDTO.senha(), createUserDTO.cpf(), createUserDTO.celular(), createUserDTO.email(), Instant.now(), null);
        var usuarioSalvo = usuarioRepository.save(entity);

       return usuarioSalvo.getUsuarioID();

    }
    public Optional<Usuario> pegarUsuarioPeloID(long UsuarioID){
        return usuarioRepository.findById(UsuarioID);
    }

    public List<Usuario> listarUsuarios(){
        return usuarioRepository.findAll();
    }

    public void DeletarUsuario(long userId){
        var usuarioExiste = usuarioRepository.existsById(userId);

        if (usuarioExiste){
            usuarioRepository.deleteById(userId);
        } else {
            throw new IllegalArgumentException("Usuário com ID " + userId + " não encontrado.");
        }
    }
    public void AtualiazarUsuarioPorId(long userId, AtualizarUsuarioDTO atualizarUsuarioDTO){
        var usuarioExiste = usuarioRepository.findById(userId);

        if (usuarioExiste.isPresent()){
            var usuario = usuarioExiste.get();

            if (atualizarUsuarioDTO.nomeCompleto() != null){
                usuario.setNomeCompleto(atualizarUsuarioDTO.nomeCompleto());
            }

            if (atualizarUsuarioDTO.senha() != null){
                usuario.setSenha(atualizarUsuarioDTO.senha());
            }
            usuarioRepository.save(usuario);
        }

    }
    public Usuario buscarPorEmailESenha(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha).orElse(null);
    }
    //login
    public Usuario validarLogin(String login, String senha) {
        return usuarioRepository.findByLoginAndSenha(login, senha).orElse(null);
    }
    
    

}
