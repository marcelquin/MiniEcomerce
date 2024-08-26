package App.Controller;

import App.Enum.FORMAPAGAMENTO;
import App.Financeiro.DTO.BoletosDTO;
import App.Financeiro.Service.RelatorioMensalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("debito")
@Tag(name = "debito",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class DebitoController {

    private final RelatorioMensalService service;

    public DebitoController(RelatorioMensalService service) {
        this.service = service;
    }

    @Operation(summary = "Lista Registros da tabela por parametro mensal", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarBoletosMensais")
    public ResponseEntity<List<BoletosDTO>> BuscarBoletosMensais()
    {return service.BuscarBoletosMensais();}

    @Operation(summary = "Busca Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarBoletoPorId")
    public ResponseEntity<BoletosDTO> BuscarBoletoPorId(@RequestParam Long idBoleto)
    { return service.BuscarBoletoPorId(idBoleto);}

    @Operation(summary = "Salva novo Registro na tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovoLancamentoDebito")
    public void NovoLancamentoDebito(@RequestParam String empresa,
                                     @RequestParam String cnpj,
                                     @RequestParam Double valorBoleto,
                                     @RequestParam Double parcelas,
                                     @RequestParam int diaVencimento,
                                     @RequestParam Double carenciaPagamento)
    {
        service.NovoLancamentoDebito(empresa, cnpj, valorBoleto, parcelas, diaVencimento, carenciaPagamento);
    }

    @Operation(summary = "Salva novo Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/NovoPagamento")
    public void NovoPagamento(@RequestParam Long idBoleto,
                              @RequestParam FORMAPAGAMENTO formapagamento,
                              @RequestParam Double parcelas)
    {service.NovoPagamento(idBoleto, formapagamento, parcelas);}

}
