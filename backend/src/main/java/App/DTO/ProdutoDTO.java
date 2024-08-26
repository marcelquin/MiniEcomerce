package App.DTO;

import App.Enum.MEDIDA;

import java.time.LocalDate;

public record ProdutoDTO(
        String nome,
        String descricao,
        String codigo,
        Double valor,
        String valorFront,
        LocalDate DataEntrada,
        String fabricante,
        Long cfop,
        Long ncmsh,
        Double estoque
) {
}
