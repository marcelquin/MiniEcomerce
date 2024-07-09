package App.DTO;

import App.Entity.EnderecoEntity;
import App.Enum.FORMAPAGAMENTO;
import org.springframework.cglib.core.Local;

import java.awt.*;
import java.time.LocalDateTime;

public record CupomFiscalDTO(

        String razaoSocial,
        String Endereco,
        String cnpj,
        String telefone,
        LocalDateTime data,
        Long ccf,
        String clienteNome,
        String colaboradorNome,
        String Item,
        String codigoProduto,
        String descricaoProduto,
        String QuanidadeItem,
        Double total,
        FORMAPAGAMENTO formapagamento,
        Double soma,
        Double desconto,
        Double troco,
        LocalDateTime dataEmissao




) {
}
