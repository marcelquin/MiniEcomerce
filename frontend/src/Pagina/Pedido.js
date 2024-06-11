import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Style/Conteudo.css';

function Pedido() {

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://34.29.221.200:8080/pedido/ListarPedidos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    const [codigoPedido, setCodigoPedido] = useState([]);
    


    return (
        <div className="blocoConteudo">
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
              <div className="pedidoFrame">
              <form>
                    <tr>
                      <td>Código:</td>
                      <td><input type="text" name="nomeCliente" value={codigoPedido} onChange={(e)=> setCodigoPedido(e.target.value)}/></td>   
                      <td><input type="submit" value="Buscar" className="btn"  /></td>
                    </tr>
                  </form>

                     
              </div>
                
            </div>
        </div>    
    );
}

    export default Pedido;