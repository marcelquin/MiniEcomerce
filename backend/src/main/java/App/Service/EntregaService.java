package App.Service;

import App.DTO.EntregaDTO;
import App.Entity.EntregaEntity;
import App.Entity.PedidoEntity;
import App.Enum.STATUSENTREGA;
import App.Repository.EntregaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EntregaService {

    private final EntregaRepository entregaRepository;

    public EntregaService(EntregaRepository entregaRepository) {
        this.entregaRepository = entregaRepository;
    }

    public ResponseEntity<List<EntregaEntity>> ListarEntregas()
    {
        try
        {
            return new ResponseEntity<>(entregaRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<List<EntregaEntity>> ListarEntregasEmAberto()
    {
        try
        {
            List<EntregaEntity> response = new ArrayList<>();
            List<EntregaEntity> resultado = entregaRepository.findAll();
            for(EntregaEntity item: resultado)
            {
                if(item.getStatusEntrega() != STATUSENTREGA.ENTREGUE)
                {
                    response.add(item);
                }
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<EntregaDTO> IniciarEntrega()
    { return null;}

    public ResponseEntity<EntregaDTO> FinalizarEntrega()
    { return null;}

}
