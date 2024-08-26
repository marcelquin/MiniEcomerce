package App.DTO;

import App.Enum.FORMAPAGAMENTO;
import App.Enum.STATUS;
import App.Enum.StatusPagamento;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

public record PedidoResponseDTO(
        String codigo,
        String cliente,
        String documento,
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
        LocalDateTime dataVenda,
        List<String> itens,
        String valor,
        STATUS statusPagamento,
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
        LocalDateTime dataPagamento,
        FORMAPAGAMENTO formapagamento,
        Double parcelas
) {
}
