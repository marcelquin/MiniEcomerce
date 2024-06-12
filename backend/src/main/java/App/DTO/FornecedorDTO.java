package App.DTO;

public record FornecedorDTO(
        String nome,
        String razaoSocial,
        String cnpj,
        Long cep,
        String cidade,
        String estado,
        Long prefixo,
        Long telefone,
        String email
) {
}
