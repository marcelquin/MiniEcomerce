package App.Entity;

import App.DTO.EnderecoDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Builder
@Table(name = "endereco")
public class EnderecoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String logradouro;

    private String numero;

    private String bairro;

    private String referencia;

    private Long cep;

    private String cidade;

    private String estado;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;

    public EnderecoEntity(EnderecoDTO dto) {
        this.logradouro = dto.logradouro();
        this.numero = dto.numero();
        this.bairro = dto.bairro();
        this.referencia = dto.referencia();
        this.cep = dto.cep();
        this.cidade = dto.cidade();
        this.estado = dto.estado();
    }
}
