package App.Controller;

import App.DTO.NotaFiscalDTO;
import App.Entity.NotaFiscalEntity;
import App.Service.NotaFiscalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("notafiscal")
@Tag(name = "notafiscal",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class NotaFiscalController {

    private final NotaFiscalService notaFiscalService;

    public NotaFiscalController(NotaFiscalService notaFiscalService) {
        this.notaFiscalService = notaFiscalService;
    }

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarNotasFiscais")
    public ResponseEntity<List<NotaFiscalEntity>> ListarNotasFiscais()
    { return notaFiscalService.ListarNotasFiscais();}


    @Operation(summary = "Salva novo Registro na tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovaNotaFiscal")
    public ResponseEntity<NotaFiscalDTO>NovaNotaFiscal(@RequestParam String xml,
                                                       @RequestParam Double valor,
                                                       @RequestParam String cnpj)
    { return notaFiscalService.NovaNotaFiscal(xml, valor, cnpj);}
}
