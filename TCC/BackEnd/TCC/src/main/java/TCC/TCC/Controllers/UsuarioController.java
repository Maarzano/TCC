package TCC.TCC.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TCC.TCC.DTOs.UsuarioDTO.AtualizarUsuarioDTO;
import TCC.TCC.DTOs.UsuarioDTO.CriarUsuarioDTO;
import TCC.TCC.DTOs.UsuarioDTO.LoginDTO;
import TCC.TCC.Entities.Usuario;
import TCC.TCC.Service.UsuarioService;
import jakarta.validation.Valid;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/v1/Usuarios")
public class UsuarioController {
    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;

    }

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@Valid @RequestBody CriarUsuarioDTO entity) {
        var userId = usuarioService.criarUsuario(entity);
        return ResponseEntity.created(URI.create("/v1/Usuarios/" + userId))
    .body(usuarioService.pegarUsuarioPeloID(userId).orElseThrow(() -> new RuntimeException("Usuário não encontrado")));

    }

    @GetMapping("/{userID}")
    public ResponseEntity<Usuario> pegarUsuarioPeloID(@PathVariable("userID") Long userID) {
        var usuario = usuarioService.pegarUsuarioPeloID(userID);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> ListarUsuarios() {
        var usuarios = usuarioService.listarUsuarios();

        return ResponseEntity.ok(usuarios);
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> ApagarUsuario(@PathVariable("userId") long userId){
        usuarioService.DeletarUsuario(userId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{userId}")
    public ResponseEntity<Void> AtualiazarUsuarioPorId(@PathVariable("userId") long userId, @RequestBody AtualizarUsuarioDTO atualizarUsuarioDTO) {
        
        usuarioService.AtualiazarUsuarioPorId(userId, atualizarUsuarioDTO);
        return ResponseEntity.noContent().build();
    
    }

    //login

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        Usuario usuario = usuarioService.validarLogin(loginDTO.login(), loginDTO.senha());

        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(401).body("Usuário ou senha inválidos.");
        }
    }

}
