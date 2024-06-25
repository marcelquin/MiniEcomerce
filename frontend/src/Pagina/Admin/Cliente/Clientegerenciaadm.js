import { Link } from "react-router-dom";
import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Cliente.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Clientegerenciaadm() {
    const[APIData, setAPIData]= useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    
    const baseUrl = "http://34.133.121.3:8080"
  //const baseUrl = "http://localhost:8080"
    useEffect(() => {
      Axios
        .get(`${baseUrl}/cliente/ListarClientes`)
        .then((response) => { setAPIData(response.data)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);

    const pesquisa = dadoPesquisa.length > 0 ?
    APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
    [];

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

                    {dadoPesquisa.length >0 ?(<>
                      {pesquisa.map((data, i) => {
                        return (
                          <>
                          <div className="blocoinfo" key={i}>
                            <details>
                                <summary>{data.nome}</summary>
                                <p>Dados pessoais:</p>
                                <span>Nome: {data.nome} {data.sobrenome}</span><br/>
                                <span>Data de nascimento: {data.dataNascimento}</span><br/>
                                <span>CPF: {data.cpf}</span><br/>
                                <p>Endereço e contato</p>
                                <span>Endereço: {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span><br/>
                                <span>Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                <span>Email: {data.contato.email}</span><br/>
                                
                                <table>
                                  <tr>
                                    <td><Link to={`/clienteeditar/${data.id}`}>Editar</Link></td>
                                    <td><a>Excluir</a></td>
                                  </tr>
                                </table>
                            </details>
                        </div>
                        </>
                        )})}
                    </>) : (<>
                      {APIData.map((data, i) => {
                        return (
                          <>
                          <div className="blocoinfo" key={i}>
                            <details>
                                <summary>{data.nome}</summary>
                                <p>Dados pessoais:</p>
                                <span>Nome: {data.nome} {data.sobrenome}</span><br/>
                                <span>Data de nascimento: {data.dataNascimento}</span><br/>
                                <span>CPF: {data.cpf}</span><br/>
                                <p>Endereço e contato</p>
                                <span>Endereço: {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span><br/>
                                <span>Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                <span>Email: {data.contato.email}</span><br/>
                                <table>
                                  <tr>
                                    <td><Link to={`/clienteeditar/${data.id}`}>Editar</Link></td>
                                    <td><a>Excluir</a></td>
                                  </tr>
                                </table>
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

export default Clientegerenciaadm;