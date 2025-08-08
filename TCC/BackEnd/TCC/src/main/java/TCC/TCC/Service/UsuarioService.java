package TCC.TCC.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import TCC.TCC.DTOs.UsuarioDTO.AtualizarUsuarioDTO;
import TCC.TCC.DTOs.UsuarioDTO.CriarUsuarioDTO;
import TCC.TCC.Entities.Usuario;
import TCC.TCC.Repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String mailFrom;

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
    
            if (atualizarUsuarioDTO.cpf() != null){
                usuario.setCpf(atualizarUsuarioDTO.cpf());
            }
    
            if (atualizarUsuarioDTO.celular() != null){
                usuario.setCelular(atualizarUsuarioDTO.celular());
            }
    
            if (atualizarUsuarioDTO.email() != null){
                usuario.setEmail(atualizarUsuarioDTO.email());
            }

            if (atualizarUsuarioDTO.imagem() != null){
                usuario.setImagem(atualizarUsuarioDTO.imagem());
            }
    
            usuarioRepository.save(usuario);
        }
    }
    public Usuario buscarPorEmailESenha(String email, String senha) {
        return usuarioRepository.findByEmailAndSenha(email, senha).orElse(null);
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
    
    public Usuario validarLogin(String login, String senha) {
        return usuarioRepository.findByLoginAndSenha(login, senha).orElse(null);
    }
    
    public boolean enviarSenhaPorEmail(String email) {
        var usuarioOpt = usuarioRepository.findByEmail(email);
        if (usuarioOpt.isEmpty()) {
            return false;
        }
        var usuario = usuarioOpt.get();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(mailFrom);
        message.setTo(email);
        message.setSubject("Recuperação de Senha - Sistema TCC");
        message.setText("Olá " + usuario.getNomeCompleto() + ",\n\nSua senha cadastrada é: " + usuario.getSenha() + "\n\nPor favor, altere sua senha após o login se desejar.");
        mailSender.send(message);
        return true;
    }

}
