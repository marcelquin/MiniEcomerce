package App.Service;

import App.Entity.EstoqueEntity;
import App.Repository.EstoqueRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstoqueService {


    private final EstoqueRepository estoqueRepository;

    public EstoqueService(EstoqueRepository estoqueRepository) {
        this.estoqueRepository = estoqueRepository;
    }


    public ResponseEntity<List<EstoqueEntity>> ListarEstoque()
    {
        try
        {
            return new ResponseEntity<>(estoqueRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }
}
