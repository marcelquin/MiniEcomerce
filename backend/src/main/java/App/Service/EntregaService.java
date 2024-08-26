package App.Service;

import App.DTO.EntregaDTO;
import App.Entity.EntregaEntity;
import App.Entity.PedidoEntity;
import App.Enum.STATUSENTREGA;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.NullargumentsException;
import App.Repository.EntregaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
                if(item.getStatusEntrega() != STATUSENTREGA.ENTREGUE &&
                   item.getStatusEntrega() != STATUSENTREGA.CANCELADA )
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

    public ResponseEntity<EntregaDTO> BuscarEntregaPorId(Long id)
    {
        try
        {
            EntregaEntity entity = entregaRepository.findById(id).orElseThrow(
                    ()-> new EntityNotFoundException()
            );
            EntregaDTO response = new EntregaDTO(entity.getNomeCliente(),
                                                entity.getEnderecoEntrega(),
                                                entity.getTelefoneContato(),
                                                entity.getProdutos(),
                                                entity.getStatusEntrega());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }


    public void IniciarEntrega(Long id)
    {
        try
        {
            if(id != null)
            {
                EntregaEntity entrega = entregaRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                if(entrega.getStatusEntrega() == STATUSENTREGA.AGUARDANDO &&
                        entrega.getStatusEntrega() != STATUSENTREGA.EM_ROTA &&
                        entrega.getStatusEntrega() != STATUSENTREGA.ENTREGUE)
                {
                    entrega.setDataEntrega(LocalDateTime.now());
                    entrega.setTimeStamp(LocalDateTime.now());
                    entrega.setStatusEntrega(STATUSENTREGA.EM_ROTA);
                    entregaRepository.save(entrega);
                }
            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }

    public void FinalizarEntrega(Long id)
    {
        try
        {
            if(id != null)
            {
                EntregaEntity entrega = entregaRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                if(entrega.getStatusEntrega() != STATUSENTREGA.AGUARDANDO &&
                   entrega.getStatusEntrega() == STATUSENTREGA.EM_ROTA &&
                   entrega.getStatusEntrega() != STATUSENTREGA.ENTREGUE)
                {
                    entrega.setDataEntrega(LocalDateTime.now());
                    entrega.setTimeStamp(LocalDateTime.now());
                    entrega.setStatusEntrega(STATUSENTREGA.ENTREGUE);
                    entregaRepository.save(entrega);
                }
            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }

    public void CancelarEntrega(Long id, String motivo)
    {
        try
        {
            if(id != null)
            {
                EntregaEntity entrega = entregaRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                    entrega.setDataEntrega(LocalDateTime.now());
                    entrega.setTimeStamp(LocalDateTime.now());
                    entrega.setStatusEntrega(STATUSENTREGA.CANCELADA);
                    entrega.setNotificacao(motivo);
                    entregaRepository.save(entrega);
                }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }

    public void ReiniciarEntrega(Long id, String motivo)
    {
        try
        {
            if(id != null)
            {
                EntregaEntity entrega = entregaRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                entrega.setDataEntrega(LocalDateTime.now());
                entrega.setTimeStamp(LocalDateTime.now());
                entrega.setStatusEntrega(STATUSENTREGA.AGUARDANDO);
                entrega.setNotificacao(motivo);
                entregaRepository.save(entrega);
            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }
}
