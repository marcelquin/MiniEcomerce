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
      }, [APIData]);

      const[codigoPedido, setcodigoPedido] = useState('');

    return (
        <div className="blocoConteudo">
            <div className="boxForm">
                    {APIData.map((data, i) => {
                        return (
                        <>
                            <details className="retornoPedido" open="open">

                                <summary>{data.codigo}</summary>
		                            <p>Cliente: {data.cliente.nome} </p>
                                <span>Produtos: {data.produtos.map((item)=> {return(<>{item.quantidade}x {item.produto.nome}  </>)})}   </span><br/>
                                <span>Valor Total: {data.valorTotalFront} </span><br/>
                                <span>Data do Pedido: {data.dataPedido} </span><br/>
                                <span>Data Pagamento: {data.dataPagamento}</span><br/>
                                <span>status pagamento: {data.status}</span><br/>                                </details>
                        </>
                        )})}
            </div>
        </div>    
    );
}

    export default Pedido;