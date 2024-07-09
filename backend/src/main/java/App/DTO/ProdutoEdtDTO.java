package App.DTO;

import App.Enum.MEDIDA;

import java.time.LocalDate;

public record ProdutoEdtDTO(
        String nome,
        String descricao,
        int quantidade,
        MEDIDA medida,
        String codigo,
        Double valor,
        LocalDate DataEntrada,
        String fabricante,
        Long cfop,
        Long ncmsh,
        Double estoque
) {
}
