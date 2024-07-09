package App.Controller;

import App.DTO.ClienteDTO;
import App.Entity.ClienteEntity;
import App.Service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("cliente")
@Tag(name = "cliente",
        description = "Manipula informações referentes a entidade"
)
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }
    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarClientes")
    public ResponseEntity<List<ClienteEntity>> ListarClientes()
    { return service.ListarClientes();}

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarClienteporid")
    public ResponseEntity<ClienteDTO> BuscarClienteporid(@RequestParam Long id)
    { return service.BuscarClienteporid(id);}

    @Operation(summary = "Salva novo Registro na tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovoCliente")
    public ResponseEntity<ClienteDTO> NovoCliente(@RequestParam String nome,
                                                  @RequestParam String sobrenome,
                                                  @RequestParam String cpf,
                                                  @RequestParam LocalDate dataNascimento,
                                                  @RequestParam String logradouro,
                                                  @RequestParam String numero,
                                                  @RequestParam String bairro,
                                                  @RequestParam String referencia,
                                                  @RequestParam Long cep,
                                                  @RequestParam String cidade,
                                                  @RequestParam String estado,
                                                  @RequestParam Long prefixo,
                                                  @RequestParam Long telefone,
                                                  @RequestParam String email)
    { return service.NovoCliente(nome, sobrenome, cpf, dataNascimento, logradouro, numero, bairro, referencia, cep, cidade, estado, prefixo, telefone, email);}


    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/EdiarCliente")
    public ResponseEntity<ClienteDTO> EdiarCliente(@RequestParam Long id,
                                                   @RequestParam String nome,
                                                   @RequestParam String sobrenome,
                                                   @RequestParam String cpf,
                                                   @RequestParam LocalDate dataNascimento,
                                                   @RequestParam String logradouro,
                                                   @RequestParam String numero,
                                                   @RequestParam String bairro,
                                                   @RequestParam String referencia,
                                                   @RequestParam Long cep,
                                                   @RequestParam String cidade,
                                                   @RequestParam String estado,
                                                   @RequestParam Long prefixo,
                                                   @RequestParam Long telefone,
                                                   @RequestParam String email)
    { return service.EdiarCliente(id,nome, sobrenome, cpf, dataNascimento, logradouro, numero, bairro, referencia, cep, cidade, estado, prefixo, telefone, email);}

    @Operation(summary = "Deleta Registro na tabela", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @DeleteMapping("/DeletarCliente")
    public ResponseEntity<ClienteDTO> DeletarCliente(@RequestParam Long id)
    { return service.DeletarCliente(id);}


}
