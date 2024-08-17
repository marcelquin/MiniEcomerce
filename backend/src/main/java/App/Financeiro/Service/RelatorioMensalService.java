package App.Financeiro.Service;


import App.DTO.*;
import App.Entity.*;
import App.Enum.FORMAPAGAMENTO;
import App.Enum.StatusPagamento;
import App.Exceptions.EntityNotFoundException;
import App.Exceptions.NullargumentsException;

import App.Financeiro.DTO.*;
import App.Financeiro.Entity.*;
import App.Financeiro.repository.*;
import App.Repository.PagamentoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

@Service
public class RelatorioMensalService {

    private final VendasRepository vendasRepository;
    private final VendasRealizadaRepository vendasRealizadaRepository;
    private final DebitosRepository debitosRepository;
    private final RelatorioMensalRepository relatorioMensalRepository;
    private final BoletoRepository boletoRepository;
    private final PagamentoRepository pagamentoRepository;
    Locale localBrasil = new Locale("pt", "BR");

    public RelatorioMensalService(VendasRepository vendasRepository, VendasRealizadaRepository vendasRealizadaRepository, DebitosRepository debitosRepository, RelatorioMensalRepository relatorioMensalRepository, BoletoRepository boletoRepository, PagamentoRepository pagamentoRepository) {
        this.vendasRepository = vendasRepository;
        this.vendasRealizadaRepository = vendasRealizadaRepository;
        this.debitosRepository = debitosRepository;
        this.relatorioMensalRepository = relatorioMensalRepository;
        this.boletoRepository = boletoRepository;
        this.pagamentoRepository = pagamentoRepository;
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

    public ResponseEntity<RelatorioMensalDTO> BuscarRelatorioMensal()
    {
        try
        {
            RelatorioMensalEntity relatorioMensal = relatorioMensalRepository.findBydataReferencia(LocalDate.now().getMonth().getValue()+"/"+LocalDate.now().getYear()).orElseThrow(
                ()-> new EntityNotFoundException()
        );
         System.out.println("id entidade: "+relatorioMensal.getId());
        List<PedidosDTO> pedidosDTOS = new ArrayList<>();
        List<BoletosDTO> boletosDTOS = new ArrayList<>();
        for(VendasRealizdasEntity vendasRealizdas : relatorioMensal.getVendas().getVendasRealizdas())
        {
            PedidosDTO dto = new PedidosDTO(vendasRealizdas.getNomeCLiente(),
                                            vendasRealizdas.getDocumento(),
                                            vendasRealizdas.getCodigo(),
                                            vendasRealizdas.getItens(),
                                            vendasRealizdas.getPagamento().getParcelas(),
                                            vendasRealizdas.getPagamento().getValor(),
                                            vendasRealizdas.getStatusPagamento(),
                                            vendasRealizdas.getDataPedido(),
                                            vendasRealizdas.getPagamento().getDataPagamento(),
                                            vendasRealizdas.getPagamento().getFormaPagamento());
            pedidosDTOS.add(dto);
        }
            for(BoletoEntity boleto : relatorioMensal.getDebitos().getBoletos())
            {
                if(boleto.getPagamento() == null)
                {
                    BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                            boleto.getCnpj(),
                            boleto.getStatusPagamento(),
                            boleto.getDataVencimento(),
                            boleto.getParcelas(),
                            boleto.getParcelaAtual(),
                            boleto.getValorTotal(),
                            boleto.getValorParcela(),
                            null,
                            null,
                            null);
                    boletosDTOS.add(dto);
                }
                else
                {
                    BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                            boleto.getCnpj(),
                            boleto.getStatusPagamento(),
                            boleto.getDataVencimento(),
                            boleto.getParcelas(),
                            boleto.getParcelaAtual(),
                            boleto.getValorTotal(),
                            boleto.getValorParcela(),
                            boleto.getPagamento().getDataPagamento(),
                            boleto.getPagamento().getFormaPagamento(),
                            boleto.getPagamento().getParcelas());
                    boletosDTOS.add(dto);
                }
            }
        RelatorioMensalDTO response = new RelatorioMensalDTO(relatorioMensal.getDataReferencia(),
                                                        relatorioMensal.getTotalVendasDebito(),
                                                        relatorioMensal.getTotalVendasCredito(),
                                                        relatorioMensal.getTotalVendasDinheiro(),
                                                        relatorioMensal.getTotalVendasPix(),
                                                        relatorioMensal.getTotalVendas(),
                                                        relatorioMensal.getTotalDebitos(),
                                                        pedidosDTOS,
                                                        boletosDTOS);
            System.out.println("data referencia: "+response.dataReferencia());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<RelatorioMensalDTO> BuscarRelatorioMensalComParametros(int mesReferencia,
                                                                                 int anoReferencia)
    {
        try
        {
            if(mesReferencia > 0 && anoReferencia > 0)
            {
                RelatorioMensalEntity relatorioMensal = relatorioMensalRepository.findBydataReferencia(mesReferencia+"/"+anoReferencia).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                List<PedidosDTO> pedidosDTOS = new ArrayList<>();
                List<BoletosDTO> boletosDTOS  = new ArrayList<>();
                for(VendasRealizdasEntity vendasRealizdas : relatorioMensal.getVendas().getVendasRealizdas())
                {
                    PedidosDTO dto = new PedidosDTO(vendasRealizdas.getNomeCLiente(),
                                                    vendasRealizdas.getDocumento(),
                                                    vendasRealizdas.getCodigo(),
                                                    vendasRealizdas.getItens(),
                                                    vendasRealizdas.getPagamento().getParcelas(),
                                                    vendasRealizdas.getPagamento().getValor(),
                                                    vendasRealizdas.getStatusPagamento(),
                                                    vendasRealizdas.getDataPedido(),
                                                    vendasRealizdas.getPagamento().getDataPagamento(),
                                                    vendasRealizdas.getPagamento().getFormaPagamento());
                    pedidosDTOS.add(dto);
                }
                for(BoletoEntity boleto : relatorioMensal.getDebitos().getBoletos())
                {
                    if(boleto.getPagamento() == null)
                    {
                        BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                                boleto.getCnpj(),
                                boleto.getStatusPagamento(),
                                boleto.getDataVencimento(),
                                boleto.getParcelas(),
                                boleto.getParcelaAtual(),
                                boleto.getValorTotal(),
                                boleto.getValorParcela(),
                                null,
                                null,
                                null);
                        boletosDTOS.add(dto);
                    }
                    else
                    {
                        BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                                boleto.getCnpj(),
                                boleto.getStatusPagamento(),
                                boleto.getDataVencimento(),
                                boleto.getParcelas(),
                                boleto.getParcelaAtual(),
                                boleto.getValorTotal(),
                                boleto.getValorParcela(),
                                boleto.getPagamento().getDataPagamento(),
                                boleto.getPagamento().getFormaPagamento(),
                                boleto.getPagamento().getParcelas());
                        boletosDTOS.add(dto);
                    }
                }
                RelatorioMensalDTO dto = new RelatorioMensalDTO(relatorioMensal.getDataReferencia(),
                                                                relatorioMensal.getTotalVendasDebito(),
                                                                relatorioMensal.getTotalVendasCredito(),
                                                                relatorioMensal.getTotalVendasDinheiro(),
                                                                relatorioMensal.getTotalVendasPix(),
                                                                relatorioMensal.getTotalVendas(),
                                                                relatorioMensal.getTotalDebitos(),
                                                                pedidosDTOS,
                                                                boletosDTOS);
                return new ResponseEntity<>(dto, HttpStatus.OK);
            }
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<RelatorioDiarioDTO> BuscarRelatorioDiario()
    {
        try
        {
            RelatorioMensalEntity relatorioMensal = relatorioMensalRepository.findBydataReferencia(LocalDate.now().getMonth().getValue()+"/"+LocalDate.now().getYear()).orElseThrow(
                    ()->new EntityNotFoundException()
            );
            List<PedidosDTO> pedidosDTOS = new ArrayList<>();
            List<BoletosDTO> boletosDTOS  = new ArrayList<>();
            Double valorVendaDinheiro = 0.0;
            Double valorVendaPix = 0.0;
            Double valorVendaCredito = 0.0;
            Double valorVendaDebito = 0.0;
            Double totalDebitos = 0.0;
            List<RelatorioDiarioDTO> response = new ArrayList<>();
            for(VendasRealizdasEntity vendas : relatorioMensal.getVendas().getVendasRealizdas())
            {
                if(vendas.getDataPedido().getDayOfMonth() == LocalDate.now().getDayOfMonth())
                {
                    if(vendas.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.CREDITO)
                    { valorVendaCredito += vendas.getValorTotal();}
                    if(vendas.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.DEBITO)
                    { valorVendaDebito += vendas.getValorTotal();}
                    if(vendas.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.DINHEIRO)
                    { valorVendaDinheiro += vendas.getValorTotal();}
                    if(vendas.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.PIX)
                    { valorVendaPix += vendas.getValorTotal();}
                    PedidosDTO dto = new PedidosDTO(vendas.getNomeCLiente(),
                                                    vendas.getDocumento(),
                                                    vendas.getCodigo(),
                                                    vendas.getItens(),
                                                    vendas.getPagamento().getParcelas(),
                                                    vendas.getValorTotal(),
                                                    vendas.getStatusPagamento(),
                                                    vendas.getDataPedido(),
                                                    vendas.getPagamento().getDataPagamento(),
                                                    vendas.getPagamento().getFormaPagamento());
                    pedidosDTOS.add(dto);
                }

            }
            for( BoletoEntity boleto : relatorioMensal.getDebitos().getBoletos())
            {
                if(boleto.getDataVencimento().getDayOfMonth() == LocalDate.now().getDayOfMonth())
                {
                    if(boleto.getPagamento() == null)
                    {
                        BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                                boleto.getCnpj(),
                                boleto.getStatusPagamento(),
                                boleto.getDataVencimento(),
                                boleto.getParcelas(),
                                boleto.getParcelaAtual(),
                                boleto.getValorTotal(),
                                boleto.getValorParcela(),
                                null,
                                null,
                                null);
                        boletosDTOS.add(dto);
                        totalDebitos += boleto.getValorParcela();
                    }
                    else
                    {
                        BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                                boleto.getCnpj(),
                                boleto.getStatusPagamento(),
                                boleto.getDataVencimento(),
                                boleto.getParcelas(),
                                boleto.getParcelaAtual(),
                                boleto.getValorTotal(),
                                boleto.getValorParcela(),
                                boleto.getPagamento().getDataPagamento(),
                                boleto.getPagamento().getFormaPagamento(),
                                boleto.getPagamento().getParcelas());
                        boletosDTOS.add(dto);
                        totalDebitos += boleto.getValorParcela();
                    }
                }
            }
            Double valorTotalVenda = valorVendaDebito + valorVendaCredito + valorVendaDinheiro + valorVendaPix;
            RelatorioDiarioDTO dto = new RelatorioDiarioDTO(LocalDate.now().getDayOfMonth(),
                                                            NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaDebito),
                                                            NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaCredito),
                                                            NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaDinheiro),
                                                            NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaPix),
                                                            NumberFormat.getCurrencyInstance(localBrasil).format(valorTotalVenda),
                                                            NumberFormat.getCurrencyInstance(localBrasil).format(totalDebitos),
                                                            pedidosDTOS,
                                                            boletosDTOS);
            return  new ResponseEntity<>(dto,HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<RelatorioDiarioDTO> BuscarRelatorioDiarioComArgumento(int diaReferencia)
    {
        try
        {
            RelatorioMensalEntity relatorioMensal = relatorioMensalRepository.findBydataReferencia(LocalDate.now().getMonth().getValue()+"/"+LocalDate.now().getYear()).orElseThrow(
                    ()->new EntityNotFoundException()
            );
            List<PedidosDTO> pedidosDTOS = new ArrayList<>();
            List<BoletosDTO> boletosDTOS  = new ArrayList<>();
            Double valorVendaDinheiro = 0.0;
            Double valorVendaPix = 0.0;
            Double valorVendaCredito = 0.0;
            Double valorVendaDebito = 0.0;
            Double totalDebitos = 0.0;
            List<RelatorioDiarioDTO> response = new ArrayList<>();
            for(VendasRealizdasEntity vendas : relatorioMensal.getVendas().getVendasRealizdas())
            {
                if(vendas.getDataPedido().getDayOfMonth() == diaReferencia)
                {
                    if(vendas.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.CREDITO)
                    { valorVendaCredito += vendas.getValorTotal();}
                    if(vendas.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.DEBITO)
                    { valorVendaDebito += vendas.getValorTotal();}
                    if(vendas.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.DINHEIRO)
                    { valorVendaDinheiro += vendas.getValorTotal();}
                    if(vendas.getPagamento().getFormaPagamento() == FORMAPAGAMENTO.PIX)
                    { valorVendaPix += vendas.getValorTotal();}
                    PedidosDTO dto = new PedidosDTO(vendas.getNomeCLiente(),
                            vendas.getDocumento(),
                            vendas.getCodigo(),
                            vendas.getItens(),
                            vendas.getPagamento().getParcelas(),
                            vendas.getValorTotal(),
                            vendas.getStatusPagamento(),
                            vendas.getDataPedido(),
                            vendas.getPagamento().getDataPagamento(),
                            vendas.getPagamento().getFormaPagamento());
                    pedidosDTOS.add(dto);
                }

            }
            for( BoletoEntity boleto : relatorioMensal.getDebitos().getBoletos())
            {
                if(boleto.getDataVencimento().getDayOfMonth() == diaReferencia)
                {
                    if(boleto.getPagamento() == null)
                    {
                        BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                                boleto.getCnpj(),
                                boleto.getStatusPagamento(),
                                boleto.getDataVencimento(),
                                boleto.getParcelas(),
                                boleto.getParcelaAtual(),
                                boleto.getValorTotal(),
                                boleto.getValorParcela(),
                                null,
                                null,
                                null);
                        boletosDTOS.add(dto);
                        totalDebitos += boleto.getValorParcela();
                    }
                    else
                    {
                        BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                                boleto.getCnpj(),
                                boleto.getStatusPagamento(),
                                boleto.getDataVencimento(),
                                boleto.getParcelas(),
                                boleto.getParcelaAtual(),
                                boleto.getValorTotal(),
                                boleto.getValorParcela(),
                                boleto.getPagamento().getDataPagamento(),
                                boleto.getPagamento().getFormaPagamento(),
                                boleto.getPagamento().getParcelas());
                        boletosDTOS.add(dto);
                        totalDebitos += boleto.getValorParcela();
                    }
                }
            }
            Double valorTotalVenda = valorVendaDebito + valorVendaCredito + valorVendaDinheiro + valorVendaPix;
            RelatorioDiarioDTO dto = new RelatorioDiarioDTO(diaReferencia,
                    NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaDebito),
                    NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaCredito),
                    NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaDinheiro),
                    NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaPix),
                    NumberFormat.getCurrencyInstance(localBrasil).format(valorTotalVenda),
                    NumberFormat.getCurrencyInstance(localBrasil).format(totalDebitos),
                    pedidosDTOS,
                    boletosDTOS);
            return  new ResponseEntity<>(dto,HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<RelatorioAnualDTO> BuscarRelatorioAnual()
    {
        try
        {
            List<RelatorioMensalEntity> relatorioMensalEntityList = relatorioMensalRepository.findAll();
            List<PedidosDTO> pedidosDTOS = new ArrayList<>();
            List<BoletosDTO> boletosDTOS  = new ArrayList<>();
            Double valorVendaDinheiro = 0.0;
            Double valorVendaPix = 0.0;
            Double valorVendaCredito = 0.0;
            Double valorVendaDebito = 0.0;
            Double totalDebitos = 0.0;
            for(RelatorioMensalEntity relatorioMensal : relatorioMensalEntityList)
            {
                if(relatorioMensal.getAnoReferencia() == LocalDate.now().getYear())
                {
                    valorVendaDebito += relatorioMensal.getVendas().getTotalVendasDebito();
                    valorVendaCredito += relatorioMensal.getVendas().getTotalVendasCredito();
                    valorVendaDinheiro += relatorioMensal.getVendas().getTotalVendasDinheiro();
                    valorVendaPix += relatorioMensal.getVendas().getTotalVendasPix();
                    totalDebitos += relatorioMensal.getDebitos().getValorTotalBoletos();
                }
                for(VendasRealizdasEntity vendasRealizdas : relatorioMensal.getVendas().getVendasRealizdas())
                {
                    PedidosDTO dto = new PedidosDTO(vendasRealizdas.getNomeCLiente(),
                                                    vendasRealizdas.getDocumento(),
                                                    vendasRealizdas.getCodigo(),
                                                    vendasRealizdas.getItens(),
                                                    vendasRealizdas.getPagamento().getParcelas(),
                                                    vendasRealizdas.getPagamento().getValor(),
                                                    vendasRealizdas.getStatusPagamento(),
                                                    vendasRealizdas.getDataPedido(),
                                                    vendasRealizdas.getPagamento().getDataPagamento(),
                                                    vendasRealizdas.getPagamento().getFormaPagamento());
                    pedidosDTOS.add(dto);
                }
                for(BoletoEntity boleto : relatorioMensal.getDebitos().getBoletos())
                {
                    if(boleto.getPagamento() == null)
                    {
                        BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                                boleto.getCnpj(),
                                boleto.getStatusPagamento(),
                                boleto.getDataVencimento(),
                                boleto.getParcelas(),
                                boleto.getParcelaAtual(),
                                boleto.getValorTotal(),
                                boleto.getValorParcela(),
                                null,
                                null,
                                null);
                        boletosDTOS.add(dto);
                    }
                    else
                    {
                        BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                                boleto.getCnpj(),
                                boleto.getStatusPagamento(),
                                boleto.getDataVencimento(),
                                boleto.getParcelas(),
                                boleto.getParcelaAtual(),
                                boleto.getValorTotal(),
                                boleto.getValorParcela(),
                                boleto.getPagamento().getDataPagamento(),
                                boleto.getPagamento().getFormaPagamento(),
                                boleto.getPagamento().getParcelas());
                        boletosDTOS.add(dto);
                    }
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
                                                          pedidosDTOS,
                                                          boletosDTOS);
            return  new ResponseEntity<>(dto,HttpStatus.OK);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<RelatorioAnualDTO> BuscarRelatorioAnualComParametros(int anoReferencia)
    {
        try
        {
            if(anoReferencia > 0)
            {
                List<RelatorioMensalEntity> relatorioMensalEntityList = relatorioMensalRepository.findAll();
                List<PedidosDTO> pedidosDTOS = new ArrayList<>();
                List<BoletosDTO> boletosDTOS = new ArrayList<>();
                Double valorVendaDinheiro = 0.0;
                Double valorVendaPix = 0.0;
                Double valorVendaCredito = 0.0;
                Double valorVendaDebito = 0.0;
                Double totalDebitos = 0.0;
                for(RelatorioMensalEntity relatorioMensal : relatorioMensalEntityList)
                {
                    if(relatorioMensal.getAnoReferencia() == anoReferencia)
                    {
                        valorVendaDebito += relatorioMensal.getVendas().getTotalVendasDebito();
                        valorVendaCredito += relatorioMensal.getVendas().getTotalVendasCredito();
                        valorVendaDinheiro += relatorioMensal.getVendas().getTotalVendasDinheiro();
                        valorVendaPix += relatorioMensal.getVendas().getTotalVendasPix();
                        totalDebitos += relatorioMensal.getDebitos().getValorTotalBoletos();
                    }
                    for(VendasRealizdasEntity vendasRealizdas : relatorioMensal.getVendas().getVendasRealizdas())
                    {
                        PedidosDTO dto = new PedidosDTO(vendasRealizdas.getNomeCLiente(),
                                vendasRealizdas.getDocumento(),
                                vendasRealizdas.getCodigo(),
                                vendasRealizdas.getItens(),
                                vendasRealizdas.getPagamento().getParcelas(),
                                vendasRealizdas.getPagamento().getValor(),
                                vendasRealizdas.getStatusPagamento(),
                                vendasRealizdas.getDataPedido(),
                                vendasRealizdas.getPagamento().getDataPagamento(),
                                vendasRealizdas.getPagamento().getFormaPagamento());
                        pedidosDTOS.add(dto);
                    }
                    for(BoletoEntity boleto : relatorioMensal.getDebitos().getBoletos())
                    {
                        if(boleto.getPagamento() == null)
                        {
                            BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                                    boleto.getCnpj(),
                                    boleto.getStatusPagamento(),
                                    boleto.getDataVencimento(),
                                    boleto.getParcelas(),
                                    boleto.getParcelaAtual(),
                                    boleto.getValorTotal(),
                                    boleto.getValorParcela(),
                                    null,
                                    null,
                                    null);
                            boletosDTOS.add(dto);
                        }
                        else
                        {
                            BoletosDTO dto = new BoletosDTO(boleto.getEmpresa(),
                                    boleto.getCnpj(),
                                    boleto.getStatusPagamento(),
                                    boleto.getDataVencimento(),
                                    boleto.getParcelas(),
                                    boleto.getParcelaAtual(),
                                    boleto.getValorTotal(),
                                    boleto.getValorParcela(),
                                    boleto.getPagamento().getDataPagamento(),
                                    boleto.getPagamento().getFormaPagamento(),
                                    boleto.getPagamento().getParcelas());
                            boletosDTOS.add(dto);
                        }
                    }
                }
                Double valorTotalVenda = valorVendaDebito + valorVendaCredito + valorVendaDinheiro + valorVendaPix;
                RelatorioAnualDTO dto = new RelatorioAnualDTO(anoReferencia,
                                                              NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaDebito),
                                                              NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaCredito),
                                                              NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaDinheiro),
                                                              NumberFormat.getCurrencyInstance(localBrasil).format(valorVendaPix),
                                                              NumberFormat.getCurrencyInstance(localBrasil).format(valorTotalVenda),
                                                              NumberFormat.getCurrencyInstance(localBrasil).format(totalDebitos),
                                                              pedidosDTOS,
                                                              boletosDTOS);
                return  new ResponseEntity<>(dto,HttpStatus.OK);
            }
        }
        catch (Exception e)
        {
            e.getMessage();
        }
        return null;
    }

    public ResponseEntity<RelatorioMensalEntity> NovoLancamentoVendas(String nomeCLiente,
                                                                      String documento,
                                                                      String codigo,
                                                                      List<String> itens,
                                                                      StatusPagamento statusPagamento,
                                                                      LocalDateTime dataVenda,
                                                                      Double valorVenda,
                                                                      Double parcelas,
                                                                      FORMAPAGAMENTO formapagamento)
    {
        try
        {
            if(valorVenda != null && formapagamento != null)
            {
                //encontra relatório por mes referencia
            if(!relatorioMensalRepository.existsBydataReferencia(LocalDate.now().getMonth().getValue()+"/"+LocalDate.now().getYear()))
            {
                GeraRelatorio(LocalDate.now().getMonth().getValue(),LocalDate.now().getYear());
            }
            RelatorioMensalEntity relatorioMensal = relatorioMensalRepository.findBydataReferencia(LocalDate.now().getMonth().getValue()+"/"+LocalDate.now().getYear()).orElseThrow(
                        ()->new EntityNotFoundException()
                );
            VendasEntity vendas = vendasRepository.findById(relatorioMensal.getVendas().getId()).orElseThrow(
                        ()->new EntityNotFoundException()
                );
            VendasRealizdasEntity vendasRealizdasEntity = new VendasRealizdasEntity();
            vendasRealizdasEntity.setTimeStamp(LocalDateTime.now());
            vendasRealizdasEntity.setItens(itens);
            vendasRealizdasEntity.setValorTotal(valorVenda);
            vendasRealizdasEntity.setCodigo(codigo);
            vendasRealizdasEntity.setDataPedido(dataVenda);
            vendasRealizdasEntity.setNomeCLiente(nomeCLiente);
            vendasRealizdasEntity.setDocumento(documento);
            vendasRealizdasEntity.setStatusPagamento(statusPagamento);
            PagamentoEntity pagamento = new PagamentoEntity();
            pagamento.setDataPagamento(LocalDateTime.now());
            pagamento.setValor(valorVenda);
            pagamento.setParcelas(parcelas);
            System.out.println("variavel pagamento: "+pagamento.getParcelas());
            System.out.println("variavel: "+parcelas);
            Double valorParcela = 0.0;
            if(parcelas == null)
            {
                valorParcela = valorVenda;
            }
            else
            {
                valorParcela = valorVenda/parcelas;
            }
            pagamento.setValor(valorParcela);
            pagamento.setFormaPagamento(formapagamento);
            pagamento.setTimeStamp(LocalDateTime.now());
            pagamentoRepository.save(pagamento);
            vendasRealizdasEntity.setPagamento(pagamento);
            vendasRealizdasEntity.setTimeStamp(LocalDateTime.now());
            vendasRealizadaRepository.save(vendasRealizdasEntity);
            if(formapagamento == FORMAPAGAMENTO.CREDITO)
            {
                vendas.setTotalVendasCredito(vendas.getTotalVendasCredito()+ valorVenda);
                relatorioMensal.setTotalVendasCredito(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasCredito()));
            }
            if(formapagamento == FORMAPAGAMENTO.DEBITO)
            {
                vendas.setTotalVendasDebito(vendas.getTotalVendasDebito()+ valorVenda);
                relatorioMensal.setTotalVendasDebito(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasDebito()));
            }
            if(formapagamento == FORMAPAGAMENTO.DINHEIRO)
            {
                vendas.setTotalVendasDinheiro(vendas.getTotalVendasDinheiro()+ valorVenda);
                relatorioMensal.setTotalVendasDinheiro(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasDinheiro()));
            }
            if(formapagamento == FORMAPAGAMENTO.PIX)
            {
                vendas.setTotalVendasPix(vendas.getTotalVendasPix()+ valorVenda);
                relatorioMensal.setTotalVendasPix(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasPix()));
            }
            vendas.setTotalVendas(vendas.getTotalVendasCredito() +
                                  vendas.getTotalVendasDebito() +
                                  vendas.getTotalVendasDinheiro() +
                                  vendas.getTotalVendasPix());
            relatorioMensal.setTotalVendas(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendas()));
            relatorioMensal.setTimeStamp(LocalDateTime.now());
            vendas.setTimeStamp(LocalDateTime.now());
            vendas.getVendasRealizdas().add(vendasRealizdasEntity);
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

    public void GeraBoleto(String empresa,
                           String cnpj,
                           Double valorBoleto,
                           Double parcelaAtual,
                           Double totalParcelas,
                           LocalDate dataBoleto)
    {
        try
        {
            System.out.println("gera boleto start");
            RelatorioMensalEntity relatorioMensal = relatorioMensalRepository.findBydataReferencia(dataBoleto.getMonth().getValue()+"/"+dataBoleto.getYear()).get();
            DebitosEntity debitos = debitosRepository.findById(relatorioMensal.getDebitos().getId()).orElseThrow(
                    ()-> new EntityNotFoundException()
            );
            BoletoEntity boleto = new BoletoEntity();
            boleto.setStatusPagamento(StatusPagamento.AGUARDANDO);
            boleto.setEmpresa(empresa);
            boleto.setCnpj(cnpj);
            boleto.setParcelas(totalParcelas);
            boleto.setValorParcela(valorBoleto/totalParcelas);
            boleto.setValorTotal(valorBoleto);
            boleto.setParcelaAtual(parcelaAtual);
            boleto.setTimeStamp(LocalDateTime.now());
            boleto.setDataVencimento(dataBoleto);
            //debitos.getBoletos().add(boleto);
            boletoRepository.save(boleto);
            debitos.getBoletos().add(boleto);
            debitos.setValorTotalBoletos(debitos.getValorTotalBoletos() + boleto.getValorParcela());
            relatorioMensal.setTotalDebitos(NumberFormat.getCurrencyInstance(localBrasil).format(debitos.getValorTotalBoletos()));
            debitosRepository.save(debitos);
            relatorioMensalRepository.save(relatorioMensal);
            System.out.println("gera boleto final");
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }

    public void GeraRelatorio(int mesReferencia,
                              int anoReferencia)
    {
        try
        {
            RelatorioMensalEntity relatorioMensal = new RelatorioMensalEntity();
            relatorioMensal.setTimeStamp(LocalDateTime.now());
            relatorioMensal.setDataReferencia(mesReferencia+"/"+anoReferencia);
            relatorioMensal.setAnoReferencia(anoReferencia);
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
            relatorioMensal.setTotalVendasDinheiro(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasDinheiro()));
            relatorioMensal.setTotalVendasCredito(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasCredito()));
            relatorioMensal.setTotalVendasDebito(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasDebito()));
            relatorioMensal.setTotalVendasPix(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendasPix()));
            relatorioMensal.setTotalVendas(NumberFormat.getCurrencyInstance(localBrasil).format(vendas.getTotalVendas()));
            relatorioMensal.setTotalDebitos(NumberFormat.getCurrencyInstance(localBrasil).format(debitos.getValorTotalBoletos()));
            relatorioMensalRepository.save(relatorioMensal);
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }

    public void GeraVendaRealizda(String nomeCLiente,
                                  String documento,
                                  String codigo,
                                  List<String> itens,
                                  Double valor,
                                  StatusPagamento statusPagamento,
                                  LocalDateTime dataVenda
                                  )
    {
        try
        {
            if(nomeCLiente != null &&
            documento != null &&
            codigo != null &&
            itens != null &&
            valor != null &&
            statusPagamento != null &&
            dataVenda != null)
            {
                VendasRealizdasEntity vendasRealizdasEntity = new VendasRealizdasEntity();
                vendasRealizdasEntity.setTimeStamp(LocalDateTime.now());
                vendasRealizdasEntity.setItens(itens);
                vendasRealizdasEntity.setValorTotal(valor);
                vendasRealizdasEntity.setCodigo(codigo);
                vendasRealizdasEntity.setDataPedido(dataVenda);
                vendasRealizdasEntity.setNomeCLiente(nomeCLiente);
                vendasRealizdasEntity.setDocumento(documento);
                vendasRealizdasEntity.setStatusPagamento(statusPagamento);
                vendasRealizadaRepository.save(vendasRealizdasEntity);
            }
            else
            {throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }

    public void NovoLancamentoDebito(String empresa,
                                     String cnpj,
                                     Double valorBoleto,
                                     Double parcelas,
                                     int diaVencimento,
                                     Double carenciaPagamento)
    {
        try
        {
            if(valorBoleto != null &&
               diaVencimento > 0 &&
               empresa != null &&
               cnpj != null)
            {
                System.out.println("chamou ms");
                int carenciaP = 0;
                if(carenciaPagamento != null)
                {carenciaP = carenciaPagamento.intValue();}
                int parcelasFor = 1;
                if(parcelas != null)
                { parcelasFor = parcelas.intValue();}
                int parcelaAtual = 1;
                for(int i = carenciaP ; i < parcelasFor+carenciaP ; i++)
                {
                    LocalDate data = LocalDate.of(LocalDate.now().getYear(),
                                                  LocalDate.now().getMonth().getValue(),
                                                  diaVencimento).plusMonths(i);
                    //System.out.println(data);
                    System.out.println(data.getMonth().getValue()+"/"+data.getYear());
                    if(!relatorioMensalRepository.existsBydataReferencia(data.getMonth().getValue()+"/"+data.getYear()))
                    {
                        GeraRelatorio(data.getMonth().getValue(),data.getYear());
                        GeraBoleto(empresa, cnpj, valorBoleto, (double) parcelaAtual,parcelas,data);
                    }
                    else
                    {
                        GeraBoleto(empresa, cnpj, valorBoleto, (double) parcelaAtual,parcelas,data);
                    }
                    /*if(!relatorioMensalRepository.existsBymesReferencia())
                    GeraBoleto(valorBoleto, (double) parcelaAtual,parcelas,data);*/
                    parcelaAtual +=1;
                }
            }
            else
            { throw new NullargumentsException();}
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }

    public void NovoPagamento(Long idBoleto,
                              FORMAPAGAMENTO formapagamento,
                              Double parcelas)
    {
        try
        {
            if(idBoleto != null &&
               formapagamento != null)
            {
                BoletoEntity boleto = boletoRepository.findById(idBoleto).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                //
                RelatorioMensalEntity relatorioMensal = relatorioMensalRepository.findBydataReferencia(boleto.getDataVencimento().getMonth().getValue()+"/"+
                                                                                                       boleto.getDataVencimento().getYear()).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                DebitosEntity debitos = debitosRepository.findById(relatorioMensal.getDebitos().getId()).orElseThrow(
                        ()-> new EntityNotFoundException()
                );
                PagamentoEntity pagamento = new PagamentoEntity();
                pagamento.setTimeStamp(LocalDateTime.now());
                pagamento.setFormaPagamento(formapagamento);
                pagamento.setValor(boleto.getValorParcela());
                pagamento.setParcelas(parcelas);
                pagamento.setDataPagamento(LocalDateTime.now());
                pagamentoRepository.save(pagamento);
                //
                boleto.setStatusPagamento(StatusPagamento.PAGO);
                boleto.setTimeStamp(LocalDateTime.now());
                boleto.setPagamento(pagamento);
                boletoRepository.save(boleto);
                debitos.setValorTotalBoletos(debitos.getValorTotalBoletos() - boleto.getValorParcela());
                debitosRepository.save(debitos);
                relatorioMensal.setTotalDebitos(NumberFormat.getCurrencyInstance(localBrasil).format(debitos.getValorTotalBoletos()));
                relatorioMensalRepository.save(relatorioMensal);
            }
        }
        catch (Exception e)
        {
            e.getMessage();
        }
    }


}
