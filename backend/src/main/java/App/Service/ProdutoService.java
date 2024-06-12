package App.Service;

import App.DTO.ProdutoDTO;
import App.Entity.EstoqueEntity;
import App.Entity.NotaFiscalEntity;
import App.Entity.ProdutoEntity;
import App.Enum.MEDIDA;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.IllegalActionException;
import App.Exceptions.NullargumentsException;
import App.Repository.EstoqueRepository;
import App.Repository.NotaFiscalRepository;
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
    private final EstoqueRepository estoqueRepository;
    private final NotaFiscalRepository notaFiscalRepository;
    public ProdutoService(ProdutoRepository produtoRepository, EstoqueRepository estoqueRepository, NotaFiscalRepository notaFiscalRepository) {
        this.produtoRepository = produtoRepository;
        this.estoqueRepository = estoqueRepository;
        this.notaFiscalRepository = notaFiscalRepository;
    }


    DecimalFormat df= new DecimalFormat("#,####.##");

    Locale localBrasil = new Locale("pt", "BR");
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

    public ResponseEntity<ProdutoDTO> NovoProduto(String nome,
                                                  String descriacao,
                                                  int quantidade,
                                                  MEDIDA medida,
                                                  Double estoque,
                                                  String xml,
                                                  Double valorEmNota,
                                                  Double impostoAplicado,
                                                  Double porcentagemLucro,
                                                  Double valorFrete,
                                                  Double valorCusto)
    {
        try
        {
            if(
               nome != null && descriacao != null &&
               quantidade > 0 &&
               medida != null &&
               estoque != null &&
               valorEmNota != null &&
               impostoAplicado != null &&
               porcentagemLucro != null &&
               valorFrete != null &&
               valorCusto != null &&
               xml != null)
                {
                    if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(valorCusto < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(valorFrete < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(valorEmNota < 0) {throw new IllegalActionException("O campo não pode ser negativo");}

                    int dig = (int) (1111 + Math.random() * 9999);
                    int digestoque1 = (int) (1111 + Math.random() * 9999);
                    int digestoque2 = (int) (111 + Math.random() * 999);
                        String codigo = "P_"+dig;
                        Double valorParcial = 0.0;
                        Double valorTotal = 0.0;
                        Double valorUnitario = 0.0;
                        Double imposto = impostoAplicado /100;
                        Double lucro = porcentagemLucro /100;

                        valorParcial = (valorEmNota * imposto) + valorEmNota;
                        valorTotal = valorParcial + valorCusto + valorFrete;
                        valorTotal = (valorTotal * lucro) + valorTotal;
                        valorUnitario = valorTotal / estoque;

                        ProdutoEntity entity = new ProdutoEntity();

                        entity.setNome(nome+" "+quantidade+medida);
                        entity.setDescricao(descriacao);
                        entity.setMedida(medida);
                        entity.setCodigo(codigo);
                        entity.setQuantidade(quantidade);
                        entity.setValor(valorUnitario);
                        entity.setValorTotalEstoque(entity.getValor()*estoque);
                        entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                        entity.setValorTotalEstoqueFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotalEstoque()));
                        entity.setDataEntrada(LocalDate.now());
                        entity.setTimeStamp(LocalDateTime.now());
                        EstoqueEntity estoqueEntity = new EstoqueEntity();
                        estoqueEntity.setNome(entity.getNome());
                        estoqueEntity.setDescricao(entity.getDescricao());
                        estoqueEntity.setCodigo(digestoque1+"."+digestoque2);
                        estoqueEntity.setQuantidade(estoque);
                        estoqueEntity.setValor(entity.getValor());
                        estoqueEntity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValor()));
                        estoqueEntity.setTimeStamp(LocalDateTime.now());
                        estoqueRepository.save(estoqueEntity);
                        entity.setEstoque(estoqueEntity);
                        produtoRepository.save(entity);
                        NotaFiscalEntity notaFiscal = notaFiscalRepository.findByxml(xml).orElseThrow(
                                () -> new EntityNotFoundException()
                        );
                        notaFiscal.getProdutos().add(entity);
                        notaFiscalRepository.save(notaFiscal);
                        ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                                entity.getDescricao(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada());
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
    /*
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
                                                              Double valorProduto,
                                                               Double estoque)
    {
        try
        {
            if(codigo != null &&
               valorProduto != null &&
               estoque != null)
            {
                if(valorProduto < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}

                ProdutoEntity entity = produtoRepository.findBycodigo(codigo).orElseThrow(
                        ()-> new EntityNotFoundException()
                );

                if(entity.getValor() < valorProduto)
                {
                   entity.setEstoque(entity.getEstoque() + estoque);
                   entity.setValor(valorProduto);
                   entity.setValorTotalEstoque(valorProduto * entity.getEstoque());
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


    public ResponseEntity<ProdutoDTO> ReajustePreco(String codigoProduto,
                                                    Double porcentagem)
    {
        try
        {
            if(codigoProduto != null &&
               porcentagem != null)
            {
                if(porcentagem < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ProdutoEntity entity = produtoRepository.findBycodigo(codigoProduto).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                Double porcentagemCalculo = porcentagem/100;
                Double novoPreco = entity.getValor()*porcentagemCalculo + entity.getValor();
                System.out.println("valor: "+entity.getValor());
                System.out.println("novo valor: "+novoPreco);
                Double novoValorEstoque = novoPreco * entity.getEstoque();
                entity.setValor(novoPreco);
                entity.setValorTotalEstoque(novoValorEstoque);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(novoPreco));
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(novoValorEstoque));
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

    public ResponseEntity<ProdutoDTO> QueimaEstoque(String codigoProduto,
                                                    Double porcentagem)
    {
        try
        {
            if(codigoProduto != null &&
                    porcentagem != null)
            {
                if(porcentagem < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ProdutoEntity entity = produtoRepository.findBycodigo(codigoProduto).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                Double porcentagemCalculo = porcentagem/100;
                Double novoPreco = entity.getValor()*porcentagemCalculo - entity.getValor();
                Double novoValorEstoque = novoPreco * entity.getEstoque();
                entity.setValor(novoPreco);
                entity.setValorTotalEstoque(novoValorEstoque);
                entity.setValor(novoPreco);
                entity.setValorTotalEstoque(novoValorEstoque);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotalEstoque()));
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
    */
}
