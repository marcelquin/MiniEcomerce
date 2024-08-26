import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Compra.css';
import '../AdmGlobal.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Pedidogerenciaadm() {
  //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const[idvenda, setidVenda] = useState('')
    const[corpoVenda, setcorpoVenda ] = useState({
      'codigo': '',
      'cliente': '',
      'documentos': '',
      'dataVenda': '',
      'itens': [],
      'valor': '',
      'statusPagamento': '',
      'dataPagamento': '',
      'formapagamento': '',
      'parcelas': ''
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

      useEffect(()=>{
        fetch(`${baseUrl}/pedido/BuscarPedidoPorId?id=${idvenda}`,
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setcorpoVenda(data)
            })
            .catch(err => console.log(err))
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
                          <table>
                            <tr>
                              <td>Código: {corpoVenda.codigo}</td>
                            </tr>
                            <tr>
                              <td>Cliente: {corpoVenda.cliente}</td>
                            </tr>
                            <tr>
                              <td>CPF/CNPJ: {corpoVenda.documentos}</td>
                            </tr>
                            <tr>
                              <td>Data da Venda: {corpoVenda.dataVenda}</td>
                            </tr>
                            <tr>
                              <td>Valor: {corpoVenda.valor}</td>
                            </tr>
                            <tr>
                              <td>Itens: {corpoVenda.itens}</td>
                            </tr>
                            <tr>                
                              <td>Status Pagamento: {corpoVenda.statusPagamento}</td>
                            </tr>
                            <tr>                
                              <td>Data Pagamento: {corpoVenda.dataPagamento}</td>
                            </tr>
                            <tr>
                              <td>Forma Pagamento: {corpoVenda.formapagamento}</td>
                            </tr>
                            <tr>
                              <td>Status Pagamento: {corpoVenda.statusPagamento}</td>
                            </tr>
                            <tr>  
                              <td>Parcelas: {corpoVenda.parcelas}</td>
                            </tr>
                          </table>
                        </div>
                    </div>
                </div>
            </div>
          </div>  
    </>
    );
}

export default Pedidogerenciaadm;