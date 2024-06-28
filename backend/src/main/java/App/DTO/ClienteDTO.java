package App.DTO;

import java.time.LocalDate;

public record ClienteDTO(
        String nome,
        String sobrenome,
        LocalDate dataNascimento,
        Long cpf,
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
