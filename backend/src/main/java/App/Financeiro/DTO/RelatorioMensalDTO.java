package App.Financeiro.DTO;

import java.util.List;

public record RelatorioMensalDTO(
        int mes,

        String totalVendasDebito,

        String totalVendasCredito,

        String totalVendasDinheiro,

        String totalVendasPix,

        String totalVendas,

        String totalDebitos,

        List<PedidosDTO> pedidos
        ) {


}
