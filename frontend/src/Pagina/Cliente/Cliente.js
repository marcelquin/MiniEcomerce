import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './CLiente.css';
import '../../Style/Global.css'
import Nav from '../../Componentes/Nav/Nav'

function Cliente() {
    const baseUrl = "http://34.67.211.119:8080"
    //const baseUrl = "http://localhost:8080"
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
        <div className='ndBackground'>
            
            <div className='ndBoxSection'>
                <div className='ndBoxNav'><Nav></Nav></div>
                <div className='ndBoxSectionIn'>
                    <div className='clienteBlocoBoxForm'>
                      <div className='clienteBlocoCampoSeletorCadastro'>
                        <input type="radio" name="filtroCadastro" value="CPF" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa fisica
                        <input type="radio" name="filtroCadastro" value="CNPJ" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa Juridica
                      </div>
                      {filtroCadastro.length === 3 ?(<>
                        
                        <div className='clienteBlocoCampoPesquisa'>
                          <label>Nome:<br/>
                          <input type="text" onChange={e=> setdadoPesquisaCpf(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                          </label>
                        </div>
                        
                        <div className='clienteBlocoBoxRetornoInformacao'>

                          <table>
                            <tr>
                              <td>Nome:</td>
                              <td>Endereço:</td>
                              <td>Telefone:</td>
                              <td>Data de Nascimento:</td>
                              <td>Email:</td>
                            </tr>
                            {dadoPesquisaCpf.length >0 ?(<>
                            
                              {pesquisacpf.map((data, i) => {return(<>
                              
                                <tr key={i}>
                                    <td>{data.nome} {data.sobrenome}</td>
                                    <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                                    <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                                    <td>{data.dataNascimento}</td>
                                    <td>{data.contato.email}</td>
                                </tr>

                              </>)})}

                            </>):(<>
                            
                              {APIDataCpf.map((data, i) => {return(<>
                              
                                <tr key={i}>
                                    <td>{data.nome} {data.sobrenome}</td>
                                    <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                                    <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                                    <td>{data.dataNascimento}</td>
                                    <td>{data.contato.email}</td>
                                </tr>

                              </>)})}
                            
                            </>)}
                          </table>

                        </div>


                      </>):(<>

                        <div className='clienteBlocoCampoPesquisa'>
                          <label>Razão Social:<br/>
                          <input type="text" onChange={e=> setdadoPesquisaCnpj(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                          </label>
                        </div>
                        
                        <div className='clienteBlocoBoxRetornoInformacao'>
                        <table>
                            <tr>
                              <td>Razão Social:</td>
                              <td>Endereço:</td>
                              <td>Telefone:</td>
                              <td>Data de Nascimento:</td>
                              <td>Email:</td>
                            </tr> 
                        {dadoPesquisaCpf.length >0 ?(<>
                        
                          {pesquisacnpj.map((data, i) => {return(<>
                              
                              <tr key={i}>
                                  <td>{data.razaoSocial}</td>
                                  <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                                  <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                                  <td>{data.dataNascimento}</td>
                                  <td>{data.contato.email}</td>
                              </tr>

                            </>)})}

                        </>):(<>
                        
                          {APIDataCnpj.map((data, i) => {return(<>
                              
                              <tr key={i}>
                                  <td>{data.razaoSocial}</td>
                                  <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                                  <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                                  <td>{data.dataNascimento}</td>
                                  <td>{data.contato.email}</td>
                              </tr>

                            </>)})}

                        </>)}
                           </table> 
                        </div>  
                        </>)}
                      
                    </div>
                  </div>
                </div>
                </div>
        </>      
    );
}

    export default Cliente;