import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Cliente.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Clientegerenciaadm() {
    const[APIData, setAPIData]= useState([]);
    //const baseUrl = "http://34.171.157.122:8080"
    const baseUrl = "http://localhost:8080"
    useEffect(() => {
      Axios
        .get(`${baseUrl}/cliente/ListarClientes`)
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
                            <div className="AdmBlocoTabela">
                            <table>
                                <tr>
                                    <td>Nome</td>
                                    <td>CPF</td>
                                    <td>Data de Nascimento</td>
                                    <td>Endereço</td>
                                    <td>Telefone</td>
                                    <td>E-Mail</td>
                                    <td>Profissão</td>
                                    <td>Salário Bruto</td>
                                    <td>Salário Liquido</td>
                                    <td>Score</td>
                                </tr>            
                            
                                {APIData.map((data, i) => {
                                            return (
                                            <>
                                                <tr>
                                                    <td><label>{data.nome} {data.sobrenome}</label> </td>
                                                    <td><label>{data.cpf}</label></td>
                                                    <td><label>{data.dataNascimento}</label></td>
                                                    <td><label>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado} </label></td>
                                                    <td><label>({data.contato.prefixo}) {data.contato.telefone}</label></td>
                                                    <td><label>{data.contato.email}</label></td>
                                                    <td><label>{data.profissao}</label></td>
                                                    <td><label>{data.score.salarioBrutoFront}</label></td>
                                                    <td><label>{data.score.salarioLiquidoFront}</label></td>
                                                    <td><label>{data.score.scoreFront}</label></td>        
                                                </tr>
                                            </>
                                            )})}
                            </table>
                        </div>
                    </div>
                </div> 
    </>
    );
}

export default Clientegerenciaadm;