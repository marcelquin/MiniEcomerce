package App.Controller;

import App.DTO.FornecedorDTO;
import App.Entity.FornecedorEntity;
import App.Service.FornecedorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("fornecedor")
@Tag(name = "fornecedor",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class FornecedorController {

    private final FornecedorService fornecedorService;

    public FornecedorController(FornecedorService fornecedorService) {
        this.fornecedorService = fornecedorService;
    }

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarFornecedor")
    public ResponseEntity<List<FornecedorEntity>> ListarFornecedor()
    { return fornecedorService.ListarFornecedor();}


    @Operation(summary = "Salva novo Registro na tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovoFornecedor")
    public ResponseEntity<FornecedorDTO> NovoFornecedor(@RequestParam String nome,
                                                        @RequestParam String razaoSocial,
                                                        @RequestParam String cnpj,
                                                        @RequestParam String areaAtuacao,
                                                        @RequestParam LocalDate dataInicioContrato,
                                                        @RequestParam Long cep,
                                                        @RequestParam String cidade,
                                                        @RequestParam String estado,
                                                        @RequestParam Long prefixo,
                                                        @RequestParam Long telefone,
                                                        @RequestParam String email)
    { return fornecedorService.NovoFornecedor(nome, razaoSocial, cnpj,areaAtuacao, dataInicioContrato, cep, cidade, estado, prefixo, telefone, email);}


}
