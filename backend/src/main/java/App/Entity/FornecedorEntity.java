package App.Entity;

import App.DTO.FornecedorDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Fornecedor")
@Builder
public class FornecedorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String razaoSocial;

    @JoinColumn(unique = true)
    private String cnpj;

    private String areaAtuacao;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataInicioContrato;

    private Long cep;

    private String cidade;

    private String estado;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contatoEntity_id", referencedColumnName = "id")
    private ContatoEntity contato;


    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;

    public FornecedorEntity(FornecedorDTO dto) {
        this.nome = dto.nome();
        this.razaoSocial = dto.razaoSocial();
        this.cnpj = dto.cnpj();
        this.cep = dto.cep();
        this.cidade = dto.cidade();
        this.estado = dto.estado();
    }
}
