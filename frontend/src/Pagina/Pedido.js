import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Style/Conteudo.css';

function Pedido() {

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://104.198.154.70:8080/pedido/ListarPedidos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    return (
        <div className="blocoConteudo">
            <div className="boxForm">
                 <table>
                      <tr>
                        <td>Cliente</td>
                        <td>Codigo</td>
                        <td>Produtos</td>
                        <td>Valor Total</td>
                        <td>Data do Pedido</td>
                        <td>Data Pagamento</td>
                        <td>status pagamento</td>          
                      </tr>
                    {APIData.map((data, i) => {
                        return (
                        <>
                            <tr>
                              <td>{data.cliente.nome}</td>
                              <td>{data.codigo}</td>
                              <td>{data.produtos.map((item)=> {return(<>{item.quantidade}x {item.produto.nome}  </>)})} </td>
                              <td>{data.valorTotalFront}</td>
                              <td>{data.dataPedido}</td>
                              <td>{data.dataPagamento}</td>
                              <td>{data.status}</td>
                            </tr>                             
                        </>
                        )})}
                        </table>
            </div>
        </div>    
    );
}

    export default Pedido;