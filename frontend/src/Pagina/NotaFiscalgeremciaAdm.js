import Navadm from "../Componentes/NavAdm";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Conteudo.css';
import Axios from 'axios';

function Notafiscalgerenciaadm() {

    const[APIData, setAPIData]= useState([]);

    useEffect(() => {
      Axios
        .get("http://34.171.157.122:8080/notafiscal/ListarNotasFiscais")
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
                        
                        <td>XML</td>
                        <td>Valor</td>
                        <td>Data de entrada</td>
                        <td>Empresa</td>
                        <td>CNPJ</td>
                        <td>Produtos</td>

                    </tr>
                    {APIData.map((data, i) => {
                            return (
                            <>
                                <tr key={i}>
                                    <td><label>{data.xml}</label> </td>
                                    <td><label>{data.valorFront}</label></td>
                                    <td><label>{data.dataEntrada}</label></td>
                                    <td><label>{data.fornecedor.razaoSocial}</label></td>
                                    <td><label>{data.fornecedor.cnpj}</label></td>
                                    <td>{data.produtos.map((item) =>{ return(<><label>{item.nome}, </label></>)})}</td>
                                </tr>
                                            </>
                                            )})}
                </table>


            </div>
        </div>
        </>
    )
}
export default Notafiscalgerenciaadm;