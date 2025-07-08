package TCC.TCC.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

import TCC.TCC.DTOs.FuncionarioDTO.AtualizarFuncionarioDTO;
import TCC.TCC.DTOs.FuncionarioDTO.CriarFuncionarioDTO;
import TCC.TCC.Entities.Funcionario;
import TCC.TCC.Repository.FuncionarioRepository;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public FuncionarioService(FuncionarioRepository repository){
        this.funcionarioRepository = repository;
    }

    public long criarFuncionario(CriarFuncionarioDTO dto){
        var entity = new Funcionario(dto.nomeFuncionario(), dto.emailFuncionario(), 
                                    dto.cpfFuncionario(), dto.celularFuncionario(), 
                                    dto.dataNascimentoFuncionario(), 
                                    dto.descricaoFuncionario(), true, dto.image());
                                    
        var funcionarioSalvo = funcionarioRepository.save(entity);
        return funcionarioSalvo.getFuncionarioId();
    }

    public Optional<Funcionario> pegarFuncionarioPeloId(long funcId){
        return funcionarioRepository.findById(funcId);
    }

    public List<Funcionario> listarFuncionario(){
        if(funcionarioRepository.count() <= 0) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Não há nenhum funcionário");
        return funcionarioRepository.findAll();
    }

    public void deletarFuncionario(long funcId){
        var funcExist = funcionarioRepository.existsById(funcId);

        if(funcExist){
            funcionarioRepository.deleteById(funcId);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item com id "+ funcId + " não encontrado");
        }
    }

    public ResponseEntity<String> atualizarFuncionarioPeloId(long funcId, AtualizarFuncionarioDTO dto) {
        var funcExist = funcionarioRepository.findById(funcId);
        
        if (funcExist.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Funcionário não encontrado");
        }

        var funcionario = funcExist.get();

        if (dto.nomeFuncionario() != null) {
            funcionario.setNomeFuncionario(dto.nomeFuncionario());
        }
        if (dto.celularFuncionario() != null) {
            funcionario.setCelularFuncionario(dto.celularFuncionario());
        }
        if (dto.ativo() != null) {
            funcionario.setAtivo(dto.ativo());
        }
        if (dto.cpfFuncionario() != null) {
            funcionario.setCpfFuncionario(dto.cpfFuncionario());
        }
        if (dto.emailFuncionario() != null) {
            funcionario.setEmailFuncionario(dto.emailFuncionario());
        }
        if (dto.dataNascimentoFuncionario() != null) {
            funcionario.setDataNascimentoFuncionario(dto.dataNascimentoFuncionario());
        }
        if (dto.descricaoFuncionario() != null) {
            funcionario.setDescricaoFuncionario(dto.descricaoFuncionario());
        }

        funcionarioRepository.save(funcionario);
        return ResponseEntity.ok("Funcionário atualizado com sucesso");
    }

}
