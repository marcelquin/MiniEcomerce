import Navadm from "../Componentes/NavAdm";
import '../Style/Conteudo.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Clientegerenciaadm() {
    const[APIData, setAPIData]= useState([]);

    useEffect(() => {
      Axios
        .get("http://34.29.221.200:8080/cliente/ListarClientes")
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
                            <div className="boxtabela">
                            <table>
                                <tr>
                                    <td>Nome</td>
                                    <td>CPF</td>
                                    <td>Data de Nascimento</td>
                                    <td>Endereço</td>
                                    <td>Telefone</td>
                                    <td>E-Mail</td>
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
                                                    <td>
                                                    <input type="button" className="btnform" value="Editar" />
                                                    </td>
                                                    <td>
                                                    <input type="button" className="btnform" value="Excluir" />
                                                    </td>
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