package App.Entity;

import App.Enum.MEDIDA;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Produto")
@Builder
public class ProdutoEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    @JoinColumn(unique = true)
    private String codigo;

    private int quantidade;

    @Enumerated(EnumType.STRING)
    private MEDIDA medida;

    private Double valor;

    private String valorFront;

    private String valorTotalFront;

    private Double valorTotalEstoque;

    private Double estoque;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate DataEntrada;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;
}
