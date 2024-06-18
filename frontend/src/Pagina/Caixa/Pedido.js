import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Caixa.css';

function Pedido() {
    const baseUrl = "http://34.171.157.122:8080"
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://34.171.157.122:8080/pedido/ListarPedidosAbertos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    const [caixa, setCaixa] = useState({
        codigo: "",
        formaPagamento: "",
        parcelas: "",
        tipocompra: ""
  });

      
    const handleChanage = (e) => {
      setCaixa(prev=>({...prev,[e.target.name]:e.target.value}));
    }  

    async function FinalizarPedido(e){
      try{
        fetch(`${baseUrl}/pedido/FinalizarPedido`, {
          method: 'PUT',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },    
          body: new URLSearchParams({
              'codigoPedido': caixa.codigo,
              'formaPagamento': caixa.formaPagamento,
              'parcelas': caixa.parcelas,
              'tipocompra': caixa.tipocompra
      })})
      setCaixa({
        codigo: "",
        formaPagamento: "",
        parcelas: "",
        tipocompra: ""
    })
      }catch (err){
        console.log("erro")
      }
    }

    return (
          <>
            <div className="caixaform">
              <table>
                <tr>
                  <td><label>Código: <br/><input type="text" name="codigo" onChange={handleChanage}/></label></td>   
                  <td><label>Forma de pagamento: <br/>
                      <input list="formaPagamento" name="formaPagamento"  placeholder="Selecione a Forma de pagameto" onChange={handleChanage} /></label>
                                    <datalist id="formaPagamento">
                                        <option value="DINHEIRO">DINHEIRO</option>
                                        <option value="PIX">PIX</option>
                                        <option value="CREDITO">CREDITO</option>
                                        <option value="DEBITO">DEBITO</option>
                                    </datalist>
                  </td>
                </tr>
                <tr>
                  <td><label>Parcelas: <br/><input type="number" name="parcelas" onChange={handleChanage}/></label></td>   
                  <td><label>Tipo Compra:<br/><input list="tipocompra" name="tipocompra"  placeholder="Selecione uma opção" onChange={handleChanage} /></label>
                                    <datalist id="tipocompra">
                                        <option value="PADRAO">PADRAO</option>
                                        <option value="ENTREGA">ENTREGA</option>
                                    </datalist>
                   </td>
                </tr>
                <tr>
                  <td><input type="submit" value="Finalizar" className="btn" onClick={FinalizarPedido} />
                </td>
                </tr>
              </table>
            </div>

            <div className="caixaretornotabela">
              <table>
                  <tr>
                    <td>CLiente</td>
                    <td>Código</td>
                    <td>Valor</td>
                    <td>Data do pedido</td>
                    <td>Status</td>
                    <td>Itens</td>
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
                                <td>{data.produtos.map((item, i) => { return(<>{item.quantidade}x {item.produto.nome}</>)})}</td>
                            </tr>

                        </>
                        )})}
              </table>
            </div>
          </>
    );
}

    export default Pedido;