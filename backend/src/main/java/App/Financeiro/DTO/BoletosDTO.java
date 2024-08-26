package App.Financeiro.DTO;

import App.Enum.FORMAPAGAMENTO;
import App.Enum.StatusPagamento;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Future;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record BoletosDTO(
        Long id,
        String empresa,
        String cnpj,
        StatusPagamento statusPagamento,
        @JsonFormat(pattern = "dd/MM/yyyy")
        @Future
        LocalDate dataVencimento,
        String parcelas,
        String parcelaAtual,
        String valorTotal,
        String valorParcela,
        @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
        LocalDateTime dataPagamento,
        FORMAPAGAMENTO formapagamento,
        Double parcelaPagamento

) {
}
