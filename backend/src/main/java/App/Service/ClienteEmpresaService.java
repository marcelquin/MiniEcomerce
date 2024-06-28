package App.Service;

import App.DTO.EmpresaDTO;
import App.DTO.EnderecoDTO;
import App.Entity.ClienteEmpresaEntity;
import App.Entity.ContatoEntity;
import App.Entity.EmpresaEntity;
import App.Entity.EnderecoEntity;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.NullargumentsException;
import App.Repository.ClienteEmpresaRepository;
import App.Repository.ContatoRepository;
import App.Repository.EnderecoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClienteEmpresaService {

    private final ClienteEmpresaRepository empresaRepository;
    private final EnderecoRepository enderecoRepository;
    private final ContatoRepository contatoRepository;

    public ClienteEmpresaService(ClienteEmpresaRepository empresaRepository, EnderecoRepository enderecoRepository, ContatoRepository contatoRepository) {
        this.empresaRepository = empresaRepository;
        this.enderecoRepository = enderecoRepository;
        this.contatoRepository = contatoRepository;
    }



    public ResponseEntity<List<ClienteEmpresaEntity>> ListarClienteEmpresa()
    {
        try
        {
            return new ResponseEntity<>(empresaRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }


    public ResponseEntity<EmpresaDTO> BuscarClienteEmpresaPorId(Long id)
    {
        try
        {
            if(id != null)
            {
                ClienteEmpresaEntity entity = empresaRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                EmpresaDTO response = new EmpresaDTO(entity.getNome(),
                                                        entity.getRazaoSocial(),
                                                        entity.getCnpj(),
                                                        entity.getAreaAtuacao(),
                                                        entity.getEndereco().getLogradouro(),
                                                        entity.getEndereco().getNumero(),
                                                        entity.getEndereco().getBairro(),
                                                        entity.getEndereco().getReferencia(),
                                                        entity.getEndereco().getCep(),
                                                        entity.getEndereco().getCidade(),
                                                        entity.getEndereco().getEstado(),
                                                        entity.getContato().getPrefixo(),
                                                        entity.getContato().getTelefone(),
                                                        entity.getContato().getEmail());
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

    public ResponseEntity<EmpresaDTO> NovaClienteEmpresa(String nome,
                                                  String razaoSocial,
                                                  String cnpj,
                                                  String areaAtuacao,
                                                  String logradouro,
                                                  String numero,
                                                  String bairro,
                                                  String referencia,
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
               logradouro != null &&
               numero != null &&
               bairro != null &&
               cep != null &&
               cidade != null &&
               estado != null &&
               prefixo != null &&
               telefone != null &&
               email != null)
            {
                EnderecoDTO enderecoDTO = new EnderecoDTO(logradouro,numero,bairro,referencia,cep,cidade,estado);
                EnderecoEntity endereco = new EnderecoEntity(enderecoDTO);
                endereco.setTimeStamp(LocalDateTime.now());

                ContatoEntity contato = new ContatoEntity();
                contato.setPrefixo(prefixo);
                contato.setTelefone(telefone);
                contato.setEmail(email);
                contato.setTimeStamp(LocalDateTime.now());

                ClienteEmpresaEntity entity = new ClienteEmpresaEntity();
                entity.setNome(nome);
                entity.setRazaoSocial(razaoSocial);
                entity.setCnpj(cnpj);
                entity.setAreaAtuacao(areaAtuacao);
                entity.setTimeStamp(LocalDateTime.now());
                contatoRepository.save(contato);
                enderecoRepository.save(endereco);
                entity.setContato(contato);
                entity.setEndereco(endereco);
                empresaRepository.save(entity);
                EmpresaDTO response = new EmpresaDTO(entity.getNome(),
                                                    entity.getRazaoSocial(),
                                                    entity.getCnpj(),
                                                    entity.getAreaAtuacao(),
                                                    entity.getEndereco().getLogradouro(),
                                                    entity.getEndereco().getNumero(),
                                                    entity.getEndereco().getBairro(),
                                                    entity.getEndereco().getReferencia(),
                                                    entity.getEndereco().getCep(),
                                                    entity.getEndereco().getCidade(),
                                                    entity.getEndereco().getEstado(),
                                                    entity.getContato().getPrefixo(),
                                                    entity.getContato().getTelefone(),
                                                    entity.getContato().getEmail());
                return  new ResponseEntity<>(response, HttpStatus.CREATED);
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


    public ResponseEntity<EmpresaDTO> EditarClienteEmpresa(Long id,
                                                  String nome,
                                                  String razaoSocial,
                                                  String cnpj,
                                                  String areaAtuacao,
                                                  String logradouro,
                                                  String numero,
                                                  String bairro,
                                                  String referencia,
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
               logradouro != null &&
               numero != null &&
               bairro != null &&
               cep != null &&
               cidade != null &&
               estado != null &&
               prefixo != null &&
               telefone != null &&
               email != null)
            {
                ClienteEmpresaEntity entity = empresaRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                EnderecoEntity endereco = enderecoRepository.findById(entity.getEndereco().getId()).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                ContatoEntity contato = contatoRepository.findById(entity.getContato().getId()).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                endereco.setLogradouro(logradouro);
                endereco.setNumero(numero);
                endereco.setBairro(bairro);
                endereco.setReferencia(referencia);
                endereco.setCep(cep);
                endereco.setCidade(cidade);
                endereco.setEstado(estado);
                endereco.setTimeStamp(LocalDateTime.now());
                enderecoRepository.save(endereco);
                contato.setPrefixo(prefixo);
                contato.setTelefone(telefone);
                contato.setEmail(email);
                contato.setTimeStamp(LocalDateTime.now());
                contatoRepository.save(contato);
                endereco.setTimeStamp(LocalDateTime.now());
                entity.setNome(nome);
                entity.setRazaoSocial(razaoSocial);
                entity.setCnpj(cnpj);
                entity.setAreaAtuacao(areaAtuacao);
                entity.setTimeStamp(LocalDateTime.now());
                entity.setContato(contato);
                entity.setEndereco(endereco);
                empresaRepository.save(entity);
                EmpresaDTO response = new EmpresaDTO(entity.getNome(),
                                                    entity.getRazaoSocial(),
                                                    entity.getCnpj(),
                                                    entity.getAreaAtuacao(),
                                                    entity.getEndereco().getLogradouro(),
                                                    entity.getEndereco().getNumero(),
                                                    entity.getEndereco().getBairro(),
                                                    entity.getEndereco().getReferencia(),
                                                    entity.getEndereco().getCep(),
                                                    entity.getEndereco().getCidade(),
                                                    entity.getEndereco().getEstado(),
                                                    entity.getContato().getPrefixo(),
                                                    entity.getContato().getTelefone(),
                                                    entity.getContato().getEmail());
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

}
