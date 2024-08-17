package App.Controller;

import App.Financeiro.DTO.RelatorioAnualDTO;
import App.Financeiro.DTO.RelatorioDiarioDTO;
import App.Financeiro.DTO.RelatorioMensalDTO;
import App.Service.RelatorioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("relatorios")
@Tag(name = "relatorios",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class relatoriosController {

    private final RelatorioService service;

    public relatoriosController(RelatorioService service) {
        this.service = service;
    }


    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarRelatorioMensal")
    public ResponseEntity<List<RelatorioMensalDTO>> BuscarRelatorioMensal()
    { return service.BuscarRelatorioMensal();}

    @Operation(summary = "Lista Registros da tabela Por dia Atual", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarRelatorioMensalComParametros")
    public ResponseEntity<List<RelatorioMensalDTO>> BuscarRelatorioMensalComParametros(@RequestParam int mesReferencia,
                                                                                       @RequestParam int anoReferencia)
    { return service.BuscarRelatorioMensalComParametros(mesReferencia, anoReferencia);}

    @Operation(summary = "Lista Registros da tabela Por mês Atual", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarRelatorioAnual")
    public ResponseEntity<List<RelatorioAnualDTO>> BuscarRelatorioAnual()
    {return service.BuscarRelatorioPorAno();}


    @Operation(summary = "Lista Registros da tabela Por ano Atual", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarRelatorioAnualComParametros")
    public ResponseEntity<List<RelatorioAnualDTO>> BuscarRelatorioAnualComParametros(@RequestParam int anoReferencia)
    {return service.BuscarRelatorioAnualComParametros(anoReferencia);}

    @Operation(summary = "Lista Registros da tabela Por ano Atual", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarRelatorioDiario")
    public ResponseEntity<List<RelatorioDiarioDTO>> BuscarRelatorioDiario()
    { return service.BuscarRelatorioDiario();}

    @Operation(summary = "Lista Registros da tabela Por ano Atual", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarRelatorioDiarioComArgumento")
    public ResponseEntity<List<RelatorioDiarioDTO>> BuscarRelatorioDiarioComArgumento(int diaReferencia)
    { return service.BuscarRelatorioDiarioComArgumento(diaReferencia);}

    @Operation(summary = "Lista Registros da tabela Por ano Atual", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/BuscarRelatorioDiarioComArgumento")
    public void NovoLancamentoDebito(@RequestParam String empresa,
                                     @RequestParam String cnpj,
                                     @RequestParam Double valorBoleto,
                                     @RequestParam Double parcelas,
                                     @RequestParam int diaVencimento,
                                     @RequestParam Double carenciaPagamento)
    { }


}
