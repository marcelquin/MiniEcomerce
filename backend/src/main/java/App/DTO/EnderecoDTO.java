package App.DTO;

public record EnderecoDTO(
        String logradouro,
        String numero,
        String bairro,
        String referencia,
        Long cep,
        String cidade,
        String estado
) {
}
