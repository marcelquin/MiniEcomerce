package App.Financeiro.Service;

import App.Entity.ItemPedidoEntity;
import App.Entity.PagamentoEntity;
import App.Entity.PedidoEntity;
import App.Enum.FORMAPAGAMENTO;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.NullargumentsException;
import App.Financeiro.DTO.PedidosDTO;
import App.Financeiro.DTO.RelatorioAnualDTO;
import App.Financeiro.DTO.RelatorioDiarioDTO;
import App.Financeiro.DTO.RelatorioMensalDTO;
import App.Financeiro.Entity.DebitosEntity;
import App.Financeiro.Entity.RelatorioMensalEntity;
import App.Financeiro.Entity.VendasEntity;
import App.Financeiro.Repository.DebitosRepository;
import App.Financeiro.Repository.RelatorioMensalRepository;
import App.Financeiro.Repository.VendasRepository;
import App.Repository.PagamentoRepository;
import App.Repository.PedidoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class RelatorioMensalService {

    private final PedidoRepository pedidoRepository;
    private final PagamentoRepository pagamentoRepository;
    private final VendasRepository vendasRepository;
    private final DebitosRepository debitosRepository;
    private final RelatorioMensalRepository relatorioMensalRepository;
    Locale localBrasil = new Locale("pt", "BR");

    public RelatorioMensalService(PedidoRepository pedidoRepository, PagamentoRepository pagamentoRepository, VendasRepository vendasRepository, DebitosRepository debitosRepository, RelatorioMensalRepository relatorioMensalRepository) {
        this.pedidoRepository = pedidoRepository;
        this.pagamentoRepository = pagamentoRepository;
        this.vendasRepository = vendasRepository;
        this.debitosRepository = debitosRepository;
        this.relatorioMensalRepository = relatorioMensalRepository;
    }

    public ResponseEntity<List<RelatorioMensalEntity>> ListarRelatorios()
    {
        try
        {
            return new ResponseEntity<>(relatorioMensalRepository.findAll(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<List<RelatorioDiarioDTO>> BuscarRelatorioDiario()
    {
        try
        {
            RelatorioMensalEntity relatorioMensal = relatorioMensalRepository.findBymesReferencia(LocalDate.now().getMonth().getValue()).orElseThrow(
                    ()-> new EntityNotFoundException()
            );
            List<RelatorioDiarioDTO> response = new ArrayList<>();
            List<PedidosDTO> pedidosDTOS = new ArrayList<>();
            for(PedidoEntity pg : relatorioMensal.getVendas().getVendasRealizadas())
            {
                if(pg.getPagamento().getDataPagamento().getDayOfMonth() == LocalDate.now().getDayOfMonth())
                {
                    List<String> iten = new ArrayList<>();
                    for(ItemPedidoEntity itemPedido : pg.getProdutos())
                    {
                        iten.add(itemPedido.getProduto().getNome());
                    }
                    PedidosDTO pedidosDTO = new PedidosDTO(pg.getNomeCLiente(),pg.getCpfCnpj(),iten,pg.getValorTotal(),
                                                           pg.getDataPedido(),pg.getPagamento().getDataPagamento(),pg.getPagamento().getFormaPagamento(),
                                                           pg.getPagamento().getParcelas().intValue() );
                    pedidosDTOS.add(pedidosDTO);
                }
            }
            RelatorioDiarioDTO relatorioDiarioDTO = new RelatorioDiarioDTO(LocalDate.now().getDayOfMonth(),
                                                                           relatorioMensal.getTotalVendasDebito(),
                                                                           relatorioMensal.getTotalVendasCredito(),
                                                                           relatorioMensal.getTotalVendasDinheiro(),
                                                                           relatorioMensal.getTotalVendasPix(),
                                                                           relatorioMensal.getTotalVendas(),
                                                                           relatorioMensal.getTotalDebitos(),
                                                                           pedidosDTOS);
            response.add(relatorioDiarioDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<List<RelatorioMensalDTO>> BuscarRelatorioMensal()
    {
        try
        {
            RelatorioMensalEntity relatorioMensal = relatorioMensalRepository.findBymesReferencia(LocalDate.now().getMonth().getValue()).orElseThrow(
                ()-> new EntityNotFoundException()
        );
        List<RelatorioMensalDTO> response = new ArrayList<>();
        List<PedidosDTO> pedidosDTOS = new ArrayList<>();
        for(PedidoEntity pg : relatorioMensal.getVendas().getVendasRealizadas())
        {
            List<String> iten = new ArrayList<>();
            for(ItemPedidoEntity itemPedido : pg.getProdutos())
            {
                iten.add(itemPedido.getProduto().getNome());
            }
            PedidosDTO pedidosDTO = new PedidosDTO(pg.getNomeCLiente(),pg.getCpfCnpj(),iten,pg.getValorTotal(),
                    pg.getDataPedido(),pg.getPagamento().getDataPagamento(),pg.getPagamento().getFormaPagamento(),
                    pg.getPagamento().getParcelas().intValue() );
            pedidosDTOS.add(pedidosDTO);
        }
        RelatorioMensalDTO dto = new RelatorioMensalDTO(LocalDate.now().getMonth().getValue(),
                                                        relatorioMensal.getTotalVendasDebito(),
                                                        relatorioMensal.getTotalVendasCredito(),
                                                        relatorioMensal.getTotalVendasDinheiro(),
                                                        relatorioMensal.getTotalVendasPix(),
                                                        relatorioMensal.getTotalVendas(),
                                                        relatorioMensal.getTotalDebitos(),
                                                        pedidosDTOS);
        response.add(dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<List<RelatorioAnualDTO>> BuscarRelatorioAnual()
    {
        try
        {
            List<RelatorioMensalEntity> relatorioMensalEntityList = relatorioMensalRepository.findAll();
            List<RelatorioAnualDTO> response = new ArrayList<>();
            List<PedidosDTO> pedidosDTOS = new ArrayList<>();
            Double valorVendaDinheiro = 0.0;
            Double valorVendaPix = 0.0;
            Double valorVendaCredito = 0.0;
            Double valorVendaDebito = 0.0;
            Double totalDebitos = 0.0;
            for(RelatorioMensalEntity relatorioMensal : relatorioMensalEntityList)
            {
                valorVendaDebito += relatorioMensal.getVendas().getTotalVendasDebito();
                valorVendaCredito += relatorioMensal.getVendas().getTotalVendasCredito();
                valorVendaDinheiro += relatorioMensal.getVendas().getTotalVendasDinheiro();
                valorVendaPix += relatorioMensal.getVendas().getTotalVendasPix();
                totalDebitos += relatorioMensal.getDebitos().getValorTotalBoletos();
                for(PedidoEntity pg : relatorioMensal.getVendas().getVendasRealizadas())
                {
                    List<String> iten = new ArrayList<>();
                    for(ItemPedidoEntity itemPedido : pg.getProdutos())
                    {
                        iten.add(itemPedido.getProduto().getNome());
                    }
                    PedidosDTO pedidosDTO = new PedidosDTO(pg.getNomeCLiente(),pg.getCpfCnpj(),iten,pg.getValorTotal(),
                            pg.getDataPedido(),pg.getPagamento().getDataPagamento(),pg.getPagamento().getFormaPagamento(),
                            pg.getPagamento().getParcelas().intValue() );
                    pedidosDTOS.add(pedidosDTO);
                }
            }
            Double valorTotalVenda = valorVendaDebito + valorVendaCredito + valorVendaDinheiro + valorVendaPix;
            RelatorioAnualDTO dto = new RelatorioAnualDTO(LocalDate.now().getYear(),
                                                          NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaDebito),
                                                          NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaCredito),
                                                          NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaDinheiro),
                                                          NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaPix),
                                                          NumberFormat.getCurrencyInstance(localBrasil).format(valorTotalVenda),
                                                          NumberFormat.getCurrencyInstance(localBrasil).format(totalDebitos),
                                                          pedidosDTOS
                                                          );
            response.add(dto);
            return  new ResponseEntity<>(response,HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<RelatorioMensalEntity> NovoLancamentoVendas(Long idPedido)
    {
        try
        {
            //encontra pedido
            if(idPedido != null)
            {
                PedidoEntity vendaRealizada = pedidoRepository.findById(idPedido).orElseThrow(
                        ()->new EntityNotFoundException()
                );
                //encontra relatório por mes referencia
                if(!relatorioMensalRepository.existsBymesReferencia(LocalDate.now().getMonth().getValue()))
                {
                    RelatorioMensalEntity relatorioMensal = new RelatorioMensalEntity();
                    relatorioMensal.setTimeStamp(LocalDateTime.now());
                    VendasEntity vendas = new VendasEntity();
                    vendas.setTimeStamp(LocalDateTime.now());
                    vendas.setTotalVendasDinheiro(0.0);
                    vendas.setTotalVendasCredito(0.0);
                    vendas.setTotalVendasDebito(0.0);
                    vendas.setTotalVendasPix(0.0);
                    vendas.setTotalVendas(0.0);
                    DebitosEntity debitos = new DebitosEntity();
                    debitos.setTimeStamp(LocalDateTime.now());
                    debitos.setValorTotalBoletos(0.0);
                    vendasRepository.save(vendas);
                    debitosRepository.save(debitos);
                    relatorioMensal.setVendas(vendas);
                    relatorioMensal.setDebitos(debitos);
                    relatorioMensal.setMesReferencia(LocalDate.now().getMonth().getValue());
                    relatorioMensal.setAnoReferencia(LocalDate.now().getYear());
                    relatorioMensal.setTotalVendasDinheiro(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasDinheiro()));
                    relatorioMensal.setTotalVendasCredito(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasCredito()));
                    relatorioMensal.setTotalVendasDebito(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasDebito()));
                    relatorioMensal.setTotalVendasPix(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasPix()));
                    relatorioMensal.setTotalVendas(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendas()));
                    relatorioMensal.setTotalDebitos(NumberFormat.getCurrencyInstance(localBrasil).format(debitos.getValorTotalBoletos()));
                    relatorioMensalRepository.save(relatorioMensal);
                }
                RelatorioMensalEntity relatorioMensal = relatorioMensalRepository.findBymesReferencia(LocalDate.now().getMonth().getValue()).orElseThrow(
                        ()->new EntityNotFoundException()
                );
                VendasEntity vendas = vendasRepository.findById(relatorioMensal.getVendas().getId()).orElseThrow(
                        ()->new EntityNotFoundException()
                );
                if(vendaRealizada.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.CREDITO)
                {
                    vendas.setTotalVendasCredito(vendas.getTotalVendasCredito()+ vendaRealizada.getValorTotal());
                    relatorioMensal.setTotalVendasCredito(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasCredito()));
                }
                if(vendaRealizada.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.DEBITO)
                {
                    vendas.setTotalVendasDebito(vendas.getTotalVendasDebito()+ vendaRealizada.getValorTotal());
                    relatorioMensal.setTotalVendasDebito(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasDebito()));
                }
                if(vendaRealizada.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.DINHEIRO)
                {
                    vendas.setTotalVendasDinheiro(vendas.getTotalVendasDinheiro()+ vendaRealizada.getValorTotal());
                    relatorioMensal.setTotalVendasDinheiro(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasDinheiro()));
                }
                if(vendaRealizada.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.PIX)
                {
                    vendas.setTotalVendasPix(vendas.getTotalVendasPix()+ vendaRealizada.getValorTotal());
                    relatorioMensal.setTotalVendasPix(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasPix()));
                }
                vendas.setTotalVendas(vendas.getTotalVendasCredito() +
                                      vendas.getTotalVendasDebito() +
                                      vendas.getTotalVendasDinheiro() +
                                      vendas.getTotalVendasPix());
                vendas.getVendasRealizadas().add(vendaRealizada);
                relatorioMensal.setTotalVendas(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendas()));
                relatorioMensal.setTimeStamp(LocalDateTime.now());
                vendas.setTimeStamp(LocalDateTime.now());
                vendasRepository.save(vendas);
                relatorioMensalRepository.save(relatorioMensal);
                return new ResponseEntity<>(relatorioMensal,HttpStatus.OK);
            }
            else
            {throw new NullargumentsException(); }
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }


}
