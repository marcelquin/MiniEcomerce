import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Empresa.css';
import Axios from 'axios';

function Empresagerenciaadm() {
  const baseUrl = "http://34.133.121.3:8080"
  //const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData]= useState([]);

    useEffect(() => {
      Axios
        .get(`${baseUrl}/empresa/ListarEmpresas`)
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
                                   <p>Endereço e contato</p>
                                <span>Endereço: {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span><br/>
                                <span>Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                <span>Email: {data.contato.email}</span><br/>
                                   <table>
                                     <tr>
                                       <td><Link to={`/empresaeditar/${data.id}`}>Editar</Link></td>
                                       <td><a>Excluir</a></td>
                                     </tr>
                                   </table>
                               </details>
                           </div> 
                            </>
                           )})}
                   
                   

            </div>
        </div>
        </>
    )
}
export default Empresagerenciaadm;