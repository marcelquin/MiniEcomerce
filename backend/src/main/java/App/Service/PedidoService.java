package App.Service;

import App.DTO.PedidoDTO;
import App.Entity.*;
import App.Enum.FORMAPAGAMENTO;
import App.Enum.STATUS;
import App.Enum.STATUSENTREGA;
import App.Enum.TIPOCOMPRA;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.IllegalActionException;
import App.Exceptions.NullargumentsException;
import App.Repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class PedidoService {

    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;
    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;
    private final PagamentoRepository pagamentoRepository;
    private final EstoqueRepository estoqueRepository;
    private final EntregaRepository entregaRepository;
    Locale localBrasil = new Locale("pt", "BR");
    public PedidoService(ClienteRepository clienteRepository, ProdutoRepository produtoRepository, PedidoRepository pedidoRepository, ItemPedidoRepository itemPedidoRepository, PagamentoRepository pagamentoRepository, EstoqueRepository estoqueRepository, EntregaRepository entregaRepository) {
        this.clienteRepository = clienteRepository;
        this.produtoRepository = produtoRepository;
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
        this.pagamentoRepository = pagamentoRepository;
        this.estoqueRepository = estoqueRepository;
        this.entregaRepository = entregaRepository;
    }

    DecimalFormat df= new DecimalFormat("#,####.##");
    public ResponseEntity<List<PedidoEntity>> ListarPedidos()
    {
        try
        {
            return new ResponseEntity<>(pedidoRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<List<PedidoEntity>> ListarPedidosAbertos()
    {
        try
        {
            List<PedidoEntity> lista = new ArrayList<>();
            lista = pedidoRepository.findAll();
            List<PedidoEntity> response = new ArrayList<>();
            for(PedidoEntity entity : lista)
            {
                if(entity.getStatus() == STATUS.AGUARDANDO)
                {
                    response.add(entity);
                }
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<PedidoDTO> BuscarPedidoPorCodigo(String codigo)
    {
        try
        {
            PedidoEntity entity = pedidoRepository.findBycodigo(codigo).orElseThrow(
                    ()-> new EntityNotFoundException()
            );
            List<String> itens = new ArrayList<>();
            for(ItemPedidoEntity item: entity.getProdutos())
            {
                itens.add(item.getProduto().getNome());
            }
            PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),itens,df.format(entity.getValorTotal()),entity.getPagamento().getFormaPagamento(), entity.getPagamento().getDataPagamento());            return new ResponseEntity<>(response,HttpStatus.CREATED);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }


    public ResponseEntity<PedidoDTO> NovoPedido(String nomeCliente)
    {
        try
        {
            if(nomeCliente != null)
            {
                PedidoEntity entity = new PedidoEntity();
                ClienteEntity cliente = clienteRepository.findBynome(nomeCliente).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                int dig = (int) (1111 + Math.random() * 9999);
                entity.setTimeStamp(LocalDateTime.now());
                entity.setNomeCLiente(cliente.getNome());
                entity.setCliente(cliente);
                entity.setDataPedido(LocalDateTime.now());
                entity.setValorTotal(0.0);
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
                entity.setCodigo("Pd_"+dig);
                entity.setStatus(STATUS.AGUARDANDO);
                pedidoRepository.save(entity);
                List<String> itens = new ArrayList<>();
                for(ItemPedidoEntity item: entity.getProdutos())
                {
                    itens.add(item.getProduto().getNome());
                }
                PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),itens,df.format(entity.getValorTotal()),entity.getPagamento().getFormaPagamento(), entity.getPagamento().getDataPagamento());                return new ResponseEntity<>(response,HttpStatus.CREATED);
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

    public ResponseEntity<PedidoDTO> AdicionarProdutoPedido(String codigoPedido,
                                                            String codigoProduto,
                                                            Double quantidade)
    {
        try
        {
            if(codigoPedido != null &&
               codigoProduto != null &&
               quantidade != null)
            {
                if(quantidade < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                PedidoEntity entity = pedidoRepository.findBycodigo(codigoPedido).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                EstoqueEntity produto = estoqueRepository.findBycodigo(codigoProduto).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                ItemPedidoEntity itemPedido = new ItemPedidoEntity();
                itemPedido.setProduto(produto);
                itemPedido.setQuantidade(quantidade);
                itemPedido.setValorItem(produto.getValor() * quantidade);
                itemPedido.setTimeStamp(LocalDateTime.now());
                itemPedidoRepository.save(itemPedido);
                Double valorItem = itemPedido.getValorItem();
                entity.getProdutos().add(itemPedido);
                entity.setValorTotal(entity.getValorTotal()+valorItem);
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
                entity.setTimeStamp(LocalDateTime.now());
                pedidoRepository.save(entity);
                produto.setQuantidade(produto.getQuantidade() - quantidade);
                estoqueRepository.save(produto);
                System.out.println("adicionou");
                List<String> itens = new ArrayList<>();
                for(ItemPedidoEntity item: entity.getProdutos())
                {
                    itens.add(item.getProduto().getNome());
                }
                PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),itens,df.format(entity.getValorTotal()),entity.getPagamento().getFormaPagamento(), entity.getPagamento().getDataPagamento());
                return new ResponseEntity<>(response,HttpStatus.OK);
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

    public ResponseEntity<PedidoDTO> FinalizarPedido(String codigoPedido,
                                                     FORMAPAGAMENTO formaPagamento,
                                                     Double parcelas,
                                                     TIPOCOMPRA tipocompra)
    {
        try
        {
            if(codigoPedido != null &&
               formaPagamento != null &&
               parcelas != null &&
               tipocompra != null )
            {
                if(parcelas < 0){throw new IllegalActionException("O campo não pode ser negativo");}
                PedidoEntity entity = pedidoRepository.findBycodigo(codigoPedido).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                PagamentoEntity pagamento = new PagamentoEntity();
                pagamento.setFormaPagamento(formaPagamento);
                pagamento.setParcelas(parcelas);
                pagamento.setValor(entity.getValorTotal());
                pagamento.setDataPagamento(LocalDateTime.now());
                pagamento.setTimeStamp(LocalDateTime.now());
                pagamentoRepository.save(pagamento);
                entity.setStatus(STATUS.PAGO);
                entity.setPagamento(pagamento);
                entity.setTipocompra(tipocompra);
                if(tipocompra == TIPOCOMPRA.ENTREGA)
                {
                    EntregaEntity entrega = new EntregaEntity();
                    entrega.setStatusEntrega(STATUSENTREGA.AGUARDANDO);
                    entrega.setNomeCliente(entity.getNomeCLiente());
                    entrega.setEnderecoEntrega(entity.getCliente().getEndereco().getLogradouro()+", "+
                            entity.getCliente().getEndereco().getNumero()+", "+
                            entity.getCliente().getEndereco().getBairro()+", "+
                            entity.getCliente().getEndereco().getReferencia()+", "+
                            entity.getCliente().getEndereco().getCep()+", "+
                            entity.getCliente().getEndereco().getCidade()+", "+
                            entity.getCliente().getEndereco().getEstado());
                    entrega.setTelefoneContato("("+entity.getCliente().getContato().getPrefixo()+") "+entity.getCliente().getContato().getTelefone());
                    List<String> produtosList = new ArrayList<>();
                    for(ItemPedidoEntity item : entity.getProdutos())
                    {
                        produtosList.add(item.getQuantidade()+"x "+item.getProduto().getNome());
                    }
                    entrega.setProdutos(produtosList);
                    entrega.setTimeStamp(LocalDateTime.now());
                    entregaRepository.save(entrega);
                    entity.setEntrega(entrega);
                }
                pedidoRepository.save(entity);
                return new ResponseEntity<>(HttpStatus.OK);
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

     /*
    public ResponseEntity<PedidoDTO> AlterarClientePedido(String codigoPedido,
                                                          String nomeCliente)
    {
        try
        {
            if(codigoPedido != null && nomeCliente != null)
            {
                PedidoEntity entity = pedidoRepository.findBycodigo(codigoPedido).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                ClienteEntity cliente = clienteRepository.findBynome(nomeCliente).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                entity.setCliente(cliente);
                entity.setTimeStamp(LocalDateTime.now());
                pedidoRepository.save(entity);
                List<String> itens = new ArrayList<>();
                for(ItemPedidoEntity item: entity.getProdutos())
                {
                    itens.add(item.getProduto().getNome());
                }
                PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),itens,df.format(entity.getValorTotal()));
                return new ResponseEntity<>(response,HttpStatus.OK);
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

    public ResponseEntity<PedidoDTO> DeletarPedido(String codigoPedido)
    {
        try
        {
            if(codigoPedido != null)
            {
                PedidoEntity entity = pedidoRepository.findBycodigo(codigoPedido).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                for(ItemPedidoEntity item : entity.getProdutos())
                {
                    itemPedidoRepository.deleteById(item.getId());
                }
                pedidoRepository.deleteById(entity.getId());
                return new ResponseEntity<>(HttpStatus.OK);
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



     */
}
