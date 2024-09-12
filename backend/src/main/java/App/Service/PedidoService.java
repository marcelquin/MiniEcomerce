package App.Service;

import App.DTO.CaixaResponseDTO;
import App.DTO.ItemPedidoDTO;
import App.DTO.PedidoDTO;
import App.DTO.PedidoResponseDTO;
import App.Entity.*;
import App.Enum.*;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.IllegalActionException;
import App.Exceptions.NullargumentsException;
import App.Financeiro.Service.RelatorioMensalService;
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
    private final ClienteEmpresaRepository clienteEmpresaRepository;
    private final RelatorioMensalService relatorioMsService;

    Locale localBrasil = new Locale("pt", "BR");
    public PedidoService(ClienteRepository clienteRepository, ProdutoRepository produtoRepository, PedidoRepository pedidoRepository, ItemPedidoRepository itemPedidoRepository, PagamentoRepository pagamentoRepository, EstoqueRepository estoqueRepository, EntregaRepository entregaRepository, ClienteEmpresaRepository clienteEmpresaRepository, RelatorioMensalService relatorioMsService) {
        this.clienteRepository = clienteRepository;
        this.produtoRepository = produtoRepository;
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
        this.pagamentoRepository = pagamentoRepository;
        this.estoqueRepository = estoqueRepository;
        this.entregaRepository = entregaRepository;
        this.clienteEmpresaRepository = clienteEmpresaRepository;
        this.relatorioMsService = relatorioMsService;
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

    public ResponseEntity<PedidoResponseDTO> BuscarPedidoPorId(Long id)
    {
        try
        {
            PedidoEntity entity = pedidoRepository.findById(id).orElseThrow(
                    ()-> new EntityNotFoundException()
            );
            List<ItemPedidoDTO> itens = new ArrayList<>();
            for(ItemPedidoEntity item: entity.getProdutos())
            {
                ItemPedidoDTO dto = new ItemPedidoDTO(
                        item.getProduto().getNome(),
                        item.getProduto().getCodigo(),
                        item.getProduto().getDescricao(),
                        item.getQuantidade(),
                        NumberFormat.getCurrencyInstance(localBrasil).format(item.getProduto().getValor()),
                        NumberFormat.getCurrencyInstance(localBrasil).format(item.getProduto().getValor() * item.getQuantidade()));
                itens.add(dto);
            }
            if(entity.getPagamento() == null)
            {
                PedidoResponseDTO response = new PedidoResponseDTO(entity.getCodigo(),
                        entity.getCliente().getNome(),
                        entity.getCliente().getSobrenome(),
                        "("+entity.getCliente().getContato().getPrefixo()+") "+entity.getCliente().getContato().getTelefone(),
                        entity.getDataPedido(),
                        itens,
                        "R$ 0.00",
                        NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()),
                        "R$ 0.00",
                        "R$ 0.00",
                        entity.getStatus(),
                        null,
                        null,
                        null);
                return new ResponseEntity<>(response,HttpStatus.CREATED);
            }
            else
            {
                PedidoResponseDTO response = new PedidoResponseDTO(entity.getCodigo(),
                        entity.getCliente().getNome(),
                        entity.getCliente().getSobrenome(),
                        "("+entity.getCliente().getContato().getPrefixo()+") "+entity.getCliente().getContato().getTelefone(),
                        entity.getDataPedido(),
                        itens,
                        NumberFormat.getCurrencyInstance(localBrasil).format(entity.getPagamento().getValorPago()),
                        NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()),
                        NumberFormat.getCurrencyInstance(localBrasil).format(entity.getPagamento().getValorDesconto()),
                        NumberFormat.getCurrencyInstance(localBrasil).format(entity.getPagamento().getValorTroco()),
                        entity.getStatus(),
                        entity.getPagamento().getDataPagamento(),
                        entity.getPagamento().getFormaPagamento(),
                        entity.getPagamento().getParcelas());
                return new ResponseEntity<>(response,HttpStatus.OK);
            }

        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<CaixaResponseDTO> BuscarPedidoPorIdCaixa(Long id)
    {
        try
        {
            PedidoEntity entity = pedidoRepository.findById(id).orElseThrow(
                    ()-> new EntityNotFoundException()
            );
            List<ItemPedidoDTO> itens = new ArrayList<>();
            for(ItemPedidoEntity item: entity.getProdutos())
            {
                ItemPedidoDTO dto = new ItemPedidoDTO(item.getProduto().getNome(),
                                                      item.getProduto().getCodigo(),
                                                      item.getProduto().getDescricao(),
                                                      item.getQuantidade(),
                                                      NumberFormat.getCurrencyInstance(localBrasil).format(item.getProduto().getValor()),
                                                      NumberFormat.getCurrencyInstance(localBrasil).format(item.getProduto().getValor() * item.getQuantidade()));
                itens.add(dto);
            }
            CaixaResponseDTO response = new CaixaResponseDTO(entity.getCodigo(),
                                                            entity.getCliente().getNome(),
                                                            entity.getCliente().getSobrenome(),
                                                            "("+entity.getCliente().getContato().getPrefixo()+") "+entity.getCliente().getContato().getTelefone(),
                                                            entity.getDataPedido(),
                                                            itens,
                                                            NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }


    public ResponseEntity<PedidoDTO> NovoPedido(Long idCliente,
                                                String clienteNome)
    {
        try
        {
            if(idCliente != null)
            {
                PedidoEntity entity = new PedidoEntity();
                if(clienteRepository.existsById(idCliente))
                {
                    ClienteEntity cliente = clienteRepository.findById(idCliente).get();
                    entity.setCliente(cliente);
                    entity.setNomeCLiente(cliente.getNome()+" "+cliente.getSobrenome());
                    entity.setCpfCnpj(cliente.getCpf());
                } else if (clienteEmpresaRepository.existsById(idCliente))
                {
                    ClienteEmpresaEntity clienteEmpresa = clienteEmpresaRepository.findById(idCliente).get();
                    entity.setClienteEmpresa(clienteEmpresa);
                    entity.setNomeCLiente(clienteEmpresa.getRazaoSocial());
                    entity.setCpfCnpj(clienteEmpresa.getCnpj());
                }
                else
                { throw  new EntityNotFoundException();}

                int dig = (int) (1111 + Math.random() * 9999);
                entity.setTimeStamp(LocalDateTime.now());
                entity.setDataPedido(LocalDateTime.now());
                entity.setValorTotal(0.0);
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
                entity.setCodigo("Pd_"+dig);
                entity.setStatus(STATUS.AGUARDANDO);
                pedidoRepository.save(entity);
                PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),null,df.format(entity.getValorTotal()),entity.getPagamento().getFormaPagamento(), entity.getPagamento().getDataPagamento());
                return new ResponseEntity<>(response,HttpStatus.CREATED);
            }
            if(clienteNome != null)
            {
                PedidoEntity entity = new PedidoEntity();
                int dig = (int) (1111 + Math.random() * 9999);
                entity.setTimeStamp(LocalDateTime.now());
                entity.setNomeCLiente(clienteNome);
                entity.setDataPedido(LocalDateTime.now());
                entity.setValorTotal(0.0);
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
                entity.setCodigo("Pd_"+dig);
                entity.setStatus(STATUS.AGUARDANDO);
                pedidoRepository.save(entity);
                PedidoDTO response = new PedidoDTO(entity.getCodigo(),entity.getCliente().getNome(),null,df.format(entity.getValorTotal()),entity.getPagamento().getFormaPagamento(), entity.getPagamento().getDataPagamento());
                return new ResponseEntity<>(response,HttpStatus.CREATED);
            }
            if(idCliente == null && clienteNome == null){throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public void AdicionarProdutoPedido(Long id,
                                       Long idProduto,
                                       Double quantidade)
    {
        try
        {
            if(id != null &&
               idProduto != null &&
               quantidade != null)
            {
                if(quantidade < 0) {throw new IllegalActionException("O campo não pode ser negativo");}
                PedidoEntity entity = pedidoRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                EstoqueEntity produto = estoqueRepository.findById(idProduto).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                if(quantidade <= produto.getQuantidade())
                {
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
                    if(produto.getQuantidade() > 30)
                    {
                        ProdutoEntity produtoEntity = produtoRepository.findBynome(produto.getNome()).orElseThrow(
                                ()-> new EntityNotFoundException()
                        );
                        produtoEntity.setNotificacao("produto abaixo do estoque, efetue novo pedido para evitar falta do mesmo.");
                        produtoRepository.save(produtoEntity);
                    }
                    estoqueRepository.save(produto);
                }

            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }

    public void FinalizarPedido(Long id,
                                FORMAPAGAMENTO formaPagamento,
                                Double parcelas,
                                Double valorPago,
                                Double desconto,
                                TIPOCOMPRA tipocompra)
    {
        try
        {
            if(id != null &&
                    formaPagamento != null &&
                    tipocompra != null )
            {
                if(parcelas < 0){throw new IllegalActionException("O campo não pode ser negativo");}
                if(valorPago < 0){throw new IllegalActionException("O campo não pode ser negativo");}
                if(desconto < 0){throw new IllegalActionException("O campo não pode ser negativo");}
                if(formaPagamento != FORMAPAGAMENTO.CREDITO && parcelas > 1)
                {throw new IllegalActionException("Somente compras no crédito podem ser parceladas");}
                PedidoEntity entity = pedidoRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                Double valorTotal = entity.getValorTotal();
                Double valorDesconto = 0.0;
                Double porcentagem = 0.0;
                Double troco = 0.0;
                // calculo personalizado para dinheiro

                PagamentoEntity pagamento = new PagamentoEntity();
                pagamento.setFormaPagamento(formaPagamento);
                pagamento.setParcelas(parcelas);
                if(desconto != null)
                {
                    porcentagem = desconto /100; //0.2
                    valorDesconto = entity.getValorTotal() * porcentagem;
                    valorTotal = entity.getValorTotal() - valorDesconto;
                    troco = valorPago - valorTotal;
                }
                if(formaPagamento == FORMAPAGAMENTO.DINHEIRO)
                {
                    if(valorPago != null)
                    {
                        pagamento.setValorPago(valorPago);
                        pagamento.setValorTroco(valorPago - valorTotal);
                        pagamento.setValorDesconto(valorDesconto);
                    }
                }
                else
                {
                    pagamento.setValorDesconto(valorDesconto);
                    pagamento.setValorPago(valorTotal);
                    pagamento.setValorTroco(0.0);
                }
                pagamento.setValor(valorTotal);
                entity.setValorTotal(valorTotal);
                entity.setValorTotalFront(NumberFormat.getCurrencyInstance(localBrasil).format(entity.getValorTotal()));
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
                    //
                    if(entity.getCliente() != null){
                        entrega.setNomeCliente(entity.getNomeCLiente());
                        entrega.setEnderecoEntrega(entity.getCliente().getEndereco().getLogradouro()+", "+
                                entity.getCliente().getEndereco().getNumero()+", "+
                                entity.getCliente().getEndereco().getBairro()+", "+
                                entity.getCliente().getEndereco().getReferencia()+", "+
                                entity.getCliente().getEndereco().getCep()+", "+
                                entity.getCliente().getEndereco().getCidade()+", "+
                                entity.getCliente().getEndereco().getEstado());
                        entrega.setTelefoneContato("("+entity.getCliente().getContato().getPrefixo()+") "+entity.getCliente().getContato().getTelefone());
                    }
                    else
                    {
                        entrega.setNomeCliente(entity.getNomeCLiente());
                        entrega.setEnderecoEntrega(entity.getClienteEmpresa().getEndereco().getLogradouro()+", "+
                                entity.getClienteEmpresa().getEndereco().getNumero()+", "+
                                entity.getClienteEmpresa().getEndereco().getBairro()+", "+
                                entity.getClienteEmpresa().getEndereco().getReferencia()+", "+
                                entity.getClienteEmpresa().getEndereco().getCep()+", "+
                                entity.getClienteEmpresa().getEndereco().getCidade()+", "+
                                entity.getClienteEmpresa().getEndereco().getEstado());
                        entrega.setTelefoneContato("("+entity.getClienteEmpresa().getContato().getPrefixo()+") "+entity.getClienteEmpresa().getContato().getTelefone());
                    }
                    //

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
                List<String> itens = new ArrayList<>();
                for(ItemPedidoEntity item : entity.getProdutos())
                {
                    itens.add(item.getQuantidade()+"x "+item.getProduto().getNome()+" ");
                }
                System.out.println("depois: "+pagamento.getParcelas());
                relatorioMsService.NovoLancamentoVendas(entity.getNomeCLiente(),
                                                        entity.getCpfCnpj(),
                                                        entity.getCodigo(),
                                                        itens,
                                                        StatusPagamento.PAGO,
                                                        entity.getDataPedido(),
                                                        valorTotal,
                                                        pagamento.getParcelas(),
                                                        pagamento.getFormaPagamento());
            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }

    public void AtencaoEntrega(Long id,
                                String motivo)
    {
        try
        {
            if(id != null &&
              motivo != null)
            {
                PedidoEntity entity = pedidoRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                EntregaEntity entrega =  entregaRepository.findById(entity.getEntrega().getId()).orElseThrow(
                    ()-> new EntityNotFoundException()
            );
                if(entrega.getStatusEntrega() == STATUSENTREGA.EM_ROTA)
                {
                   entrega.setStatusEntrega(STATUSENTREGA.AGUARDANDO);
                   entity.setNotificacao(motivo);
                   entrega.setNotificacao(motivo);
                   entregaRepository.save(entrega);
                   pedidoRepository.save(entity);
                }
            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }
    public void CancelarEntrega(Long id,
                               String motivo)
    {
        try
        {
            if(id != null &&
                    motivo != null)
            {
                PedidoEntity entity = pedidoRepository.findById(id).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                EntregaEntity entrega =  entregaRepository.findById(entity.getEntrega().getId()).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                    entrega.setStatusEntrega(STATUSENTREGA.CANCELADA);
                    entrega.setDataCancelamento(LocalDateTime.now());
                    entity.setNotificacao(motivo);
                    entrega.setNotificacao(motivo);
                    entity.setTimeStamp(LocalDateTime.now());
                    entregaRepository.save(entrega);
                    pedidoRepository.save(entity);
            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }


}
