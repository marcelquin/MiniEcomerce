package App.Service;

import App.DTO.NotaFiscalDTO;
import App.Entity.FornecedorEntity;
import App.Entity.NotaFiscalEntity;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.IllegalActionException;
import App.Exceptions.NullargumentsException;
import App.Repository.FornecedorRepository;
import App.Repository.NotaFiscalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
public class NotaFiscalService {

    private final FornecedorRepository fornecedorRepository;

    private final NotaFiscalRepository notaFiscalRepository;

    public NotaFiscalService(FornecedorRepository fornecedorRepository, NotaFiscalRepository notaFiscalRepository) {
        this.fornecedorRepository = fornecedorRepository;
        this.notaFiscalRepository = notaFiscalRepository;
    }
    Locale localBrasil = new Locale("pt", "BR");

    public ResponseEntity<List<NotaFiscalEntity>>ListarNotasFiscais()
    {
        try
        {
            return new ResponseEntity<>(notaFiscalRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<NotaFiscalDTO>NovaNotaFiscal( String xml,
                                                        Double valor,
                                                        String cnpj)
    {
        try
        {
            if(xml != null &&
               valor != null &&
               cnpj != null )
            {
                if(valor < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                FornecedorEntity fornecedor = fornecedorRepository.findBycnpj(cnpj).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                NotaFiscalEntity notaFiscal = new NotaFiscalEntity();
                notaFiscal.setFornecedor(fornecedor);
                notaFiscal.setXml(xml);
                notaFiscal.setValor(valor);
                notaFiscal.setDataEntrada(LocalDateTime.now());
                notaFiscal.setTimeStamp(LocalDateTime.now());
                notaFiscal.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(notaFiscal.getValor()));
                notaFiscalRepository.save(notaFiscal);
                NotaFiscalDTO notaFiscalDTO = new NotaFiscalDTO(notaFiscal.getXml(),notaFiscal.getValor(),notaFiscal.getFornecedor().getRazaoSocial(),notaFiscal.getFornecedor().getCnpj());
                return new ResponseEntity<>(notaFiscalDTO, HttpStatus.CREATED);
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
