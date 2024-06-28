package App.Entity;

import App.Enum.STATUSENTREGA;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Builder
@Table(name = "Entrega")
public class EntregaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;

    private String enderecoEntrega;

    private List<String> Produtos;

    private String telefoneContato;

    @Enumerated(EnumType.STRING)
    private STATUSENTREGA statusEntrega;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataEntrega;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataCancelamento;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;
}
