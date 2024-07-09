import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Compra.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Pedidogerenciaadm() {
    const baseUrl = "http://34.133.121.3:8080"
    //const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
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

      

    return(
    <>
            <div className="admBox">

                <div className="admNav"><Navadm></Navadm></div>
                    <div className="admConteudo">
                    <div className="campoPesquisa">
                        <label>Código:<br/>
                        <input type="text" onChange={e=> setdadoPesquisa(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Pd_" />
                        </label>
                    </div>
                    <div className="admBoxtabela">

                        <div className="admRetornoTabela">
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
                            <a>+detalhes</a>
                          </tr> 
                                    </>
                                    )})}
                    </>)}
                            </table>
                        </div>
                        <div className="admRetornoCupomFiscal">
                            
                            <div className="admBoxCupom"></div>

                        </div>

                    </div>

                     
                        
                    </div>
              </div>
    </>
    );
}

export default Pedidogerenciaadm;