package App.Service;

import App.DTO.ClienteDTO;
import App.Entity.ClienteEntity;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.NullargumentsException;
import App.Repository.ClienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public ResponseEntity<List<ClienteEntity>> ListarClientes()
    {
        try
        {
            return new ResponseEntity<>(clienteRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ClienteDTO> NovoCliente(String nome,
                                                  String endereco,
                                                  Long prefixo,
                                                  Long telefone)
    {
        try
        {
            if(nome != null &&
               endereco != null &&
               prefixo != null && prefixo > 0 &&
               telefone != null && telefone > 0)
            {
                ClienteDTO response = new ClienteDTO(nome,endereco,prefixo,telefone);

                ClienteEntity entity = new ClienteEntity(response);
                entity.setTimeStamp(LocalDateTime.now());
                clienteRepository.save(entity);
                return new ResponseEntity<>(response, HttpStatus.CREATED);
            }
            else
            { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ClienteDTO> EdiarCliente(String nome,
                                                   String endereco,
                                                   Long prefixo,
                                                   Long telefone)
    {
        try
        {
            if(nome != null &&
               endereco != null &&
               prefixo != null && prefixo > 0 &&
               telefone != null && telefone > 0)
            {
                ClienteEntity entity = clienteRepository.findBynome(nome).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                entity.setNome(nome);
                entity.setEndereco(endereco);
                entity.setPrefixo(prefixo);
                entity.setTelefone(telefone);
                entity.setTimeStamp(LocalDateTime.now());
                clienteRepository.save(entity);
                ClienteDTO response = new ClienteDTO(entity.getNome(),entity.getEndereco(),entity.getPrefixo(), entity.getTelefone());

                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            else
            { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ClienteDTO> DeletarCliente(String nome)
    {
        try
        {
            if(nome != null)
            {
                ClienteEntity entity = clienteRepository.findBynome(nome).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                clienteRepository.deleteById(entity.getId());

                return new ResponseEntity<>(HttpStatus.OK);
            }
            else
            { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

}
