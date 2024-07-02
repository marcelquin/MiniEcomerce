import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './CLiente.css';

function Cliente() {
    const baseUrl = "http://34.133.121.3:8080"
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
            
            <div className="blocoConteudo">              
            
                {APIData.map((data, i) => {
                            return (
                            <>

                                <div className='ClienteRetorno' key={i}>
                                <div className='ClienteDestaque'>
                                    <div className='thumb'></div>
                                    <div className='info'>
                                        <span>{data.nome} {data.sobrenome}</span><br/>
                                        <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                    </div>
                                </div>
                                <div className='infoGeral'>
                                    <span>Data de Nascimento: {data.dataNascimento}</span><br/>
                                    <span>Endereço: {data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span><br/>
                                    <span> Telefone: ({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                                    <span> E-mail: {data.contato.email}</span>
                                </div>
                            </div>        
                            </>
                            )})}
                    
            </div>  
        </>      
    );
}

    export default Cliente;