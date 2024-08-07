import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Entrega.css';
import '../AdmGlobal.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Entregagerenciaadm() {
    const baseUrl = "http://34.67.211.119:8080"
    //const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
      APIData.filter(dados => dados.nomeCliente.includes(dadoPesquisa)) :
      []
    useEffect(() => {
        Axios
          .get(`${baseUrl}/entrega/ListarEntregas`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      

    return(
    <>
        <div className="admBlocoGeral">
            <div className="admBlocoNav">
                <Navadm></Navadm>
            </div>
            <div className="admBlocoConteudo">

            <div className="campoPesquisa">
                            <label>Razão Social:<br/>
                            <input type="text" name="dadoPesquisa" onChange={e=> setdadoPesquisa(e.target.value)} className="inputPesquisa" placeholder="Digite o coódigo de busca" />
                            </label>
                        </div>
                        <div className="admBoxtabela">

                            <div className="admRetornoTabela">
                                <table>
                                <tr>
                                    <td>Cliente</td>
                                    <td>Endereço</td>
                                    <td>Telefone</td>
                                    <td>Status</td>
                                </tr>
                                {dadoPesquisa.length > 0 ? (<>
                            {pesquisa.map((data, i) => {
                            return (
                            <>
                           <tr key={i}>
                                <td>{data.nomeCliente}</td>
                                <td>{data.enderecoEntrega}</td>
                                <td>{data.telefoneContato}</td>
                                <td>{data.status}</td>
                                <a>+detalhes</a>
                            </tr> 
                                        </>
                                        )})}
                            </>) : (<>
                            {APIData.map((data, i) => {
                            return (
                            <>
                            <tr key={i}>
                                <td>{data.nomeCliente}</td>
                                <td>{data.enderecoEntrega}</td>
                                <td>{data.telefoneContato}</td>
                                <td>{data.status}</td>
                                <a>+detalhes</a>
                            </tr> 
                                        </>
                                        )})}
                            </>)}
                                </table>
                            </div>
            </div>
        </div>  
    </div>
    </>
    );
}

export default Entregagerenciaadm;