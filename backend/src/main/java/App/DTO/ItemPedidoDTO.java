package App.DTO;

public record ItemPedidoDTO(
      String nome,
      String codigo,
      String descricao,
      Double quantidade,
      String valorUnitario,
      String valorTotal

) {
}
