import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './CLiente.css';

function Cliente() {
  //const baseUrl = "http://34.67.211.119:8080"
  const baseUrl = "http://localhost:8080"
    //---------------ListGet----------------------
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

    async function buscaCLientes(){
        await Axios
        .get(`${baseUrl}/cliente/ListarClientes`)
        .then((response) => { setAPIDataCpf(response.data)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
       }
       
       async function buscaCLientesEmpresa(){
        await Axios
        .get(`${baseUrl}/clienteempresa/ListarClienteEmpresa`)
        .then((response) => { setAPIDataCnpj(response.data)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
       }    


    useEffect(() => {
        buscaCLientes()
        buscaCLientesEmpresa()
    }, []);
  
    return (
        <>
            
            <div className="blocoConteudo">              
                    <div className="clienteSeletorCadastro">
                        <input type="radio" name="filtroCadastro" value="CPF" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa fisica
                        <input type="radio" name="filtroCadastro" value="CNPJ" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa Juridica
                    </div>
            <div className=''> 
                    {filtroCadastro.length === 3 ?(<>
                    
                    <div className="clientecampoPesquisa">
                      <label>Nome:<br/>
                      <input type="text" onChange={e=> setdadoPesquisaCpf(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                      </label>
                    </div>
                    
                    <div className="clienteBox">

                      {dadoPesquisaCpf.length >0 ?(<>
                        {pesquisacpf.map((data, i) => {
                          return (
                            <>

                            <div className="clienteRetorno">
                              <div className="clienteDestaque">
                                <div className="thumb"></div>
                                <div className="info">
                                  <span>{data.nome} {data.sobrenome}</span><br/>
                                  <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                              </div>
                            </div>
                            <div className="infoGeral">
                              <span>CPF: {data.cpf}</span><br/>
                              <span>Data de Nascimento: {data.dataNascimento}</span><br/>
                              <span>Endereço: {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span><br/>
                              <span> Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                              <span> E-mail: {data.contato.email}</span><br/><br/>
                            </div>
                         </div>
                          </>
                          )})}
                      </>) : (<>
                        {APIDataCpf.map((data, i) => {
                          return (
                            <>
                           <div className="clienteRetorno">
                              <div className="clienteDestaque">
                                <div className="thumb"></div>
                                <div className="info">
                                  <span>{data.nome} {data.sobrenome}</span><br/>
                                  <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                              </div>
                            </div>
                            <div className="infoGeral">
                              <span>CPF: {data.cpf}</span><br/>
                              <span>Data de Nascimento: {data.dataNascimento}</span><br/>
                              <span>Endereço: {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span><br/>
                              <span> Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                              <span> E-mail: {data.contato.email}</span><br/><br/>
                            </div>
                         </div>
                          </>
                          )})}
                      </>)}
                          </div>
                  </>) : (<>
                   
                    <div className="clientecampoPesquisa">
                      <label>Nome:<br/>
                      <input type="text" onChange={e=> setdadoPesquisaCnpj(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                      </label>
                  </div>

                  <div className="clienteBox">
                  {dadoPesquisaCnpj.length >0 ?(<>
                    {pesquisacnpj.map((data, i) => {
                      return (
                        <>
                          <div className="clienteRetorno">
                              <div className="clienteDestaque">
                                <div className="thumb"></div>
                                <div className="info">
                                  <span>{data.nome} </span><br/>
                                  <span>{data.razaoSocial} </span><br/>
                              </div>
                            </div>
                            <div className="infoGeral">
                                <span>CNPJ: {data.cnpj}</span><br/>
                                <span>Endereço: {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span><br/>
                                <span> Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                <span> E-mail: {data.contato.email}</span><br/><br/>
                            </div>
                         </div>
                      </>
                      )})}
                  </>) : (<>
                    {APIDataCnpj.map((data, i) => {
                      return (
                        <>
                        <div className="clienteRetorno">
                              <div className="clienteDestaque">
                                <div className="thumb"></div>
                                <div className="info">
                                  <span>{data.nome} </span><br/>
                                  <span>{data.razaoSocial} </span><br/>
                              </div>
                            </div>
                            <div className="infoGeral">
                                <span>CNPJ: {data.cnpj}</span><br/>
                                <span>Endereço: {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span><br/>
                                <span> Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                <span> E-mail: {data.contato.email}</span><br/><br/>
                            </div>
                         </div>
                      </>
                      )})}
                  </>)}
                   
            </div>
                  </>)}
                  </div>    
        </div>
        </>      
    );
}

    export default Cliente;