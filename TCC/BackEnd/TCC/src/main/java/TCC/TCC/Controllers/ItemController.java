package TCC.TCC.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import TCC.TCC.DTOs.ItemDTO.AtualizarItemDTO;
import TCC.TCC.DTOs.ItemDTO.CriarItemDTO;
import TCC.TCC.Entities.Item;
import TCC.TCC.Entities.Usuario;
import TCC.TCC.Service.ItemService;
import TCC.TCC.Service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/v1/Items")
public class ItemController {
    private ItemService itemService;

    @Autowired
    private UsuarioService usuarioService;

    public ItemController(ItemService itemService){
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity<?> criarItem(@Valid @RequestBody CriarItemDTO entity, @AuthenticationPrincipal Jwt jwt) {

        String email = jwt.getSubject();
        Usuario usuario = usuarioService.buscarPorEmail(email);

        var itemId = itemService.criarItem(entity, usuario);

        return ResponseEntity.created(URI.create("/v1/Items/" + itemId))
                .body(itemService.pegarItemPeloId(itemId));
    }

    @GetMapping("/{itemId}")
    public Item pegarItemPeloId(@PathVariable("itemId") long itemId) {
        return  itemService.pegarItemPeloId(itemId);
    }

    @GetMapping
    public ResponseEntity<List<Item>> ListarItems(@AuthenticationPrincipal Jwt jwt) {
        String email = jwt.getSubject();
        Usuario usuario = usuarioService.buscarPorEmail(email);
        
        var items = itemService.listarItems(usuario);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/buscar/{nomeItem}")
    public ResponseEntity<?> buscarItemPorNome(@PathVariable("nomeItem") String nomeItem) {
            return ResponseEntity.ok(itemService.buscarItemPorNome(nomeItem));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> apagarItemPorId(@PathVariable("itemId")long itemId){
        itemService.deletarItem(itemId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{itemId}")
    public ResponseEntity<?> AtualiazarItemPorId(@PathVariable("itemId") long itemId, @RequestBody AtualizarItemDTO atualizarItemDTO) {
        itemService.AtualizarItemPorId(itemId, atualizarItemDTO);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Buscar itens por nome (parcial ou completo)", description = "Retorna uma lista de itens que contenham o nome informado, sem diferenciar maiúsculas e minúsculas.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Itens encontrados com sucesso"),
        @ApiResponse(responseCode = "400", description = "Parâmetro de nome inválido")
    })
    @GetMapping("/buscar")
    public List<Item> buscarItensPorNome(@RequestParam String nome) {
        return itemService.buscarPorNome(nome);
    }

}
