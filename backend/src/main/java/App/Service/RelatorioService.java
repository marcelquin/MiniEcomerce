package App.Service;

import App.Financeiro.DTO.RelatorioAnualDTO;
import App.Financeiro.DTO.RelatorioDiarioDTO;
import App.Financeiro.DTO.RelatorioMensalDTO;
import App.Financeiro.Service.RelatorioMensalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Service
public class RelatorioService {

    private final RelatorioMensalService relatorioMsService;

    public RelatorioService(RelatorioMensalService relatorioMsService) {
        this.relatorioMsService = relatorioMsService;
    }


    public ResponseEntity<List<RelatorioMensalDTO>> BuscarRelatorioMensal()
    {
        try
        {
            List<RelatorioMensalDTO> response = new ArrayList<>();
            RelatorioMensalDTO dto = relatorioMsService.BuscarRelatorioMensal().getBody();
            response.add(dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }
    public ResponseEntity<List<RelatorioMensalDTO>> BuscarRelatorioMensalComParametros(@RequestParam int mesReferencia,
                                                                                       @RequestParam int anoReferencia)
    {
        try
        {
            List<RelatorioMensalDTO> response = new ArrayList<>();
            RelatorioMensalDTO dto = relatorioMsService.BuscarRelatorioMensalComParametros(mesReferencia, anoReferencia).getBody();
            response.add(dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<List<RelatorioAnualDTO>> BuscarRelatorioPorAno()
    {
        try
        {
            List<RelatorioAnualDTO> response = new ArrayList<>();
            RelatorioAnualDTO dto = relatorioMsService.BuscarRelatorioAnual().getBody();
            response.add(dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<List<RelatorioAnualDTO>> BuscarRelatorioAnualComParametros(@RequestParam int anoReferencia)
    {
        try
        {
            List<RelatorioAnualDTO> response = new ArrayList<>();
            RelatorioAnualDTO dto = relatorioMsService.BuscarRelatorioAnualComParametros(anoReferencia).getBody();
            response.add(dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<List<RelatorioDiarioDTO>> BuscarRelatorioDiario()
    {
        try
        {
            List<RelatorioDiarioDTO> response = new ArrayList<>();
            RelatorioDiarioDTO dto = relatorioMsService.BuscarRelatorioDiario().getBody();
            response.add(dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<List<RelatorioDiarioDTO>> BuscarRelatorioDiarioComArgumento(int diaReferencia)
    {
        try
        {
            List<RelatorioDiarioDTO> response = new ArrayList<>();
            RelatorioDiarioDTO dto = relatorioMsService.BuscarRelatorioDiarioComArgumento(diaReferencia).getBody();
            response.add(dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }
}
