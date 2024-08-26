package App.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record FornecedorDTO(
        String nome,
        String razaoSocial,
        String cnpj,
        String areaAtuacao,
        @JsonFormat(pattern = "dd/MM/yyyy")
        LocalDate dataContrato,
        Long cep,
        String cidade,
        String estado,
        Long prefixo,
        Long telefone,
        String email
) {
}
