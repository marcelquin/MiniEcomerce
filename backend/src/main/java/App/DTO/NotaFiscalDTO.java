package App.DTO;

public record NotaFiscalDTO(
        String xml,
        Double valor,
        String empresa,
        String cnpj
) {
}
