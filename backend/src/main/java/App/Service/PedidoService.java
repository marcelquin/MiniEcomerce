package App.Service;

import App.DTO.PedidoDTO;
import App.Entity.ClienteEntity;
import App.Entity.ItemPedidoEntity;
import App.Entity.PedidoEntity;
import App.Entity.ProdutoEntity;
import App.Enum.STATUS;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.IllegalActionException;
import App.Exceptions.NullargumentsException;
import App.Repository.ClienteRepository;
import App.Repository.ItemPedidoRepository;
import App.Repository.PedidoRepository;
import App.Repository.ProdutoRepository;
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

    public PedidoService(ClienteRepository clienteRepository, ProdutoRepository produtoRepository, PedidoRepository pedidoRepository, ItemPedidoRepository itemPedidoRepository) {
        this.clienteRepository = clienteRepository;
        this.produtoRepository = produtoRepository;
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
    }
    /*
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
    /*
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
                itens.add(item.getProduto().getNome()+" "+item.getProduto().getQuantidade()+item.getProduto().getMedida());
            }
            PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),itens,df.format(entity.getValorTotal()));
            return new ResponseEntity<>(response,HttpStatus.CREATED);
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
                ClienteEntity cliente = clienteRepository.findBynome(nomeCliente).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                int dig = (int) (1111 + Math.random() * 9999);
                Locale localBrasil = new Locale("pt", "BR");
                PedidoEntity entity = new PedidoEntity();
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
                    itens.add(item.getProduto().getNome()+" "+item.getProduto().getQuantidade()+item.getProduto().getMedida());
                }
                PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),itens,df.format(entity.getValorTotal()));
                return new ResponseEntity<>(response,HttpStatus.CREATED);
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
                ProdutoEntity produto = produtoRepository.findBycodigo(codigoProduto).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                Locale localBrasil = new Locale("pt", "BR");
                ItemPedidoEntity itemPedido = new ItemPedidoEntity();
                itemPedido.setProduto(produto);
                itemPedido.setQuantidade(quantidade);
                itemPedido.setValorItem(produto.getValor() * quantidade);
                itemPedido.getProduto().setEstoque(itemPedido.getProduto().getEstoque() - quantidade);
                itemPedido.setTimeStamp(LocalDateTime.now());
                itemPedidoRepository.save(itemPedido);
                Double valorItem = itemPedido.getValorItem();
                entity.getProdutos().add(itemPedido);
                entity.setValorTotal(entity.getValorTotal()+valorItem);
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
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

    public ResponseEntity<PedidoDTO> FinalizarPedido(String codigoPedido)
    {
        try
        {
            if(codigoPedido != null)
            {
                PedidoEntity entity = pedidoRepository.findBycodigo(codigoPedido).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                entity.setStatus(STATUS.PAGO);
                entity.setDataPagamento(LocalDateTime.now());
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

     */
}
