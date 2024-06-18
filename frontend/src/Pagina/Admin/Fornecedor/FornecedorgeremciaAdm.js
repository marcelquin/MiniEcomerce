import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Fornecedor.css';
import Axios from 'axios';

function Fornecedorgerenciaadm() {
    const baseUrl = "http://34.171.157.122:8080"
    const[APIData, setAPIData]= useState([]);
    const Navigate = useNavigate
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

               <table>

                 <tr>
                       
                    <td>Nome</td>
                    <td>Razão Social</td>
                    <td>CNPJ</td>
                    <td>Área de atuação</td>
                    <td>Inicio de Contrato</td>
                    <td>CEP</td>
                    <td>Cidade</td>
                    <td>Estado</td>
                    <td>Telefone</td>
                    <td>E-mail</td>

                 </tr>
                    {APIData.map((data, i) => {
                     return (
                         <>
                           <tr key={i}>
                           <td><label>{data.nome}</label> </td>
                           <td><label>{data.razaoSocial}</label></td>
                           <td><label>{data.cnpj}</label></td>
                           <td><label>{data.areaAtuacao}</label></td>
                           <td><label>{data.dataInicioContrato}</label></td>
                           <td><label>{data.cep}</label></td>
                           <td><label>{data.cidade}</label></td>
                           <td><label>{data.estado}</label></td>
                           <td><label>({data.contato.prefixo}) {data.contato.telefone}</label></td>
                           <td><label>{data.contato.email}</label></td>
                          
                    </tr>
                         </>
                        )})}
                </table>

            </div>
        </div>
        </>
    )
}
export default Fornecedorgerenciaadm;