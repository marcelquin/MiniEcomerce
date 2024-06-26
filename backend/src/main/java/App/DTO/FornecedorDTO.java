package App.DTO;

import java.time.LocalDate;

public record FornecedorDTO(
        String nome,
        String razaoSocial,
        String cnpj,
        String areaAtuacao,
        LocalDate dataContrato,
        Long cep,
        String cidade,
        String estado,
        Long prefixo,
        Long telefone,
        String email
) {
}
