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


    public ResponseEntity<ProdutoDTO> BuscarProdutoPorId(Long id)
    {
        try
        {
           if(id != null)
           {
               ProdutoEntity entity = produtoRepository.findById(id).orElseThrow(
                       () -> new EntityNotFoundException()
               );
               ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                       entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(),entity.getEstoque().getQuantidade());
               return  new ResponseEntity<>(response,HttpStatus.OK);
           }
           else
           {throw new NullargumentsException();}
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
                                                  Long idNotaFiscal,
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
               idNotaFiscal != null)
                {
                    if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(valorCusto < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(valorFrete < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    if(valorEmNota < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                    NotaFiscalEntity notaFiscal = notaFiscalRepository.findById(idNotaFiscal).orElseThrow(
                            () -> new EntityNotFoundException()
                    );
                    if( notaFiscal.getValorFatorado() + valorEmNota > notaFiscal.getValor())
                    { throw new IllegalActionException("Ops! algo errado");}
                    if(notaFiscal.getValorFatorado() + valorEmNota == notaFiscal.getValor())
                    { notaFiscal.setNotaNaturada(true);}
                    if(notaFiscal.getNotaNaturada() == true){throw new IllegalActionException("Ops! algo errado");}
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
                        entity.setNome(nome);
                        entity.setDescricao(descriacao);
                        entity.setMedida(medida);
                        entity.setCodigo(codigo);
                        entity.setQuantidade(quantidade);
                        entity.setValor(valorUnitario);
                        entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                        entity.setDataEntrada(LocalDate.now());
                        entity.setTimeStamp(LocalDateTime.now());
                        EstoqueEntity estoqueEntity = new EstoqueEntity();
                        estoqueEntity.setNome(entity.getNome());
                        estoqueEntity.setDescricao(entity.getDescricao());
                        estoqueEntity.setCodigo(digestoque1+"."+digestoque2);
                        estoqueEntity.setQuantidade(estoque);
                        estoqueEntity.setValor(entity.getValor());
                        estoqueEntity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValor()));
                        estoqueEntity.setValorTotalEstoque(estoqueEntity.getValor() * estoqueEntity.getQuantidade());
                        estoqueEntity.setValorTotalEstoqueFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValorTotalEstoque()));
                        estoqueEntity.setTimeStamp(LocalDateTime.now());
                        estoqueRepository.save(estoqueEntity);
                        entity.setEstoque(estoqueEntity);
                        produtoRepository.save(entity);
                        notaFiscal.getProdutos().add(entity);
                        notaFiscalRepository.save(notaFiscal);
                        ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                                entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(),estoqueEntity.getQuantidade());
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

    public ResponseEntity<ProdutoDTO> EditarProduto(Long id,
                                                    String nome,
                                                    String descriacao,
                                                     int quantidade,
                                                    MEDIDA medida,
                                                    Double estoque,
                                                    Long idNotaFiscal,
                                                    Double valorEmNota,
                                                    Double impostoAplicado,
                                                    Double porcentagemLucro,
                                                    Double valorFrete,
                                                    Double valorCusto)
    {
        try
        {
            if( id != null &&
                nome != null &&
                descriacao != null &&
                quantidade > 0 &&
                medida != null &&
                estoque != null &&
                valorEmNota != null &&
                impostoAplicado != null &&
                porcentagemLucro != null &&
                idNotaFiscal != null)
            {
                if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(valorCusto < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(valorFrete < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(valorEmNota < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                NotaFiscalEntity notaFiscal = notaFiscalRepository.findById(idNotaFiscal).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                if( notaFiscal.getValorFatorado() + valorEmNota > notaFiscal.getValor())
                { throw new IllegalActionException("Ops! algo errado");}
                if(notaFiscal.getValorFatorado() + valorEmNota == notaFiscal.getValor())
                { notaFiscal.setNotaNaturada(true);}
                if(notaFiscal.getNotaNaturada() == true){throw new IllegalActionException("Ops! algo errado");}
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


                ProdutoEntity entity = produtoRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                entity.setNome(nome);
                entity.setDescricao(descriacao);
                entity.setMedida(medida);
                entity.setCodigo(codigo);
                entity.setQuantidade(quantidade);
                entity.setValor(valorUnitario);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                entity.setDataEntrada(LocalDate.now());
                entity.setTimeStamp(LocalDateTime.now());
                EstoqueEntity estoqueEntity = new EstoqueEntity();
                estoqueEntity.setNome(entity.getNome());
                estoqueEntity.setDescricao(entity.getDescricao());
                estoqueEntity.setCodigo(digestoque1+"."+digestoque2);
                estoqueEntity.setQuantidade(estoque);
                estoqueEntity.setValor(entity.getValor());
                estoqueEntity.setValorTotalEstoque(estoqueEntity.getValor() * estoqueEntity.getQuantidade());
                estoqueEntity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValor()));
                estoqueEntity.setValorTotalEstoqueFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValorTotalEstoque()));
                estoqueEntity.setTimeStamp(LocalDateTime.now());
                estoqueRepository.save(estoqueEntity);
                entity.setEstoque(estoqueEntity);
                produtoRepository.save(entity);
                notaFiscal.setValorFatorado(notaFiscal.getValorFatorado()+ valorEmNota);
                notaFiscal.getProdutos().add(entity);
                notaFiscalRepository.save(notaFiscal);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(), estoqueEntity.getQuantidade());
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


    public ResponseEntity<ProdutoDTO> AdicionarEstoqueProduto(Long id,
                                                              Long idNotaFiscal,
                                                              Double valorEmNota,
                                                              Double impostoAplicado,
                                                              Double porcentagemLucro,
                                                              Double valorFrete,
                                                              Double valorCusto,
                                                              Double estoque )
    {
        try
        {
            if(id != null &&
               idNotaFiscal != null &&
               valorEmNota != null &&
               impostoAplicado != null &&
               porcentagemLucro != null &&
               estoque != null)
            {
                if(valorEmNota < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(impostoAplicado < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(porcentagemLucro < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(valorCusto < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(valorFrete < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                if(estoque < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                NotaFiscalEntity notaFiscal = notaFiscalRepository.findById(idNotaFiscal).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                if( notaFiscal.getValorFatorado() + valorEmNota > notaFiscal.getValor())
                { throw new IllegalActionException("Ops! algo errado");}
                if(notaFiscal.getValorFatorado() + valorEmNota == notaFiscal.getValor())
                { notaFiscal.setNotaNaturada(true);}
                if(notaFiscal.getNotaNaturada() == true){throw new IllegalActionException("Ops! algo errado");}
                ProdutoEntity entity = produtoRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                EstoqueEntity estoqueEntity = estoqueRepository.findById(entity.getEstoque().getId()).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                Double valorParcial = 0.0;
                Double valorTotal = 0.0;
                Double valorUnitario = 0.0;
                Double imposto = impostoAplicado /100;
                Double lucro = porcentagemLucro /100;

                valorParcial = (valorEmNota * imposto) + valorEmNota;
                valorTotal = valorParcial + valorCusto + valorFrete;
                valorTotal = (valorTotal * lucro) + valorTotal;
                valorUnitario = valorTotal / estoque;


                if(entity.getValor() < valorUnitario)
                {
                    entity.setValor(valorUnitario);
                    entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValor()));
                    estoqueEntity.setValor(entity.getValor());
                    estoqueEntity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValor()));
                    estoqueRepository.save(estoqueEntity);
                }
                entity.setTimeStamp(LocalDateTime.now());
                entity.setDataEntrada(LocalDate.now());
                produtoRepository.save(entity);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(), estoqueEntity.getQuantidade());
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

    public ResponseEntity<ProdutoDTO> ReajustePreco(Long id,
                                                    Double porcentagem)
    {
        try
        {
            if(id != null &&
                    porcentagem != null)
            {
                if(porcentagem < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ProdutoEntity entity = produtoRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                Double porcentagemCalculo = porcentagem/100;
                Double novoPreco = (entity.getValor()*porcentagemCalculo) + entity.getValor();
                System.out.println("valor: "+entity.getValor());
                System.out.println("novo valor: "+novoPreco);
                entity.setValor(novoPreco);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(novoPreco));
                EstoqueEntity estoqueEntity = estoqueRepository.findById(entity.getEstoque().getId()).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                estoqueEntity.setValor(entity.getValor());
                estoqueEntity.setValorTotalEstoque(estoqueEntity.getValor() * estoqueEntity.getQuantidade());
                estoqueEntity.setValorTotalEstoqueFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValorTotalEstoque()));
                produtoRepository.save(entity);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(),estoqueEntity.getQuantidade());
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

    public ResponseEntity<ProdutoDTO> QueimaEstoque(Long id,
                                                    Double porcentagem)
    {
        try
        {
            if(id != null &&
                    porcentagem != null)
            {
                if(porcentagem < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                ProdutoEntity entity = produtoRepository.findById(id).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                Double porcentagemCalculo = porcentagem/100;
                Double novoPreco = (entity.getValor()*porcentagemCalculo) - entity.getValor();
                System.out.println("valor: "+entity.getValor());
                System.out.println("novo valor: "+novoPreco);
                entity.setValor(novoPreco);
                entity.setValorFront(NumberFormat.getCurrencyInstance(localBrasil).format(novoPreco));
                EstoqueEntity estoqueEntity = estoqueRepository.findById(entity.getEstoque().getId()).orElseThrow(
                        () -> new EntityNotFoundException()
                );
                estoqueEntity.setValor(entity.getValor());
                estoqueEntity.setValorTotalEstoque(estoqueEntity.getValor() * estoqueEntity.getQuantidade());
                estoqueEntity.setValorTotalEstoqueFront(NumberFormat.getCurrencyInstance(localBrasil).format(estoqueEntity.getValorTotalEstoque()));
                produtoRepository.save(entity);
                ProdutoDTO response = new ProdutoDTO(entity.getNome()+" "+entity.getQuantidade()+entity.getMedida(),
                        entity.getDescricao(),entity.getQuantidade(), entity.getMedida(), entity.getCodigo(), entity.getValor(),entity.getDataEntrada(),estoqueEntity.getQuantidade());
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
    /*
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



    */
}
