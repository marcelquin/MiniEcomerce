package App.DTO;

import java.time.LocalDate;

public record ProdutoDTO(
        String nome,
        String descricao,
        String codigo,
        Double valor,
        LocalDate DataEntrada
) {
}
