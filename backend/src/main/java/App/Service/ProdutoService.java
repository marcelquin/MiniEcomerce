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

    public ResponseEntity<ProdutoDTO> NovoProduto(String nome,
                                                  String descriacao,
                                                  int quantidade,
                                                  MEDIDA medida,
                                                  Double valorProduto,
                                                  Double estoque)
    {
        try
        {
            if(
               nome != null && descriacao != null &&
               quantidade > 0 &&
               medida != null &&
               valorProduto != null &&
               estoque != null)
                {
                    if(valorProduto < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}

                        int dig = (int) (1111 + Math.random() * 9999);
                        String codigo = "P_"+dig;
                        Locale localBrasil = new Locale("pt", "BR");
                        Double valorTotalEstoque = valorProduto * quantidade;
                        ProdutoEntity entity = new ProdutoEntity();

                        entity.setNome(nome+" "+quantidade+medida);
                        entity.setDescricao(descriacao);
                        entity.setMedida(medida);
                        entity.setCodigo(codigo);
                        entity.setQuantidade(quantidade);
                        entity.setValor(valorProduto);
                        entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(valorProduto));
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

}
