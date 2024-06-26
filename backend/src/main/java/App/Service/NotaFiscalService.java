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
import java.util.ArrayList;
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

    public ResponseEntity<List<NotaFiscalEntity>>ListarNotasFiscaisNaoFatorada()
    {
        try
        {
            List<NotaFiscalEntity> notaFiscalEntities = notaFiscalRepository.findAll();
            List<NotaFiscalEntity> result = new ArrayList<>();
            for(NotaFiscalEntity nota : notaFiscalEntities)
            {
                if(nota.getNotaNaturada() == false)
                {
                    result.add(nota);
                }
            }

            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<NotaFiscalDTO> BuscaNotaPorId(Long id)
    {
        try
        {
            if(id != null)
            {
                NotaFiscalEntity entity = notaFiscalRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                NotaFiscalDTO response = new NotaFiscalDTO(entity.getXml(), entity.getValor(), entity.getFornecedor().getRazaoSocial(), entity.getFornecedor().getCnpj());
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

    public ResponseEntity<NotaFiscalDTO>NovaNotaFiscal( String xml,
                                                        Double valor,
                                                        Long fornecedorId)
    {
        try
        {
            if(xml != null &&
               valor != null &&
               fornecedorId != null )
            {
                if(valor < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                FornecedorEntity fornecedor = fornecedorRepository.findById(fornecedorId).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                NotaFiscalEntity notaFiscal = new NotaFiscalEntity();
                notaFiscal.setFornecedor(fornecedor);
                notaFiscal.setXml(xml);
                notaFiscal.setValor(valor);
                notaFiscal.setValorFatorado(0.0);
                notaFiscal.setNotaNaturada(false);
                notaFiscal.setDataEntrada(LocalDateTime.now());
                notaFiscal.setTimeStamp(LocalDateTime.now());
                notaFiscal.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(notaFiscal.getValor()));
                notaFiscal.setValorFatoradoFront(NumberFormat.getCurrencyInstance(localBrasil).format(notaFiscal.getValorFatorado()));

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

    public ResponseEntity<NotaFiscalDTO>EditarNotaFiscal( Long id,
                                                        String xml,
                                                        Double valor,
                                                        Long fornecedorId)
    {
        try
        {
            if(id != null &&
                    xml != null &&
                    valor != null &&
                    fornecedorId != null )
            {
                if(valor < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                NotaFiscalEntity notaFiscal = notaFiscalRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );

                FornecedorEntity fornecedor = fornecedorRepository.findById(fornecedorId).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
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
