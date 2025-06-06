package TCC.TCC.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.stream.Collectors;

import TCC.TCC.DTOs.MovimentacaoDTO.AtualizarMovimentacaoDTo;
import TCC.TCC.DTOs.MovimentacaoDTO.CriarMovimentacaoDTO;
import TCC.TCC.DTOs.MovimentacaoDTO.DetalhesMovimentacaoDTO;
import TCC.TCC.Entities.Funcionario;
import TCC.TCC.Entities.Item;
import TCC.TCC.Entities.Movimentacao;
import TCC.TCC.Entities.Enum.StatusMovimentacao;
import TCC.TCC.Repository.FuncionarioRepository;
import TCC.TCC.Repository.ItemRepository;
import TCC.TCC.Repository.MovimentacaoRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;
    private final ItemRepository itemRepository;
    private final FuncionarioRepository funcionarioRepository;

    @Transactional
    public DetalhesMovimentacaoDTO criarMovimentacao(CriarMovimentacaoDTO dto) {
        Item item = itemRepository.findById(dto.itemId())
            .orElseThrow(() -> new RuntimeException("Item não encontrado"));

        Funcionario funcionario = funcionarioRepository.findById(dto.funcionarioId())
            .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

        Movimentacao movimentacao = new Movimentacao(
            item,
            funcionario,
            dto.quantidade(),
            dto.tipoMovimentacao(), StatusMovimentacao.PENDENTE,
            null
        );

        movimentacao = movimentacaoRepository.save(movimentacao);

        return new DetalhesMovimentacaoDTO(
            movimentacao.getIdMovimentacao(),
            movimentacao.getItem().getItemId(),
            movimentacao.getFuncionario().getFuncionarioId(),
            movimentacao.getQuantidade(),
            movimentacao.getTipoMovimentacao(),
            movimentacao.getStatusMovimentacao(),
            movimentacao.getDataMovimentacao()
        );
    }

    public void concluirMovimentacao(Long id) {
        Movimentacao movimentacao = movimentacaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Movimentação não encontrada com ID: " + id));

        if (movimentacao.getStatusMovimentacao() != StatusMovimentacao.PENDENTE) {
            throw new IllegalStateException("Apenas movimentações com status PENDENTE podem ser concluídas.");
        }
        movimentacao.setStatusMovimentacao(StatusMovimentacao.CONCLUIDO);
        movimentacaoRepository.save(movimentacao);
    }

    public List<DetalhesMovimentacaoDTO> listarMovimentacoes() {
        return movimentacaoRepository.findAll().stream().map(mov -> 
            new DetalhesMovimentacaoDTO(
                mov.getIdMovimentacao(),
                mov.getItem().getItemId(),
                mov.getFuncionario().getFuncionarioId(),
                mov.getQuantidade(),
                mov.getTipoMovimentacao(),
                mov.getStatusMovimentacao(),
                mov.getDataMovimentacao()
            )
        ).collect(Collectors.toList());
    }

    @Transactional
    public DetalhesMovimentacaoDTO atualizarMovimentacao(Long id, AtualizarMovimentacaoDTo dto) {
        
        Movimentacao movimentacao = movimentacaoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Movimentação não encontrada"));

        movimentacao.setQuantidade(dto.quantidade());
        movimentacao.setTipoMovimentacao(dto.tipoMovimentacao());

        movimentacao = movimentacaoRepository.save(movimentacao);

        return new DetalhesMovimentacaoDTO(
            movimentacao.getIdMovimentacao(),
            movimentacao.getItem().getItemId(),
            movimentacao.getFuncionario().getFuncionarioId(),
            movimentacao.getQuantidade(),
            movimentacao.getTipoMovimentacao(),
            movimentacao.getStatusMovimentacao(),
            movimentacao.getDataMovimentacao()
        );
    }

    @Transactional
    public void deletarMovimentacao(Long id) {
        if (!movimentacaoRepository.existsById(id)) {
            throw new RuntimeException("Movimentação não encontrada");
        }
        movimentacaoRepository.deleteById(id);
    }
}
