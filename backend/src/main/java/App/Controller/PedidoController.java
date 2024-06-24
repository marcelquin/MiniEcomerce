package App.Controller;

import App.DTO.PedidoDTO;
import App.Entity.PedidoEntity;
import App.Enum.FORMAPAGAMENTO;
import App.Enum.TIPOCOMPRA;
import App.Service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("pedido")
@Tag(name = "pedido",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarPedidos")
    public ResponseEntity<List<PedidoEntity>> ListarPedidos()
    { return service.ListarPedidos();}

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarPedidosAbertos")
    public ResponseEntity<List<PedidoEntity>> ListarPedidosAbertos()
    { return service.ListarPedidosAbertos();}

    @Operation(summary = "Busca Registros da tabela por codigo", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarPedidoPorId")
    public ResponseEntity<PedidoDTO> BuscarPedidoPorId(@RequestParam Long id)
    { return service.BuscarPedidoPorId(id);}

    @Operation(summary = "Salva novo Registro na tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovoPedido")
    public ResponseEntity<PedidoDTO> NovoPedido(@RequestParam Long idCliente)
    { return service.NovoPedido(idCliente);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/AdicionarProdutoPedido")
    public void AdicionarProdutoPedido(@RequestParam Long id,
                                       @RequestParam Long idProduto,
                                       @RequestParam Double quantidade)
    {service.AdicionarProdutoPedido(id, idProduto, quantidade);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/FinalizarPedido")
    public void FinalizarPedido(@RequestParam Long id,
                                @RequestParam FORMAPAGAMENTO formaPagamento,
                                @RequestParam Double parcelas,
                                @RequestParam TIPOCOMPRA tipocompra)
    { service.FinalizarPedido(id, formaPagamento,parcelas,tipocompra);}
}
