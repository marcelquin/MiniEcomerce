import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Relatorio.css';
import '../AdmGlobal.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Relaroriogerenciaadm() {
    const baseUrl = "http://34.67.211.119:8080"
    //const baseUrl = "http://localhost:8080"
const[seletorInterno, setseletorInterno] = useState('')
const[seletor, setSeletor] = useState('')
const[diaReferencia, setDiaReferencia] = useState('')
const[mesReferencia, setMesReferencia] = useState('')
const[anoReferencia, setAnoReferencia] = useState('')
const [relatorioDiadio, setrelatorioDiadio] = useState([]);
const [relatorioMensal, setrelatorioMensal] = useState([]);
const [relatorioAnual, setrelatorioAnual] = useState([]);



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
            setrelatorioDiadio(data)
        })
        .catch(err => console.log(err))
}, [])

useEffect(()=>{
    fetch(`${baseUrl}/relatorios/BuscarRelatorioMensal`, 
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

useEffect(()=>{
    fetch(`${baseUrl}/relatorios/BuscarRelatorioAnual`, 
        {
            method:'GET',
            headers:{
                'content-type': 'application/json',
            },
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setrelatorioAnual(data)
        })
        .catch(err => console.log(err))
}, [])

    return(
    <>

        <div className="ndBackground">
            <div className="ndBoxSection">

                <div className="ndBoxNavAdm"><Navadm></Navadm></div>

                <div className="ndBoxSectionIn">

                    <div className="ndSectionInCampoFiltroCadastroAdm">

                        <input type='radio' value="dia" onClick={(e)=>{setSeletor(e.target.value)}} />Diario
                        <input type='radio' value="mensal" onClick={(e)=>{setSeletor(e.target.value)}} />Mensal
                        <input type='radio' value="anual" onClick={(e)=>{setSeletor(e.target.value)}} />Anual

                    </div>

                    <div className="ndSectionInRetornoInfoAdm">
                        
                            {seletor.length === 3?(<>
                                        <div className='buscaPersonalizada'>
                                            <form>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            Dia de referencia:
                                                            <input type='number' name='diaReferencia' placeholder='Digite o dia para busca' />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type='submit' value="Buscar"/>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </form>
                                        </div>
                                        {relatorioDiadio ?(<>
                                            {relatorioDiadio.map((data, i)=>{
                                                return(<>
                                                <div className='retornoInfoRelatorio'>
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
                                                                    {data.boletos.map((data2, i)=>{return(<>
                                                                        <tr>
                                                                            <td>{data2.empresa}</td>
                                                                            <td>{data2.cnpj}</td>
                                                                            <td>{data2.valorTotal}</td>
                                                                            <td>{data2.valorParcela}</td>
                                                                            <td>{data2.parcelaAtual}</td>
                                                                            <td>{data2.dataVencimento}</td>
                                                                            <td>{data2.statusPagamento}</td>
                                                                        </tr>
                                                                    </>)})}
                                                                </table>
                                                            </div>
                                                        </>)}
                                                        
                                                    </div>
                                                </div>
                                                </>)
                                            })}
                            </>):(<>
                                <h1>Aguardando...</h1>
                            </>)}                   
                                        </>):(<></>)}
                                        

                                        {seletor.length === 6?(<>
                                        <div className='buscaPersonalizada'>
                                            <form>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            Mês de referencia:
                                                            <input type='number' name='mesReferencia' placeholder='Digite o mês para busca' />
                                                        </td>
                                                        <td>
                                                            Ano de referencia:
                                                            <input type='number' name='mesReferencia' placeholder='Digite o ano para busca' />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type='submit' value="Buscar"/>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </form>
                                        </div>
                                        {relatorioMensal ?(<>
                                            {relatorioMensal.map((data, i)=>{
                                                return(<>
                                                <div className='retornoInfoRelatorio'>
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
                                                                            <td><Link to={`/pagamento/${data1.id}`}>Informar Pagamento</Link></td>

                                                                    </tr>
                                                                    </>)})}
                                                                </table>
                                                            </div>
                                                        </>)}
                                                        
                                                    </div>
                                                </div>
                                                </>)
                                            })}
                            </>):(<>
                                <h1>Aguardando...</h1>
                            </>)}                   
                                        </>):(<></>)}


                                        {seletor.length === 5?(<>
                                        <div className='buscaPersonalizada'>
                                            <form>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            Ano de referencia:
                                                            <input type='number' name='anoReferencia' placeholder='Digite o ano para busca' />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <input type='submit' value="Buscar"/>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </form>
                                        </div>
                                        {relatorioAnual ?(<>
                                            {relatorioAnual.map((data, i)=>{
                                                return(<>
                                                <div className='retornoInfoRelatorio'>
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
                                                                            <td><Link to={`/pagamento/${data1.id}`}>Informar Pagamento</Link></td>

                                                                    </tr>
                                                                    </>)})}
                                                                </table>
                                                            </div>
                                                        </>)}
                                                        
                                                    </div>
                                                </div>
                                                </>)
                                            })}
                            </>):(<>
                                <h1>Aguardando...</h1>
                            </>)}                   
                                        </>):(<></>)}


                    </div>      

                </div>
            </div>
        </div>          
            
    </>
    );
}

export default Relaroriogerenciaadm;