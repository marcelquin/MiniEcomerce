import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Estoque.css';

function Produto() {
    //const baseUrl = "http://34.136.115.180:8080"
    const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get(`${baseUrl}/estoque/ListarEstoque`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    return (
        <>
        <div className="blocoConteudo">
                <table>
                    <tr>
                        <td>Nome</td>
                        <td>Descrição</td>
                        <td>Código</td>
                        <td>Valor</td>
                        <td>Quantidade</td>
                    </tr>
                    {APIData.map((data, i) =>{
                        return(
                            <>
                            <tr key={i}>
                                <td>{data.nome}</td>
                                <td>{data.descricao}</td>
                                <td>{data.codigo}</td>
                                <td>{data.valorFront}</td>
                                <td>{data.quantidade} Unidades</td>
                            </tr>
                            </>
                        )
                    })}            
                </table>                
        </div>        
        </>
    );
}

    export default Produto;