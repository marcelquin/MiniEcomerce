import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Produto.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Produtogerenciaadm() {
    const baseUrl = "http://34.42.43.30:8080"
    //const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get(`${baseUrl}/produto/ListarProdutos`)
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
                        <td>Descrição</td>
                        <td>Código</td>
                        <td>Valor</td>
                        <td>Total Estoque</td> 
                        <td>Data Entrada</td>                  
                    </tr>
                    {APIData.map((data, i) =>{
                        return(
                            <>
                            <tr key={i}>
                                <td>{data.nome}</td>
                                <td>{data.descricao}</td>
                                <td>{data.codigo}</td>
                                <td>{data.valorFront}</td>
                                <td>{data.valorTotalEstoqueFront}</td>
                                <td>{data.DataEntrada}</td>
                            </tr>
                            </>
                        )
                    })} 
                </table>
                </div>                    
                        
                    </div>
                </div>

    </>
    );
}

export default Produtogerenciaadm;