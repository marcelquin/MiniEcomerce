package App.Service;

import App.DTO.ProdutoDTO;
import App.Entity.ProdutoEntity;
import App.Enum.MEDIDA;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.IllegalActionException;
import App.Exceptions.NullargumentsException;
import App.Repository.ProdutoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }


    DecimalFormat df= new DecimalFormat("#,####.##");
    public ResponseEntity<List<ProdutoEntity>> ListarProdutos()
    {
        try
        {
            return new ResponseEntity<>(produtoRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ProdutoDTO> NovoProduto(Double valorNota,
                                                  Double valorFrete,
                                                  Double porcentagemImposto,
                                                  Double custoOperacional,
                                                  Double porcentagemLucro,
                                                  String nome,
                                                  String descriacao,
                                                  int quantidade,
                                                  MEDIDA medida,
                                                  Double estoque)
    {
        try
        {
            if(valorNota != null &&
               valorFrete != null &&
               porcentagemImposto != null &&
               custoOperacional != null &&
               porcentagemLucro != null &&
               nome != null && descriacao != null &&
               quantidade > 0 &&
               medida != null &&
               estoque != null)
                {
                    if(porcentagemImposto < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(porcentagemLucro < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(custoOperacional < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(valorFrete < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}

                    Double valorporcentagem = porcentagemImposto/100;
                        Double valorpocentagemLucro = porcentagemLucro/100;
                        Double valorParcial = valorNota+valorFrete;
                        Double valorTotal = valorParcial * valorporcentagem + valorParcial;
                        Double valorTotalProduto = valorTotal+custoOperacional;
                        Double valorFinalProduto = valorTotalProduto*valorpocentagemLucro+valorTotalProduto;
                        Double valorUnitario = valorTotalProduto / estoque;
                        Double valorTotalEstoque = valorUnitario * estoque;
                        int dig = (int) (1111 + Math.random() * 9999);
                        String codigo = "P_"+dig;
                        Locale localBrasil = new Locale("pt", "BR");

                        ProdutoEntity entity = new ProdutoEntity();

                        entity.setNome(nome+" "+quantidade+medida);
                        entity.setDescricao(descriacao);
                        entity.setMedida(medida);
                        entity.setCodigo(codigo);
                        entity.setQuantidade(quantidade);
                        entity.setValor(valorUnitario);
                        entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(valorUnitario));
                        entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(valorTotalEstoque));
                        entity.setValorTotalEstoque(valorTotalEstoque);
                        entity.setEstoque(estoque);
                        entity.setDataEntrada(LocalDate.now());
                        entity.setTimeStamp(LocalDateTime.now());
                        produtoRepository.save(entity);
                        ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                                entity.getDescricao(), entity.getCodigo(), entity.getEstoque(), df.format(entity.getValor()),entity.getDataEntrada());
                        return  new ResponseEntity<>(response,HttpStatus.CREATED);
                }
                else
                { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ProdutoDTO> EditarInformacoesProduto(String nome,
                                                               String descriacao,
                                                               int quantidade,
                                                               MEDIDA medida)
    {
        try
        {
            if(nome != null &&
               descriacao != null &&
               quantidade > 0 &&
                medida != null)
            {
                ProdutoEntity entity = produtoRepository.findBynome(nome).orElseThrow(
                        ()-> new EntityNotFoundException()
                );

                entity.setDescricao(descriacao);
                entity.setQuantidade(quantidade);
                entity.setMedida(medida);
                entity.setNome(nome+" "+entity.getQuantidade()+entity.getMedida());
                entity.setTimeStamp(LocalDateTime.now());
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(), entity.getCodigo(), entity.getEstoque(), df.format(entity.getValor()),entity.getDataEntrada());
                return  new ResponseEntity<>(response,HttpStatus.OK);
            }
            else
            { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ProdutoDTO> AdicionarEstoqueProduto(String codigo,
                                                              Double valorNota,
                                                              Double valorFrete,
                                                              Double porcentagemImposto,
                                                              Double custoOperacional,
                                                              Double porcentagemLucro,
                                                              Double estoque)
    {
        try
        {
            if(codigo != null &&
               valorNota != null &&
               valorFrete != null &&
               porcentagemImposto != null &&
               porcentagemLucro != null &&
               estoque != null)
            {
                if(porcentagemImposto < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(porcentagemLucro < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(custoOperacional < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(valorFrete < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}

                ProdutoEntity entity = produtoRepository.findBycodigo(codigo).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                Double valorporcentagem = porcentagemImposto/100;
                Double valorpocentagemLucro = porcentagemLucro/100;
                Double valorParcial = valorNota+valorFrete;
                Double valorTotal = valorParcial * valorporcentagem + valorParcial;
                Double valorTotalProduto = valorTotal+custoOperacional;
                Double valorFinalProduto = valorTotalProduto*valorpocentagemLucro+valorTotalProduto;
                Double valorUnitario = valorTotalProduto / entity.getEstoque();

                if(entity.getValor() < valorUnitario)
                {
                   entity.setEstoque(entity.getEstoque() + estoque);
                   entity.setValor(valorUnitario);
                   entity.setValorTotalEstoque(valorUnitario * entity.getEstoque());
                }
                else
                {
                    entity.setEstoque(entity.getEstoque() + estoque);
                    entity.setValorTotalEstoque(entity.getValor() * entity.getEstoque());
                }
                entity.setTimeStamp(LocalDateTime.now());
                entity.setDataEntrada(LocalDate.now());
                produtoRepository.save(entity);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(), entity.getCodigo(), entity.getEstoque(), df.format(entity.getValor()),entity.getDataEntrada());
                return  new ResponseEntity<>(response,HttpStatus.OK);
            }
            else
            { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<ProdutoDTO> DeletarProduto(Long id)
    {
        try
        {
            if(id != null && id >0)
            {
                if(produtoRepository.existsById(id))
                {
                    produtoRepository.deleteById(id);

                    return new ResponseEntity<>(HttpStatus.OK);
                }
                else
                { throw new EntityNotFoundException();}
            }
            else
            { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

}
