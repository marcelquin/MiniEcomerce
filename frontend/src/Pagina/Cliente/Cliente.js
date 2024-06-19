import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './CLiente.css';

function Cliente() {
    const baseUrl = "http://34.136.115.180:8080"
    //const baseUrl = "http://localhost:8080"
    //---------------ListGet----------------------
    const[APIData, setAPIData]= useState([]);

    useEffect(() => {
      Axios
        .get(`${baseUrl}/cliente/ListarClientes`)
        .then((response) => { setAPIData(response.data)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);
  
    return (
        <>
            
            <div className="retornoTabelaCliente">
                  <table>
                         <tr>
                            <td>Nome</td>
                            <td>Endereço</td>
                            <td>Telefone</td>
                            <td>E-Mail</td>
                            <td>Scores</td>
                        </tr>            
                    
                {APIData.map((data, i) => {
                            return (
                            <>
                                <tr>
                                    <td><label>{data.nome} {data.sobrenome}</label> </td>
                                    <td><label>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado} </label></td>
                                    <td><label>({data.contato.prefixo}) {data.contato.telefone}</label></td>
                                    <td><label>{data.contato.email}</label></td>
                                    <td><label>{data.score.scoreFront}</label></td> 
                                </tr>
                            </>
                            )})}
                </table>
                    
            </div>  
        </>      
    );
}

    export default Cliente;