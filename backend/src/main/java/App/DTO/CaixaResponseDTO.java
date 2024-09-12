package App.DTO;

import App.Enum.FORMAPAGAMENTO;
import App.Enum.STATUS;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

public record CaixaResponseDTO(
        String codigo,
        String nomeCliente,
        String sobrenomeCliente,
        String telefone,
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
        LocalDateTime dataVenda,
        List<ItemPedidoDTO> itens,
        String valor
) {
}
