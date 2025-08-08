package TCC.TCC.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TCC.TCC.DTOs.ItemDTO.AtualizarItemDTO;
import TCC.TCC.DTOs.ItemDTO.CriarItemDTO;
import TCC.TCC.Entities.*;
import TCC.TCC.Exceptions.ItemsException.ItemNaoEncontradoException;
import TCC.TCC.Exceptions.ItemsException.QuantidadeInvalida;
import TCC.TCC.Repository.*;

@Service
public class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository){
        this.itemRepository = itemRepository;
    }

    public long criarItem(CriarItemDTO criarItemDTO, Usuario usuario){

        if(criarItemDTO.quantidade() < 0){
            throw new QuantidadeInvalida(criarItemDTO.quantidade());
        }

        Item entity = new Item(criarItemDTO.nomeItem(), criarItemDTO.quantidade(),  
                                criarItemDTO.imagem(), criarItemDTO.descricao());
        
        entity.setCriadoPor(usuario);

        Item itemSalvo = itemRepository.save(entity);

        return itemSalvo.getItemId();
    }

    public Item pegarItemPeloId(long itemId){
        var item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNaoEncontradoException(itemId));

        if (!item.getAtivo()) {
            throw new ItemNaoEncontradoException(itemId);
        }

        return item;
    }

    public List<Item> buscarPorNome(String nome) {
        return itemRepository.buscarPorNome(nome);
    }

    public List<Item> listarItems(Usuario usuario){
        var itens = itemRepository.findByCriadoPorAndAtivoTrue(usuario);
        
        if (itens.isEmpty()) {
            throw new ItemNaoEncontradoException("Nenhum item ativo encontrado para este usuário");
        }

        return itens;
    }

    public void deletarItem(long itemId){
        var item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNaoEncontradoException(itemId));

        item.setAtivo(false);
        itemRepository.save(item);
    }

    public Item AtualizarItemPorId(long itemId, AtualizarItemDTO atualizarItemDTO) {
        var itemExiste = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemNaoEncontradoException(itemId));
    
        if (atualizarItemDTO.quantidade() != null && atualizarItemDTO.quantidade() < 0) {
            throw new QuantidadeInvalida(atualizarItemDTO.quantidade());
        }

        if (atualizarItemDTO.nomeItem() != null) {
            itemExiste.setNomeItem(atualizarItemDTO.nomeItem());
        }
        if (atualizarItemDTO.quantidade() != null) {
            itemExiste.setQuantidade(atualizarItemDTO.quantidade());
        }
    
        if (atualizarItemDTO.descricao() != null) {
            itemExiste.setDescricao(atualizarItemDTO.descricao());
        }
    
        if (atualizarItemDTO.imagem() != null) {
            itemExiste.setImagem(atualizarItemDTO.imagem());
        }
    
        itemRepository.save(itemExiste);
        return itemExiste;
    }
    

    public Item buscarItemPorNome(String nomeItem){
        return itemRepository.findBynomeItemIgnoreCase(nomeItem)
                .orElseThrow(() -> new ItemNaoEncontradoException(nomeItem));
    }
}
