import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Relatorio.css';
import '../AdmGlobal.css';
import { useEffect, useState } from "react";

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
      <div className="admBlocoGeral">
            <div className="admBlocoNav">
                <Navadm></Navadm>
            </div>
            <div className="admBlocoConteudo">

            <div className='seletor'>
                            <input type='radio' value="dia" onClick={(e)=>{setSeletor(e.target.value)}} />Diario
                            <input type='radio' value="mensal" onClick={(e)=>{setSeletor(e.target.value)}} />Mensal
                            <input type='radio' value="anual" onClick={(e)=>{setSeletor(e.target.value)}} />Anual
                            <br/><br/>
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
                                                            {data.pedidos.map((data1,i)=>{
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
                                                                <td>Valor</td>
                                                                <td>Parcelas</td>
                                                                <td>Data Emissão</td>
                                                                <td>Data Vencimento</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </>)}
                                                
                                            </div>
                                        </div>
                                        </>)
                                    })}
                    </>):(<>
                        <div className='retornoInfoRelatorio'>
                                <div className='retornoInfoResumo'>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao '></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeDinheiro'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconePix'></div><h5>Pix: R$ 0.00</h5>
                                        </div>
                                    </div>
                                    <div className='retornoInfoResumoValor'>
                                        <div className='sessaoValor'>
                                            <h3>Valor Total de Vendas: R$ 0.00</h3>
                                        </div>
                                        <div className='sessaoValor'>
                                        <h3>Valor Total de Débitos: R$ 0.00</h3>
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
                                                    </tr>
                                                </table>
                                            </div>
                                        </>):(<>
                                            <div className='retornoInfotabela'>
                                                <table>
                                                    <tr>
                                                        <td>Razão Social</td>
                                                        <td>CNPJ</td>
                                                        <td>Valor</td>
                                                        <td>Parcelas</td>
                                                        <td>Data Emissão</td>
                                                        <td>Data Vencimento</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </>)}               
                                    </div>

                                </div>
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
                                                            {data.pedidos.map((data1,i)=>{
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
                                                                <td>Valor</td>
                                                                <td>Parcelas</td>
                                                                <td>Data Emissão</td>
                                                                <td>Data Vencimento</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </>)}
                                                
                                            </div>
                                        </div>
                                        </>)
                                    })}
                    </>):(<>
                        <div className='retornoInfoRelatorio'>
                                <div className='retornoInfoResumo'>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao '></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeDinheiro'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconePix'></div><h5>Pix: R$ 0.00</h5>
                                        </div>
                                    </div>
                                    <div className='retornoInfoResumoValor'>
                                        <div className='sessaoValor'>
                                            <h3>Valor Total de Vendas: R$ 0.00</h3>
                                        </div>
                                        <div className='sessaoValor'>
                                        <h3>Valor Total de Débitos: R$ 0.00</h3>
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
                                                    </tr>
                                                </table>
                                            </div>
                                        </>):(<>
                                            <div className='retornoInfotabela'>
                                                <table>
                                                    <tr>
                                                        <td>Razão Social</td>
                                                        <td>CNPJ</td>
                                                        <td>Valor</td>
                                                        <td>Parcelas</td>
                                                        <td>Data Emissão</td>
                                                        <td>Data Vencimento</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </>)}               
                                    </div>

                                </div>
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
                                                            {data.pedidos.map((data1,i)=>{
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
                                                                <td>Valor</td>
                                                                <td>Parcelas</td>
                                                                <td>Data Emissão</td>
                                                                <td>Data Vencimento</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </>)}
                                                
                                            </div>
                                        </div>
                                        </>)
                                    })}
                    </>):(<>
                        <div className='retornoInfoRelatorio'>
                                <div className='retornoInfoResumo'>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao '></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeCartao'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconeDinheiro'></div><h5>R$ 0.00</h5>
                                        </div>
                                        <div className='sessaoValor'>
                                        <div className='icone iconePix'></div><h5>Pix: R$ 0.00</h5>
                                        </div>
                                    </div>
                                    <div className='retornoInfoResumoValor'>
                                        <div className='sessaoValor'>
                                            <h3>Valor Total de Vendas: R$ 0.00</h3>
                                        </div>
                                        <div className='sessaoValor'>
                                        <h3>Valor Total de Débitos: R$ 0.00</h3>
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
                                                        <td>Parcelas</td>
                                                        <td>Forma Pagamento</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </>):(<>
                                            <div className='retornoInfotabela'>
                                                <table>
                                                    <tr>
                                                        <td>Razão Social</td>
                                                        <td>CNPJ</td>
                                                        <td>Valor</td>
                                                        <td>Parcelas</td>
                                                        <td>Data Emissão</td>
                                                        <td>Data Vencimento</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </>)}               
                                    </div>

                                </div>
                    </>)}                   
                                </>):(<></>)}

                        </div>


            </div>
        </div>            
    </>
    );
}

export default Relaroriogerenciaadm;