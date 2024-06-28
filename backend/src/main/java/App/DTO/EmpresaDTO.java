package App.DTO;

import java.time.LocalDate;

public record EmpresaDTO(
        String nome,
        String razaoSocial,
        String cnpj,
        String areaAtuacao,
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
