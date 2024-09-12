package App.DTO;

import java.time.LocalDate;

public record ProdutoResponseDTO(
        String nome,
        String descricao,
        String codigo,
        Double valor,
        String valorFront,
        LocalDate DataEntrada,
        String fabricante,
        Long cfop,
        Long ncmsh,
        Double estoque,
        String notificacao
) {
}
