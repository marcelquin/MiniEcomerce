import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Fornecedor.css';
import '../AdmGlobal.css';
import Axios from 'axios';

function Fornecedorgerenciaadm() {
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData]= useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    APIData.filter(dados => dados.razaoSocial.includes(dadoPesquisa)) :
    []

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

        <div className="admBlocoGeral">
            <div className="admBlocoNav">
                <Navadm></Navadm>
            </div>
            <div className="admBlocoConteudo">
            <div className="fornecedorcampoPesquisa">
                        <label>Razão Social:<br/>
                        <input type="text" name="dadoPesquisa" onChange={e=> setdadoPesquisa(e.target.value)} className="inputPesquisa" placeholder="Digite o coódigo de busca" />
                        </label>
                </div> 

                <div className="fornecedorBox">

                {dadoPesquisa.length > 0 ? (<>
                      {pesquisa.map((data, i) => {
                        return (
                            <>
                        <div className="fornecedorRetorno">
                            <div className="fornecedorDestaque">
                                <div className="thumb"></div>
                                <div className="info">
                                <span>{data.razaoSocial}</span><br/>
                                <span>{data.cnpj}</span><br/>
                                </div>
                            </div>
                            <div className="infoGeral">
                                <span>Nome: {data.nome}</span><br/>
                                <span>Razão Social{data.razaoSocial}</span><br/>
                                <span>CNPJ: {data.cnpj}</span><br/>
                                <span>Área de Atuação: {data.areaAtuacao}</span><br/>
                                <span>Inicio de Contrato: {data.dataInicioContrato}</span><br/>
                                <span>Localização: {data.cep} {data.cidade} -{data.estado} </span><br/>
                                <span>Contato: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                <span>E-mail: {data.contato.email}</span><br/><br/>
                                <span><Link to={`/fornecedoreditar/${data.id}`}>Editar</Link></span><br/>
                            </div>
                        </div>

                                    
                            </>
                           )})}</>
                    ) : (<>
                      {APIData.map((data, i) => {
                        return (
                            <>
                             <div className="fornecedorRetorno">
                            <div className="fornecedorDestaque">
                                <div className="thumb"></div>
                                <div className="info">
                                <span>{data.razaoSocial}</span><br/>
                                <span>{data.cnpj}</span><br/>
                                </div>
                            </div>
                            <div className="infoGeral">
                                <span>Nome: {data.nome}</span><br/>
                                <span>Razão Social{data.razaoSocial}</span><br/>
                                <span>CNPJ: {data.cnpj}</span><br/>
                                <span>Área de Atuação: {data.areaAtuacao}</span><br/>
                                <span>Inicio de Contrato: {data.dataInicioContrato}</span><br/>
                                <span>Localização: {data.cep} {data.cidade} -{data.estado} </span><br/>
                                <span>Contato: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                <span>E-mail: {data.contato.email}</span><br/><br/>
                                <span><Link to={`/fornecedoreditar/${data.id}`}>Editar</Link></span><br/>
                            </div>
                        </div>
   
                            </>
                           )})}
                   </> )}
                </div>
            </div>
        </div> 
        </>
    )
}
export default Fornecedorgerenciaadm;