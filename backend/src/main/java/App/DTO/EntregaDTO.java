package App.DTO;

import App.Enum.STATUSENTREGA;

import java.util.List;

public record EntregaDTO(

        String nomeCliente,
        String enderecoEntrega,
        String telefoneContato,
        List<String> produtos,
        STATUSENTREGA statusentrega
) {
}
