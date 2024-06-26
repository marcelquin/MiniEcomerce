package App.Entity;

import App.Enum.STATUS;
import App.Enum.TIPOCOMPRA;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Pedido")
@Builder
public class PedidoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCLiente;

    @ManyToOne
    @JoinColumn(name = "pedidoEntity_clienteEntity_id")
    private ClienteEntity Cliente;

    @JoinColumn(unique = true)
    private String codigo;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataPedido;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pagamentoEntity_id", referencedColumnName = "id")
    private PagamentoEntity pagamento;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "entregaoEntity_id", referencedColumnName = "id")
    private EntregaEntity entrega;

    @OneToMany
    private List<ItemPedidoEntity> produtos;

    private Double valorTotal;

    private String valorTotalFront;

    @Enumerated(EnumType.STRING)
    private STATUS status;

    @Enumerated(EnumType.STRING)
    private TIPOCOMPRA tipocompra;

    private String notificacao;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;
}
