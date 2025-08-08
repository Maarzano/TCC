package TCC.TCC.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TCC.TCC.DTOs.FuncionarioDTO.AtualizarFuncionarioDTO;
import TCC.TCC.DTOs.FuncionarioDTO.CriarFuncionarioDTO;
import TCC.TCC.Entities.Funcionario;
import TCC.TCC.Entities.Usuario;
import TCC.TCC.Service.FuncionarioService;
import TCC.TCC.Service.UsuarioService;
import jakarta.validation.Valid;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/v1/Funcionarios")
public class FuncionarioController {
    private FuncionarioService funcService;

    @Autowired
    private UsuarioService usuarioService;

    public FuncionarioController(FuncionarioService funcService){
        this.funcService = funcService;
    }

    @PostMapping
    public ResponseEntity<Funcionario> criarFuncionario(@Valid @RequestBody CriarFuncionarioDTO entity, @AuthenticationPrincipal Jwt jwt){

        String email = jwt.getSubject();
        Usuario usuario = usuarioService.buscarPorEmail(email);

        var funcId = funcService.criarFuncionario(entity, usuario);
        return ResponseEntity.created(URI.create("/v1/Funcionarios/" + funcId))
        .body(funcService.pegarFuncionarioPeloId(funcId).orElseThrow(()-> new RuntimeException("Funcionário não encontrado")));
    }

    @GetMapping("/{funcId}")
    public ResponseEntity<Funcionario> pegarFuncionarioPeloId(@PathVariable("funcId") long funcId){
        var funcionario = funcService.pegarFuncionarioPeloId(funcId);
        return funcionario.map(ResponseEntity::ok).orElseGet(()-> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Funcionario>> listarFuncionarios(@AuthenticationPrincipal Jwt jwt){
        String email = jwt.getSubject();
        Usuario usuario = usuarioService.buscarPorEmail(email);

        var funcionarios = funcService.listarFuncionario(usuario);
        return ResponseEntity.ok(funcionarios);
    }

    @DeleteMapping("/{funcId}")
    public ResponseEntity<Void> deletarFuncionarioPorId(@Valid @PathVariable("funcId") long funcId){
        funcService.deletarFuncionario(funcId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{funcId}")
    public ResponseEntity<Void> atualiazarFuncionarioPorId(@Valid @PathVariable("funcId") long funcId, @RequestBody AtualizarFuncionarioDTO dto){
        funcService.atualizarFuncionarioPeloId(funcId, dto);
        return ResponseEntity.noContent().build();
    }

    
    
}
