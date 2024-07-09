package App.DTO;

public record ClienteEmpresaDTO(
        String nome,
        String razaoSocial,
        String cnpj,
        String logradouro,
        String numero,
        String bairro,
        String referencia,
        Long cep,
        String cidade,
        String estado,
        Long prefixo,
        Long telefone,
        String email
) {
}
