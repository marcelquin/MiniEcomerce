package App.Controller;

import App.DTO.EntregaDTO;
import App.Entity.EntregaEntity;
import App.Service.EntregaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("entrega")
@Tag(name = "entrega",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class EntregaController {

    private final EntregaService entregaService;



    public EntregaController(EntregaService entregaService) {
        this.entregaService = entregaService;
    }

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarEntregas")
    public ResponseEntity<List<EntregaEntity>> ListarEntregas()
    {return entregaService.ListarEntregas();}


    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarEntregasEmAberto")
    public ResponseEntity<List<EntregaEntity>> ListarEntregasEmAberto()
    {return entregaService.ListarEntregasEmAberto();}

    @Operation(summary = "Edita Registros da tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/IniciarEntrega")
    public void IniciarEntrega(@RequestParam Long id)
    { entregaService.IniciarEntrega(id);}

    @Operation(summary = "Edita Registros da tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/FinalizarEntrega")
    public void FinalizarEntrega(@RequestParam Long id)
    { entregaService.IniciarEntrega(id);}

}
