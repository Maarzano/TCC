package TCC.TCC.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TCC.TCC.DTOs.AtualizarFuncionarioDTO;
import TCC.TCC.DTOs.CriarUsuarioDTO;
import TCC.TCC.Entities.Usuario;
import TCC.TCC.Service.UsuarioService;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/v1/Usuarios")
public class UsuarioController {
    private UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;

    }

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody CriarUsuarioDTO entity) {
        var userId = usuarioService.criarUsuario(entity);
        return ResponseEntity.created(URI.create("/v1/Usuarios/" + userId)).build();
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
    public ResponseEntity<Void> ApagarUsuario(@PathVariable("userId") Long userId){
        usuarioService.DeletarUsuario(userId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{userId}")
    public ResponseEntity<Void> AtualiazarusuarioPorId(@PathVariable("userId") Long userId, @RequestBody AtualizarFuncionarioDTO atualizarFuncionarioDTO) {
        
        usuarioService.AtualiazarusuarioPorId(userId, atualizarFuncionarioDTO);
        return ResponseEntity.noContent().build();
    }
    

}
