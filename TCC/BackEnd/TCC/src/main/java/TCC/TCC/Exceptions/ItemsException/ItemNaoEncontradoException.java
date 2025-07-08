package TCC.TCC.Exceptions.ItemsException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ItemNaoEncontradoException extends RuntimeException{
    public ItemNaoEncontradoException(long id){
        super("Item com ID " + id + " não encontrado");
    }
    public ItemNaoEncontradoException(String texto){
        super(texto);
    }
}
