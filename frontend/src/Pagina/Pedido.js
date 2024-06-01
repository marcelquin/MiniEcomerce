import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Style/Conteudo.css';

function Pedido() {

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://localhost:8080/pedido/ListarPedidos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      const[codigoPedido, setcodigoPedido] = useState('');

      async function FinalizarPedido(e){
        try{
          fetch('http://localhost:8080/pedido/FinalizarPedido', {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'codigoPedido': codigoPedido,
        })})
        setcodigoPedido('');
        }catch (err){
          console.log("erro")
        }
      }
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
                                <span>status pagamento: {data.status}</span><br/>                                </details>
                        </>
                        )})}
            </div>
        </div>    
    );
}

    export default Pedido;