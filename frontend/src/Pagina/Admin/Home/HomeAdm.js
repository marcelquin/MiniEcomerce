import '../AdmGlobal.css'
import './AdmHome.css'
import NavAdm from '../../../Componentes/NavAdm/NavAdm'
import { useEffect, useState } from 'react'


function AdmHome() {

    const baseUrl = "http://34.67.211.119:8080"
    //const baseUrl = "http://localhost:8080"
    const[seletorInterno, setseletorInterno] = useState('')
    const [relatorio, setrelatorioMensal] = useState([]);
    useEffect(()=>{
        fetch(`${baseUrl}/relatorios/BuscarRelatorioDiario`, 
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setrelatorioMensal(data)
            })
            .catch(err => console.log(err))
    }, [])

    return(
        <>

            <div className='admBlocoGeral'>
                <div className='admBlocoNav'>
                    <NavAdm></NavAdm>
                </div>
                <div className='admBlocoConteudo'>

                <div className='retornoInfoRelatorio'>
                    {relatorio ?(<>
                        {relatorio.map((data, i)=>{
                                        return(<>
                                            <div className='retornoInfoResumo' key={i}>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeCartao '></div><h5>Crédito: {data.totalVendasCredito}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeCartao'></div><h5>Dédito: {data.totalVendasDebito}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconeDinheiro'></div><h5>Dinheiro: {data.totalVendasDinheiro}</h5>
                                                </div>
                                                <div className='sessaoValor'>
                                                    <div className='icone iconePix'></div><h5>Pix: {data.totalVendasPix}</h5>
                                                </div>
                                            </div>
                                            <div className='retornoInfoResumoValor'>
                                                <div className='sessaoValor'>
                                                    <h3>Valor Total de Vendas: {data.totalVendas}</h3>
                                                </div>
                                                <div className='sessaoValor'>
                                                <h3>Valor Total de Débitos: {data.totalDebitos}</h3>
                                                </div>
                                            </div>
                                            <div className='retornoInfoResumotabela'>
                                                <div className='seletorrelatorio'>
                                                    <span><input  type='radio' value="vendas" onClick={(e)=>{setseletorInterno(e.target.value)}}/>Vendas</span>
                                                    <span><input  type='radio' value="debitos" onClick={(e)=>{setseletorInterno(e.target.value)}}/>Debitos</span>
                                                </div>
                                                {seletorInterno.length === 6?(<>
                                                    <div className='retornoInfotabela'>
                                                        <table>
                                                            <tr>
                                                                <td>Cliente</td>
                                                                <td>CPF/CNPJ</td>
                                                                <td>Itens</td>
                                                                <td>Valor</td>
                                                                <td>Data Venda</td>
                                                                <td>Data Pagamento</td>
                                                                <td>Parcelas</td>
                                                                <td>Forma Pagamento</td>
                                                            </tr>
                                                            {data.vendasRealizadas.map((data1,i)=>{
                                                                return(<>
                                                                    <tr key={i}>
                                                                    <td>{data1.nomeCLiente}</td>
                                                                    <td>{data1.documento}</td>
                                                                    <td>{data1.itens }</td>
                                                                    <td>{data1.valor}</td>
                                                                    <td>{data1.dataVenda}</td>
                                                                    <td>{data1.dataPagamento}</td>
                                                                    <td>{data1.parcelas}</td>
                                                                    <td>{data1.formapagamento}</td>
                                                                </tr>
                                                                </>)})}
                                                            
                                                        </table>
                                                    </div>
                                                </>):(<>
                                                    <div className='retornoInfotabela'>
                                                        <table>
                                                            <tr>
                                                                <td>Razão Social</td>
                                                                <td>CNPJ</td>
                                                                <td>Valor Total</td>
                                                                <td>Valor Parcela</td>
                                                                <td>Parcela Atual</td>
                                                                <td>Data Vencimento</td>
                                                                <td>Status Pagamento</td>
                                                            </tr>
                                                            {data.boletos.map((data1, i)=>{return(<>
                                                                <tr>
                                                                    <td>{data1.empresa}</td>
                                                                    <td>{data1.cnpj}</td>
                                                                    <td>{data1.valorTotal}</td>
                                                                    <td>{data1.valorParcela}</td>
                                                                    <td>{data1.parcelaAtual}</td>
                                                                    <td>{data1.dataVencimento}</td>
                                                                    <td>{data1.statusPagamento}</td>
                                                            </tr>
                                                            </>)})}
                                                            
                                                        </table>
                                                    </div>
                                                </>)}
                                                
                                            </div>
                                        </>)
                                    })}
                    </>):(<>
                        <div className='retornoInfoRelatorio'>
                                
                            <h1>Aguardando movimentação</h1>            

                        </div>
                    </>)}
                                                                   
                            </div>
                </div>
            </div>
        </>)
}

export default AdmHome