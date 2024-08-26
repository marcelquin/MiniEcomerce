import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Fornecedor.css';
import '../AdmGlobal.css';
import Axios from 'axios';

function Fornecedorgerenciaadm() {
    const baseUrl = "http://34.67.211.119:8080"
    //const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData]= useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('') 
    const[seletorOpcao, setseletorOpcao] = useState('')
    const[id, setid] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    APIData.filter(dados => dados.razaoSocial.includes(dadoPesquisa)) :
    []

    const [fornecedorData, setfornecedorData] = useState({
        nome: "",
        razaoSocial: "",
        cnpj: "",
        areaAtuacao: "",
        dataContrato: "",
        cep: "",
        cidade: "",
        estado: "",
        prefixo: "",
        telefone: "",
        email: ""
  });

    useEffect(()=>{
        fetch(`${baseUrl}/fornecedor/BuscarFornecedorPorId?id=${id}`,
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setfornecedorData(data)
            })
            .then(console.log(fornecedorData))  
            .catch(err => console.log(err))
    }, [id])

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
        <div className="ndBackground">
            <div className="ndBoxSection">

                <div className="ndBoxNavAdm"><Navadm></Navadm></div>

                <div className="ndBoxSectionIn">
                    <div className="ndSectionInCampoPesquisa">

                        <label>Razão Social:
                        <input type="text" name="dadoPesquisa" onChange={e=> setdadoPesquisa(e.target.value)} className="inputPesquisa" placeholder="Digite o coódigo de busca" />
                        </label>

                    </div>
                    <div className="ndSectionInRetornoInfoFlexAdm">

                        <div className="infoRetornoTabelaAdm">

                            <table>
                                    <tr>
                                        <td>Razão Social</td>
                                        <td>CNPJ</td>
                                        <td>Área de Atuação</td>
                                        <td>Telefone</td>
                                        <td>E-mail</td>
                                    </tr>

                                    {dadoPesquisa.length >0 ?(<>
                                
                                        {pesquisa.map((data, i)=>{return(<>
                                            
                                            <tr>
                                                <td>{data.razaoSocial}</td>
                                                <td>{data.cnpj}</td>
                                                <td>{data.areaAtuacao}</td>
                                                <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                                                <td>{data.contato.email}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                        </>)})}

                                    </>):(<>
                                    
                                        {APIData.map((data, i)=>{return(<>
                                        
                                            <tr>
                                                <td>{data.razaoSocial}</td>
                                                <td>{data.cnpj}</td>
                                                <td>{data.areaAtuacao}</td>
                                                <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                                                <td>{data.contato.email}</td>
                                                <td><button onClick={(e)=>{setid(data.id)}}>Mais Informaçções</button></td>
                                                <td><Link to={`/fornecedoreditar/${data.id}`}>
                                                <button>Editar Informaçções</button>
                                                </Link></td>                                                
                                       
                                            </tr>
                                        
                                        </>)})}

                                    </>)}

                                </table>

                        </div>

                        <div className="infoRetornoVisorAdm">
                                                      
                                <table>
                                    <tr>
                                        <td>Nome: {fornecedorData.nome}</td>
                                    </tr>
                                    <tr>    
                                        <td>Razão Social: {fornecedorData.razaoSocial}</td>
                                    </tr>
                                    <tr> 
                                        <td>CNPJ: {fornecedorData.cnpj}</td>
                                    </tr>
                                    <tr> 
                                        <td>Inicio de Contrato: {fornecedorData.dataContrato}</td>
                                    </tr>
                                    <tr> 
                                        <td>Área de Atuação: {fornecedorData.areaAtuacao}</td>
                                    </tr>
                                    <tr> 
                                        <td>Localização: {fornecedorData.cep}, {fornecedorData.cidade}-{fornecedorData.estado} </td>
                                    </tr>
                                    <tr>     
                                        <td>Telefone: ({fornecedorData.prefixo}) {fornecedorData.telefone}</td>
                                    </tr>
                                </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>    

        <div className="ndBackground">
            <div className="ndBoxSection">
                
                <div className="ndBoxNavAdm"><Navadm></Navadm></div>

                <div className="ndBoxSectionIn">
                    <div className="ndSectionInRetornoInfo">
                        
                    <div className="ndSectionInCampoPesquisa">
                            
                    </div> 

                    <div className="ndSectionInRetornoInfoFlexAdm">

                        <div className="infoRetornoTabelaAdm">
                           
                            

                        </div>

                        <div className="infoRetornoVisorAdm">                         
                                                          
                        </div>      
                    
                    </div>    

                    </div>
                </div>
            </div>
        </div>    


        <div className="admBlocoGeral">
            <div className="admBlocoNav">
                <Navadm></Navadm>
            </div>
            <div className="admBlocoConteudo">
            <div className="fornecedorcampoPesquisa">
                        
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
                                <span></span><br/>
                                <span>{data.cnpj}</span><br/>
                                </div>
                            </div>
                            <div className="infoGeral">
                                <span>Nome: {data.nome}</span><br/>
                                <span>Razão Social{data.razaoSocial}</span><br/>
                                <span>CNPJ: {data.cnpj}</span><br/>
                                <span>Área de Atuação:</span><br/>
                                <span>Inicio de Contrato: {data.dataInicioContrato}</span><br/>
                                <span>Localização: {data.cep} {data.cidade} -{data.estado} </span><br/>
                                <span>Contato: </span><br/>
                                <span>E-mail: </span><br/><br/>
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