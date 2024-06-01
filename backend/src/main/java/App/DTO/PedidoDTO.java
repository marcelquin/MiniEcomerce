package App.DTO;

import java.util.List;

public record PedidoDTO(
        String codigo,
        String cliente,
        List<String> itens,
        String valor
) {
}
