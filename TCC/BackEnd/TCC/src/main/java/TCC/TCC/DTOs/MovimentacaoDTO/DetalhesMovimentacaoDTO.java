package TCC.TCC.DTOs.MovimentacaoDTO;

import java.time.Instant;
import java.util.List;

import TCC.TCC.DTOs.ItemDTO.ItemMovimentadoDTO;
import TCC.TCC.Entities.Funcionario;
import TCC.TCC.Entities.Enum.*;

public record DetalhesMovimentacaoDTO(
    Long idMovimentacao,
    Funcionario funcionario,
    TipoMovimentacao tipoMovimentacao,
    List<ItemMovimentadoDTO> itens,
    Instant dataMovimentacao
) {}