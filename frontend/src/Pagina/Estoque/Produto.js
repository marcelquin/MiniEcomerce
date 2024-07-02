import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Estoque.css';

function Produto() {
    const baseUrl = "http://34.133.121.3:8080"
    //const baseUrl = "http://localhost:8080"
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
        {APIData.map((data, i) =>{
                        return(
                            <>

                            <div className='EstoqueRetorno' key={i}>
                                <div className='EstoqueDestaque'>
                                    <div className='thumb'></div>
                                    <div className='info'>
                                        <span>{data.nome}</span><br/>
                                        <span>{data.valorFront}</span><br/>
                                    </div>
                                </div>
                                <div className='infoGeral'>
                                    <span>{data.descricao}</span><br/>
                                    <span>Código: {data.codigo}</span><br/>
                                    <span> {data.quantidade} unidades</span>
                                </div>
                            </div>
                            </>
                        )
                    })}            
                

                
        </div>        
        </>
    );
}

    export default Produto;