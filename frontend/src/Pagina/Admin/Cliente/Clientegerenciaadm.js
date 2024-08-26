import { Link } from "react-router-dom";
import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Cliente.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Clientegerenciaadm() {
  const navigate = useNavigate();
    const [idInfo, setidInfo] = useState('')
    const [seletorOpcao,setseletorOpcao] = useState('')
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

    const baseUrl = "http://34.67.211.119:8080"
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

    
    const deletarClienteEmpresa=async (id)=>{
      try{
        await fetch(`${baseUrl}/clienteempresa/deletarClienteEmpresa`, { 
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },    
          body: new URLSearchParams({
              'id': id
      })})  
      }catch (err){
        console.log("erro")
      }
    }

    /*
    const deletarCliente=async (id)=>{
      try{
        await fetch(`${baseUrl}/cliente/DeletarCliente`, {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },    
          body: new URLSearchParams({
              'id': id
      })})  
      }catch (err){
        console.log("erro")
      }
    }
    */
    return(
    <>

    <div className="ndBackground">
      <div className="ndBoxSection">
                    
        <div className="ndBoxNavAdm"><Navadm></Navadm></div>
        <div className="ndBoxSectionIn">
          <div className="ndSectionInRetornoInfo">

            <div className="ndSectionInCampoFiltroCadastro">

              <input type="radio" name="filtroCadastro" value="CPF" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa fisica
              <input type="radio" name="filtroCadastro" value="CNPJ" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa Juridica

            </div>
            
             {filtroCadastro.length === 3 ?(<>
             
              <div className="ndSectionInCampoPesquisa">

                <label>Nome:
                  <input type="text" onChange={e=> setdadoPesquisaCpf(e.target.value)} name="dadoPesquisaCpf" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                </label>

              </div>
             
              <div className="ndSectionInRetornoInfo">

                <table>
                  <tr>
                    <td>Nome</td>
                    <td>cpf</td>
                    <td>Endereço</td>
                    <td>Telefone</td>
                    <td>E-mail</td>
                  </tr>
                  {dadoPesquisaCpf.length>0?(<>
                  
                  {pesquisacpf.map((data, i)=>{return(<>
                  
                    <tr key={i}>
                      <td>{data.nome} {data.sobrenome}</td>
                      <td>{data.cpf}</td>
                      <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                      <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                      <td>{data.contato.email}</td>
                      <td><Link to={`/clienteeditar/${data.id}`}>
                        <button>Editar Informações</button></Link>
                      </td>
                    </tr>
                  
                  </>)})}
                  
                  </>):(<>
                  
                    
                    {APIDataCpf.map((data, i)=>{return(<>
                  
                      <tr key={i}>
                        <td>{data.nome} {data.sobrenome}</td>
                        <td>{data.cpf}</td>
                        <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                        <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                        <td>{data.contato.email}</td>
                        <td><Link to={`/clienteeditar/${data.id}`}>
                        <button>Editar Informações</button></Link>
                        </td>
                      </tr>
                    
                    </>)})}

                  </>)}
                </table>      

              </div>

             </>):(<>
              
              <div className="ndSectionInCampoPesquisa">

                <label>Razao Social:
                  <input type="text" onChange={e=> setdadoPesquisaCnpj(e.target.value)} name="dadoPesquisaCnpj" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                </label>

              </div>
             
              <div className="ndSectionInRetornoInfo">

                <table>
                  <tr>
                    <td>Nome</td>
                    <td>Razão Social</td>
                    <td>CNPJ</td>
                    <td>Endereço</td>
                    <td>Telefone</td>
                    <td>E-mail</td>
                  </tr>
                  {dadoPesquisaCnpj.length>0?(<>
                  
                  {pesquisacnpj.map((data, i)=>{return(<>
                  
                    <tr key={i}>
                        <td>{data.nome}</td>
                        <td>{data.razaoSocial}</td>
                        <td>{data.cnpj}</td>
                        <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                        <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                        <td>{data.contato.email}</td>
                        <td><Link to={`/clienteempresa/${data.id}`}>
                        <button>Editar Informações</button></Link></td>
                      </tr>
                  
                  </>)})}
                  
                  </>):(<>
                  
                    
                    {APIDataCnpj.map((data, i)=>{return(<>
                  
                      <tr key={i}>
                        <td>{data.nome}</td>
                        <td>{data.razaoSocial}</td>
                        <td>{data.cnpj}</td>
                        <td>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</td>
                        <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                        <td>{data.contato.email}</td>
                        <td><Link to={`/clienteempresa/${data.id}`}>
                        <button>Editar Informações</button></Link></td>
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


    </>);
}

export default Clientegerenciaadm;