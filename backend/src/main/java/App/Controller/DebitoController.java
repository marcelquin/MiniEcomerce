package App.Controller;

import App.Financeiro.Service.RelatorioMensalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

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
}
