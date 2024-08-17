import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Empresa.css';
import '../AdmGlobal.css';
import Axios from 'axios';

function Empresagerenciaadm() {
  //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
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

        <div className="admBlocoGeral">
            <div className="admBlocoNav"><Navadm></Navadm></div>
            <div className="admBlocoConteudo">
            <div className="admConteudo">

                    
{APIData.map((data, i) => {
  return (
      <>
      <div className="cartaoVisita">

        <div className="infoDestaque">
          <div className="thumb"></div>
          <div className="info">
              <h1>{data.razaoSocial}</h1><br/>
              <h1>{data.cnpj}</h1>
          </div>

        </div>
        <div className="infoGeral" key={i}>
        <span>Nome: {data.nome}</span><br/>
             <span>Razão Social: {data.razaoSocial}</span><br/>
             <span>CNPJ: {data.cnpj}</span><br/>
             <span>Área de Atuação: {data.areaAtuacao}</span><br/>
             <span>Início de contrato: {data.dataInicioContrato}</span><br/>
             <p>Endereço e contato</p>
            <span>Endereço: {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span><br/>
            <span>Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
            <span>Email: {data.contato.email}</span><br/><br/>
          <Link to={`/empresaeditar/${data.id}`}>Editar</Link>
        </div>

      </div>
      </>
     )})}



</div>
            </div>
        </div>

        </>
    )
}
export default Empresagerenciaadm;