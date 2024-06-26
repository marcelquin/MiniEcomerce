package App.DTO;

import App.Enum.MEDIDA;

import java.time.LocalDate;

public record ProdutoDTO(
        String nome,
        String descricao,
        int quantidade,
        MEDIDA medida,
        String codigo,
        Double valor,
        LocalDate DataEntrada,
        Double estoque
) {
}
