import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Compra.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Pedidogerenciaadm() {
    const baseUrl = "http://34.42.43.30:8080"
    //const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get(`${baseUrl}/pedido/ListarPedidos`)
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
                    <div className="pedidoBox">


                        <div className="pedidoBloco">
                            <table>
                                <tr>
                                <td>CLiente</td>
                                <td>Código</td>
                                <td>Valor</td>
                                <td>Data do pedido</td>
                                <td>Status</td>
                                <td>Forma de Pagamento</td>
                                <td>Parcelas</td>
                                <td>Data de Pagamento</td>
                                <td>Itens</td>
                                </tr>
                                {APIData.map((data, i) => {
                                    return (
                                    <>
                                        <tr key={i}>
                                        
                                            <td>{data.cliente.nome}</td>
                                            <td>{data.codigo}</td>
                                            <td>{data.valorTotalFront}</td>
                                            <td>{data.dataPedido}</td>
                                            <td>{data.status}</td>
                                            <td>{data.pagamento.formaPagamento}</td>
                                            <td>{data.pagamento.parcelas}</td>
                                            <td>{data.pagamento.dataPagamento}</td>
                                            <td>{data.produtos.map((item, i) => { return(<>{item.quantidade}x {item.produto.nome} </>)})}</td>

                                        </tr>

                                    </>
                                    )})}
                            </table>
                        </div>
                </div>
            </div>
            </div>
    </>
    );
}

export default Pedidogerenciaadm;