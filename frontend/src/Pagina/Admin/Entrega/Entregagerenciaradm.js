import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Entrega.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Entregagerenciaadm() {
    const baseUrl = "http://34.136.115.180:8080"
    //const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    APIData.filter(dados => dados.nomeCliente.includes(dadoPesquisa)) :
    [];
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
            <div className="admBox">

                <div className="admNav"><Navadm></Navadm></div>
                    <div className="admConteudo">
                    <div className="campoPesquisa">
                          <label>Nome:<br/>
                          <input type="text" onChange={e=> setdadoPesquisa(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                          </label>
                      </div>
                      {dadoPesquisa.length >0 ? (<>
                        {pesquisa.map((data, i) => {
                            return (
                            <>
                                <div className="blocoinfo" key={i}>
                                    <details>
                                        <summary>{data.nomeCliente}</summary>
                                        <p>Dados do Cliente:</p>
                                        <span>Nome: {data.nomeCliente}</span><br/>
                                        <span>Endereço: {data.enderecoEntrega}</span><br/>
                                        <span>Telefone: {data.telefoneContato}</span><br/>
                                        <p>Dados da Entrega</p>
                                        <span>Itens: {data.produtos}</span><br/>
                                        <span>Status da Entrega: {data.statusEntrega}</span><br/>
                                        <span>Data de Entrega: {data.dataEntrega}</span><br/>
                                 </details>
                                </div>
                            </>
                                    )})}
                      </>): (<>
                        {APIData.map((data, i) => {
                            return (
                            <>
                                <div className="blocoinfo" key={i}>
                                    <details>
                                        <summary>{data.nomeCliente}</summary>
                                        <p>Dados do Cliente:</p>
                                        <span>Nome: {data.nomeCliente}</span><br/>
                                        <span>Endereço: {data.enderecoEntrega}</span><br/>
                                        <span>Telefone: {data.telefoneContato}</span><br/>
                                        <p>Dados da Entrega</p>
                                        <span>Itens: {data.produtos}</span><br/>
                                        <span>Status da Entrega: {data.statusEntrega}</span><br/>
                                        <span>Data de Entrega: {data.dataEntrega}</span><br/>
                                 </details>
                                </div>
                            </>
                                    )})}
                      </>)}
                        
        
                    </div>
                </div>
    </>
    );
}

export default Entregagerenciaadm;