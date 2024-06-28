import { Link } from "react-router-dom";
import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Cliente.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Clientegerenciaadm() {

    const[filtroCadastro, setfiltroCadastro] = useState('')
    const[APIDataCpf, setAPIDataCpf]= useState([]);
    const[APIDataCnpj, setAPIDataCnpj]= useState([]);
    const[dadoPesquisaCpf, setdadoPesquisaCpf] = useState('')
    const[dadoPesquisaCnpj, setdadoPesquisaCnpj] = useState('')
    const pesquisacpf = dadoPesquisaCpf.length > 0 ?
    APIDataCpf.filter(dados => dados.nome.includes(dadoPesquisaCpf)) :
    [];
    const pesquisacnpj = dadoPesquisaCnpj.length > 0 ?
    APIDataCnpj.filter(dados => dados.nome.includes(dadoPesquisaCnpj)) :
    [];

    const baseUrl = "http://34.133.121.3:8080"
    //const baseUrl = "http://localhost:8080"
    useEffect(() => {
      Axios
        .get(`${baseUrl}/cliente/ListarClientes`)
        .then((response) => { setAPIDataCpf(response.data)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);

    useEffect(() => {
      Axios
        .get(`${baseUrl}/clienteempresa/ListarClienteEmpresa`)
        .then((response) => { setAPIDataCnpj(response.data)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);

    return(
    <>

             <div className="admBox">

                <div className="admNav"><Navadm></Navadm></div>
                    <div className="admConteudo">
                      <div className="seltorcadastro">
                      <input type="radio" name="filtroCadastro" value="CPF" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa fisica
                      <input type="radio" name="filtroCadastro" value="CNPJ" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa Juridica
                      </div>
                    
                    {filtroCadastro.length === 3 ?(<>
                    
                      <div className="campoPesquisa">
                        <label>Nome:<br/>
                        <input type="text" onChange={e=> setdadoPesquisaCpf(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                        </label>
                    </div>

                    {dadoPesquisaCpf.length >0 ?(<>
                      {pesquisacpf.map((data, i) => {
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
                      {APIDataCpf.map((data, i) => {
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

                    </>) : (<>
                     
                      <div className="campoPesquisa">
                        <label>Nome:<br/>
                        <input type="text" onChange={e=> setdadoPesquisaCnpj(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                        </label>
                    </div>
                    {dadoPesquisaCnpj.length >0 ?(<>
                      {pesquisacnpj.map((data, i) => {
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
                      {APIDataCnpj.map((data, i) => {
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
                                    <td><Link to={`/clienteempresa/${data.id}`}>Editar</Link></td>
                                    <td><a>Excluir</a></td>
                                  </tr>
                                </table>
                            </details>
                        </div>
                        </>
                        )})}
                    </>)}
 

                    </>)}

                    

                    
                    </div>
                </div> 
    </>
    );
}

export default Clientegerenciaadm;