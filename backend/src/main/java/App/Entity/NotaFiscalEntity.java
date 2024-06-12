package App.Entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "NotaFiscal")
@Builder
public class NotaFiscalEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(unique = true)
    private String xml;

    private Double valor;

    private String valorFront;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDateTime dataEntrada;

    @OneToMany
    private List<ProdutoEntity> produtos;

    @ManyToOne
    @JoinColumn(name = "notaFiscalEntity_fornecedorEntity_id")
    private FornecedorEntity fornecedor;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;
}
