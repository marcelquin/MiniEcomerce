import Navadm from "../Componentes/NavAdm";
import '../Style/Conteudo.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Pedidogerenciaadm() {

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://localhost:8080/pedido/ListarPedidos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    const [codigoPedido, setCodigoPedido] = useState([]);

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
                                <td>Data</td>
                                <td>Status</td>
                                </tr>
                                {APIData.map((data, i) => {
                                    return (
                                    <>
                                        <tr key={i}>

                                            <td>{data.nomeCLiente}</td>
                                            <td>{data.codigo}</td>
                                            <td>{data.valorTotalFront}</td>
                                            <td>{data.dataPedido}</td>
                                            <td>{data.status}</td>
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