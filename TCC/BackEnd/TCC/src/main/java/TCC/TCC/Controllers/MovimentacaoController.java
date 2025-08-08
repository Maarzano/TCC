package TCC.TCC.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import TCC.TCC.DTOs.MovimentacaoDTO.CriarMovimentacaoDTO;
import TCC.TCC.DTOs.MovimentacaoDTO.DetalhesMovimentacaoDTO;
import TCC.TCC.Entities.Usuario;
import TCC.TCC.Service.MovimentacaoService;
import TCC.TCC.Service.UsuarioService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/v1/movimentacoes")
@RequiredArgsConstructor
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<DetalhesMovimentacaoDTO> criarMovimentacao(@RequestBody CriarMovimentacaoDTO dto, @AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        Usuario usuario = usuarioService.buscarPorEmail(email);

        return ResponseEntity.ok(movimentacaoService.criarMovimentacao(dto, usuario));
    }

    @GetMapping
    public ResponseEntity<List<DetalhesMovimentacaoDTO>> listarMovimentacoes(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        Usuario usuario = usuarioService.buscarPorEmail(email);
        return ResponseEntity.ok(movimentacaoService.listarMovimentacoes(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarMovimentacao(@PathVariable("id") Long id) {
        movimentacaoService.deletarMovimentacao(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/movimentacoes/{id}/concluir")
    public ResponseEntity<String> concluirMovimentacao(@PathVariable Long id) {
    movimentacaoService.concluirMovimentacao(id);
    return ResponseEntity.ok("Movimentação concluída com sucesso.");
}
}
