package App.Service;

import App.DTO.FornecedorDTO;
import App.Entity.ContatoEntity;
import App.Entity.FornecedorEntity;
import App.Exceptions.NullargumentsException;
import App.Repository.ContatoRepository;
import App.Repository.FornecedorRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class FornecedorService {

    private final FornecedorRepository fornecedorRepository;
    private final ContatoRepository contatoRepository;

    public FornecedorService(FornecedorRepository fornecedorRepository, ContatoRepository contatoRepository) {
        this.fornecedorRepository = fornecedorRepository;
        this.contatoRepository = contatoRepository;
    }

    public ResponseEntity<List<FornecedorEntity>> ListarFornecedor()
    {
        try
        {
            return new ResponseEntity<>(fornecedorRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<FornecedorDTO> NovoFornecedor(String nome,
                                           String razaoSocial,
                                           String cnpj,
                                           String areaAtuacao,
                                           LocalDate dataInicioContrato,
                                           Long cep,
                                           String cidade,
                                           String estado,
                                           Long prefixo,
                                           Long telefone,
                                           String email)
    {
        try
        {
            if(nome != null &&
               razaoSocial != null &&
               cnpj != null &&
               areaAtuacao != null &&
               dataInicioContrato != null &&
               cep != null &&
               cidade != null &&
               estado != null &&
               prefixo != null &&
               telefone != null &&
               email!= null)
            {
                FornecedorDTO fornecedorDTO = new FornecedorDTO(nome,razaoSocial,cnpj,cep,cidade,estado,prefixo,telefone,email);
                ContatoEntity contato = new ContatoEntity(fornecedorDTO);
                contato.setTimeStamp(LocalDateTime.now());
                FornecedorEntity fornecedor = new FornecedorEntity(fornecedorDTO);
                fornecedor.setTimeStamp(LocalDateTime.now());
                fornecedor.setDataInicioContrato(dataInicioContrato);
                fornecedor.setContato(contato);
                fornecedor.setAreaAtuacao(areaAtuacao);
                contatoRepository.save(contato);
                fornecedorRepository.save(fornecedor);
                return new ResponseEntity<>(fornecedorDTO, HttpStatus.CREATED);
            }
            else
            {throw new NullargumentsException();}

        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

}
