package App.Service;

import App.DTO.FornecedorDTO;
import App.Entity.ContatoEntity;
import App.Entity.FornecedorEntity;
import App.Exceptions.EntityNotFoundException;
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

    public ResponseEntity<FornecedorDTO> BuscarFornecedorPorId(Long id)
    {
        try
        {
            if(id != null)
            {
                FornecedorEntity entity = fornecedorRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                FornecedorDTO response = new FornecedorDTO(entity.getNome(), entity.getRazaoSocial(), entity.getCnpj(),
                        entity.getCep(), entity.getCidade(), entity.getEstado(), entity.getContato().getPrefixo(), entity.getContato().getTelefone(),entity.getContato().getEmail());
                return  new ResponseEntity<>(response, HttpStatus.OK);
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

    public ResponseEntity<FornecedorDTO> EditarFornecedor(Long id,
                                                          String nome,
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
            if(id != null &&
                    nome != null &&
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
                FornecedorEntity entity = fornecedorRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                ContatoEntity contato = contatoRepository.findById(entity.getContato().getId()).orElseThrow(
                        () -> new EntityNotFoundException()
                );

                contato.setTimeStamp(LocalDateTime.now());
                contato.setEmail(email);
                contato.setPrefixo(prefixo);
                contato.setTelefone(telefone);
                contatoRepository.save(contato);
                entity.setNome(nome);
                entity.setRazaoSocial(razaoSocial);
                entity.setCnpj(cnpj);
                entity.setDataInicioContrato(dataInicioContrato);
                entity.setCep(cep);
                entity.setCidade(cidade);
                entity.setEstado(estado);
                entity.setTimeStamp(LocalDateTime.now());;
                fornecedorRepository.save(entity);
                FornecedorDTO response = new FornecedorDTO(entity.getNome(), entity.getRazaoSocial(), entity.getCnpj(), entity.getCep(), entity.getCidade(), entity.getEstado(), entity.getContato().getPrefixo(), entity.getContato().getTelefone(), entity.getContato().getEmail());
                return new ResponseEntity<>(response, HttpStatus.OK);
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
