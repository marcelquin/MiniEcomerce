package App.Entity;

import App.DTO.ClienteDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Cliente")
@Builder
public class ClienteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String endereco;

    private Long prefixo;

    @JoinColumn(unique = true)
    private Long telefone;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;

    public ClienteEntity(ClienteDTO dto) {
        this.nome = dto.nome();
        this.endereco = dto.endereco();
        this.prefixo = dto.prefixo();
        this.telefone = dto.telefone();
    }
}
