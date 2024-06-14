import Navadm from "../Componentes/NavAdm";
import '../Style/Conteudo.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Entregagerenciaadm() {

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://localhost:8080/entrega/ListarEntregas")
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
                                <td>Endereço</td>
                                <td>Telefone para Contato</td>
                                <td>Status da entrega</td>
                                <td>Data entrega</td>
                                <td>Itens do pedido</td>
                                </tr>
                                {APIData.map((data, i) => {
                                    return (
                                    <>
                                        <tr key={i}>
                                        
                                            <td>{data.nomeCliente}</td>
                                            <td>{data.enderecoEntrega}</td>
                                            <td>{data.telefoneContato}</td>
                                            <td>{data.statusEntrega}</td>
                                            <td>{data.dataEntrega}</td>
                                            <td>{data.produtos}</td>

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

export default Entregagerenciaadm;