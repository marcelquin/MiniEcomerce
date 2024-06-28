package App.Entity;

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
@Table(name = "cliente")
@Builder
public class ClienteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String sobrenome;

    private Long cpf;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataNascimento;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "enderecoEntity_id", referencedColumnName = "id")
    private EnderecoEntity endereco;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contatoEntity_id", referencedColumnName = "id")
    private ContatoEntity contato;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime timeStamp;

}
