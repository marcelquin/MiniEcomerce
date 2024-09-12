package App.DTO;

import App.Enum.FORMAPAGAMENTO;

import java.time.LocalDateTime;
import java.util.List;

public record PedidoDTO(
        String codigo,
        String cliente,
        List<ItemPedidoDTO> itens,
        String valor,
        FORMAPAGAMENTO formapagamento,
        LocalDateTime dataPagamento
) {
}
