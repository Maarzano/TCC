package TCC.TCC.DTOs.ItemDTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = false)
public record AtualizarItemDTO ( 
    String nomeItem,
    Integer quantidade,
    String imagem,
    String descricao) { }
