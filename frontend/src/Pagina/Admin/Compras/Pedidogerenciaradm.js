import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Compra.css';
import '../AdmGlobal.css';
import Axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from "react-to-print";

function Pedidogerenciaadm() {
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const [APIDataEmpresa, setAPIDataEmpresa] = useState([]);
    const[idvenda, setidVenda] = useState('')
    const documentPrint = useRef();
    const[responseData, setresponseData ] = useState({
      'codigo': '',
      'nomeCliente': '',
      'sobrenomeCliente': '',
      'telefone': '',
      'dataVenda': '',
      'itens': [],
      'valorPago': '',
      'valorTotal': '',
      'valorTotal': '',
      'valorDesconto': '',
      'valorTroco': '',
      'statusPagamento': '',
      'dataPagamento': '',
      'formapagamento': '',
      'parcelas': '',
    })
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
      APIData.filter(dados => dados.codigo.includes(dadoPesquisa)) :
      []
    useEffect(() => {
        Axios
          .get(`${baseUrl}/pedido/ListarPedidos`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      const handlePrint = useReactToPrint  ({
        content: ()=> documentPrint.current,
      })

      useEffect(() => {
        Axios
          .get(`${baseUrl}/empresa/ListarEmpresas`)
          .then((response) => { setAPIDataEmpresa(response.data)}) 
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

       useEffect(()=>{
        Axios.get(`${baseUrl}/pedido/BuscarPedidoPorId?id=${idvenda}`)
          .then((response) => { setresponseData(response.data)}) 
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, [idvenda])

    return(
    <>
          <div className="ndBackground">
            <div className="ndBoxSection">

                <div className="ndBoxNavAdm"><Navadm></Navadm></div>

                <div className="ndBoxSectionIn">
                    <div className="ndSectionInCampoPesquisa">
                    
                    <label>Código:
                    <input type="text" onChange={e=> setdadoPesquisa(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Pd_" />
                    </label>

                    </div>

                    <div className="ndSectionInRetornoInfoFlexAdm">

                        <div className="infoRetornoTabelaAdm">
                          <table>
                            <tr>
                              <td>Cliente</td>
                              <td>Código</td>
                              <td>Valor</td>
                              <td>Status</td>
                              <td>Data</td>
                              <td>tipocompra</td>
                            </tr>
                            {dadoPesquisa.length > 0 ? (<>
                             {pesquisa.map((data, i) => {
                              return (
                                <>
                                  <tr key={i}>
                                    <td>{data.nomeCLiente}</td>
                                    <td>{data.codigo}</td>
                                    <td>{data.valorTotalFront}</td>
                                    <td>{data.status}</td>
                                    <td>{data.dataPedido}</td>
                                    <td>{data.tipocompra}</td>
                                    <a onClick={(e)=>{setidVenda(data.id)}}>+ detalhes</a>
                                  </tr> 
                                            </>
                                            )})}
                            </>) : (<>
                              {APIData.map((data, i) => {
                              return (
                                <>
                                <tr key={i}>
                                    <td>{data.nomeCLiente}</td>
                                    <td>{data.codigo}</td>
                                    <td>{data.valorTotalFront}</td>
                                    <td>{data.status}</td>
                                    <td>{data.dataPedido}</td>
                                    <td>{data.tipocompra}</td>
                                    <button onClick={(e)=>{setidVenda(data.id)}}>Mais Informações</button>
                                  </tr> 
                                            </>
                                            )})}
                            </>)}
                          </table>


                        </div>

                        <div className="infoRetornoVisorAdm">
                          
                        <button onClick={handlePrint}>Imprimir</button>

                        <div className='BoxRetornoCupomFiscalPrint' ref={documentPrint}>
                        <div className='RetornoCupomFiscalBox'>
                          {APIDataEmpresa.map((data, i)=>{return(<>
                            <span>{data.razaoSocial}</span><br/>
                            <span>{data.cnpj}</span><br/> 
                            <span>{data.endereco.logradouro}, {data.endereco.numero} </span><br/>
                            <span>{data.endereco.cidade}-{data.endereco.estado}</span><br/>
                            <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                          </>)})}           
                        </div>         
                        <div className='RetornoCupomFiscalseparador'></div>
                        <div className='RetornoCupomFiscalBox'>
                            <br/>
                            <span>Cliente: {responseData.nomeCliente} {responseData.sobrenomeCliente}</span><br/>
                            <span>Data: {responseData.dataVenda}</span><br/>
                            <span>Código: {responseData.codigo}</span> 
                            <br/>
                        </div>           
                        <div className='RetornoCupomFiscalseparador'></div>          
                        <div className='RetornoCupomFiscalBox'>
                            <table>
                              <tr>
                                <td>Item</td>
                                <td>Código</td>
                                <td>descriçao</td>
                                <td>Qtda</td>
                                <td>Preço</td>
                                <td>Total</td>
                              </tr>
                              {responseData.itens.map((data,i)=>{return(<>
                                <tr>
                                <td>{data.nome}</td>
                                <td>{data.codigo}</td>
                                <td>{data.descricao}</td>
                                <td>{data.quantidade}</td>
                                <td>{data.valorUnitario}</td>
                                <td>{data.valorTotal}</td>
                              </tr>
                              </>)})} 
                                                                    
                            </table>
                        </div>
                        
                        
                        
                          <div className='RetornoCupomFiscalBox'>
                            <br/>
                            <span>Total: {responseData.valorTotal}</span><br/>
                            <span>Valor Desconto: {responseData.valorDesconto}</span><br/> 
                            <span>{responseData.formapagamento?(<>{responseData.formapagamento}: {responseData.valorPago}</>):(<>Forma de Pagamento: </>)} </span><br/>                         
                            <span>Valor Troco: {responseData.valorTroco}</span><br/>
                            <span>Data de Pagamento: {responseData.dataPagamento}</span><br/>
                            <span>Parcelas: {responseData.parcelas}</span><br/>
                            
                          </div>
                          <div className='RetornoCupomFiscalBox'>
                            <br/>
                            <span>Procon PROCON MT Rua Baltazar Navarros, N 567, Bandeirantes, Cuiaba-MT, CEP: 78010-020, TEL: (65) 3613-2100 ου 151.</span>
                          </div>       
                        </div>
                        </div> 

                        </div>
                    </div>
                </div>
            </div> 
    </>
    );
}

export default Pedidogerenciaadm;