package TCC.TCC.DTOs.MovimentacaoDTO;

import java.util.List;

import TCC.TCC.DTOs.ItemDTO.ItemQuantidadeDTO;
import TCC.TCC.Entities.Enum.TipoMovimentacao;

public record CriarMovimentacaoDTO(
    Long funcionarioId,
    TipoMovimentacao tipoMovimentacao,
    List<ItemQuantidadeDTO> itens
) {}