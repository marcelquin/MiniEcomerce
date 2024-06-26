import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Fornecedor.css';
import Axios from 'axios';

function Fornecedorgerenciaadm() {
  const baseUrl = "http://34.136.115.180:8080"
  //const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData]= useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
    [];
    useEffect(() => {
      Axios
        .get(`${baseUrl}/fornecedor/ListarFornecedor`)
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
                                <summary>{data.razaoSocial}</summary>
                                <p>Dados Da Empresa:</p>
                                <span>Nome: {data.nome}</span><br/>
                                <span>Razão Social: {data.razaoSocial}</span><br/>
                                <span>CNPJ: {data.cnpj}</span><br/>
                                <span>Área de Atuação: {data.areaAtuacao}</span><br/>
                                <span>Início de contrato: {data.dataInicioContrato}</span><br/>
                                <p>Localização e contato</p>
                                <span>CEP: {data.cep}</span><br/>
                                <span>Cidade: {data.cidade} -{data.estado}</span><br/>
                                <span>Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                <span>Email: {data.contato.email}</span><br/>
                                <table>
                                  <tr>
                                    <td><Link to={`/fornecedoreditar/${data.id}`}>Editar</Link></td>
                                    <td><a>Excluir</a></td>
                                  </tr>
                                </table>
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
                                <summary>{data.razaoSocial}</summary>
                                <p>Dados Da Empresa:</p>
                                <span>Nome: {data.nome}</span><br/>
                                <span>Razão Social: {data.razaoSocial}</span><br/>
                                <span>CNPJ: {data.cnpj}</span><br/>
                                <span>Área de Atuação: {data.areaAtuacao}</span><br/>
                                <span>Início de contrato: {data.dataInicioContrato}</span><br/>
                                <p>Localização e contato</p>
                                <span>CEP: {data.cep}</span><br/>
                                <span>Cidade: {data.cidade} -{data.estado}</span><br/>
                                <span>Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                <span>Email: {data.contato.email}</span><br/>
                                <table>
                                  <tr>
                                    <td><Link to={`/fornecedoreditar/${data.id}`}>Editar</Link></td>
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
    )
}
export default Fornecedorgerenciaadm;