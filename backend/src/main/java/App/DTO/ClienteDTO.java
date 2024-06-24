package App.DTO;

import java.time.LocalDate;

public record ClienteDTO(
        String nome,
        LocalDate dataNascimento,
        Long cpf,
        String endereco,
        String telefone,
        String email
) {

}
