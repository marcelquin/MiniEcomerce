import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Style/Conteudo.css';

function Produto() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://34.29.221.200:8080/produto/ListarProdutos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    return (
        <>
        <div className="blocoConteudo">
          
            <div className="boxtabela">
                <table>
                    <tr>
                        <td>Nome</td>
                        <td>Descrição</td>
                        <td>Código</td>
                        <td>Valor</td>
                        <td>Estoque</td>
                        <td>Total Estoque</td> 
                        <td>Data Entrada</td>                  
                    </tr>
                    {APIData.map((data, i) => {
                        return (
                        <>
                            <tr key={i}>

                                <td>{data.nome}</td>
                                <td>{data.descricao}</td>
                                <td>{data.codigo}</td>
                                <td>{data.valorFront}</td>
                                <td>{data.estoque}</td>
                                <td>{data.valorTotalFront}</td>  
                                <td>{data.DataEntrada}</td>

                            </tr>

                        </>
                        )})}
                </table>
                </div>                    
        </div>        
        </>
    );
}

    export default Produto;