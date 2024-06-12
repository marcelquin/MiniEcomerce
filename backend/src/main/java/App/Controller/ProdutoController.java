package App.Controller;

import App.DTO.ProdutoDTO;
import App.Entity.ProdutoEntity;
import App.Enum.MEDIDA;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.IllegalActionException;
import App.Exceptions.NullargumentsException;
import App.Service.ProdutoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("produto")
@Tag(name = "produto",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarProdutos")
    public ResponseEntity<List<ProdutoEntity>> ListarProdutos()
    { return service.ListarProdutos();}

    @Operation(summary = "Salva novo Registro na tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovoProduto")
    public ResponseEntity<ProdutoDTO> NovoProduto(@RequestParam String nome,
                                                  @RequestParam String descriacao,
                                                  @RequestParam int quantidade,
                                                  @RequestParam MEDIDA medida,
                                                  @RequestParam Double estoque,
                                                  @RequestParam String xml,
                                                  @RequestParam Double valorEmNota,
                                                  @RequestParam Double impostoAplicado,
                                                  @RequestParam Double porcentagemLucro,
                                                  @RequestParam Double valorFrete,
                                                  @RequestParam Double valorCusto)
    {return service.NovoProduto(nome, descriacao, quantidade, medida, estoque, xml, valorEmNota, impostoAplicado, porcentagemLucro, valorFrete, valorCusto);}
    /*
    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/EditarInformacoesProduto")
    public ResponseEntity<ProdutoDTO> EditarInformacoesProduto(@RequestParam String nome,
                                                               @RequestParam String descriacao,
                                                               @RequestParam int quantidade,
                                                               @RequestParam MEDIDA medida)
    {return  service.EditarInformacoesProduto(nome, descriacao, quantidade, medida);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/AdicionarEstoqueProduto")
    public ResponseEntity<ProdutoDTO> AdicionarEstoqueProduto(@RequestParam String codigo,
                                                              @RequestParam Double valorProduto,
                                                              @RequestParam Double estoque)
    { return service.AdicionarEstoqueProduto(codigo, valorProduto,estoque);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/ReajustePreco")
    public ResponseEntity<ProdutoDTO> ReajustePreco(@RequestParam String codigoProduto,
                                                    @RequestParam Double porcentagem)
    { return service.ReajustePreco(codigoProduto, porcentagem);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/QueimaEstoque")
    public ResponseEntity<ProdutoDTO> QueimaEstoque(@RequestParam String codigoProduto,
                                                    @RequestParam Double porcentagem)
    { return service.QueimaEstoque(codigoProduto, porcentagem);}


    @Operation(summary = "Deleta Registro na tabela", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @DeleteMapping("/DeletarProduto")
    public ResponseEntity<ProdutoDTO> DeletarProduto(@RequestParam Long id)
    { return service.DeletarProduto(id);}

     */
}
