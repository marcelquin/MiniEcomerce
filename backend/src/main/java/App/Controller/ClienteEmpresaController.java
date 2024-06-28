package App.Controller;

import App.DTO.EmpresaDTO;
import App.Entity.ClienteEmpresaEntity;
import App.Entity.EmpresaEntity;
import App.Service.ClienteEmpresaService;
import App.Service.EmpresaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("clienteempresa")
@Tag(name = "clienteempresa",
        description = "Manipula informações referentes a entidade"   )
        @CrossOrigin(origins = "*")
public class ClienteEmpresaController {

    private final ClienteEmpresaService service;

    public ClienteEmpresaController(ClienteEmpresaService service) {
        this.service = service;
    }

    @Operation(summary = "Lista Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/ListarClienteEmpresa")
    public ResponseEntity<List<ClienteEmpresaEntity>> ListarClienteEmpresa()
    {return service.ListarClienteEmpresa();}

    @Operation(summary = "Busca Registros da tabela", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @GetMapping("/BuscarClienteEmpresaPorId")
    public ResponseEntity<EmpresaDTO> BuscarClienteEmpresaPorId(@RequestParam Long id)
    { return service.BuscarClienteEmpresaPorId(id);}

    @Operation(summary = "Salva Registro na tabela", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PostMapping("/NovaClienteEmpresa")
    public ResponseEntity<EmpresaDTO> NovaClienteEmpresa(@RequestParam String nome,
                                                  @RequestParam String razaoSocial,
                                                  @RequestParam String cnpj,
                                                  @RequestParam String areaAtuacao,
                                                  @RequestParam String logradouro,
                                                  @RequestParam String numero,
                                                  @RequestParam String bairro,
                                                  String referencia,
                                                  @RequestParam Long cep,
                                                  @RequestParam String cidade,
                                                  @RequestParam String estado,
                                                  @RequestParam Long prefixo,
                                                  @RequestParam Long telefone,
                                                  @RequestParam String email)
    { return service.NovaClienteEmpresa(nome, razaoSocial, cnpj, areaAtuacao, logradouro, numero, bairro, referencia, cep, cidade, estado, prefixo, telefone, email);}

    @Operation(summary = "Edita Registro na tabela", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operação realizada com sucesso"),
            @ApiResponse(responseCode = "422", description = "Dados de requisição inválida"),
            @ApiResponse(responseCode = "400", description = "Parametros inválidos"),
            @ApiResponse(responseCode = "500", description = "Ops algoo deu errado"),
    })
    @PutMapping("/EditarClienteEmpresa")
    public ResponseEntity<EmpresaDTO> EditarClienteEmpresa(@RequestParam Long id,
                                                  @RequestParam String nome,
                                                  @RequestParam String razaoSocial,
                                                  @RequestParam String cnpj,
                                                  @RequestParam String areaAtuacao,
                                                  @RequestParam String logradouro,
                                                  @RequestParam String numero,
                                                  @RequestParam String bairro,
                                                  String referencia,
                                                  @RequestParam Long cep,
                                                  @RequestParam String cidade,
                                                  @RequestParam String estado,
                                                  @RequestParam Long prefixo,
                                                  @RequestParam Long telefone,
                                                  @RequestParam String email)
    { return service.EditarClienteEmpresa(id, nome, razaoSocial, cnpj, areaAtuacao, logradouro, numero, bairro, referencia, cep, cidade, estado, prefixo, telefone, email);}
}
