import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Caixa.css';
import { useNavigate } from "react-router-dom";


function Pedido() {
  const baseUrl = "http://34.133.121.3:8080"
  //const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const[idput,setidput] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        Axios
          .get(`${baseUrl}/pedido/ListarPedidosAbertos`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    const [caixa, setCaixa] = useState({
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
              'id': idput,
              'formaPagamento': caixa.formaPagamento,
              'parcelas': caixa.parcelas,
              'tipocompra': caixa.tipocompra
      })})
      .then(window.location.reload())
      setCaixa({
        formaPagamento: "",
        parcelas: "",
        tipocompra: ""
    })
    setidput('');
      }catch (err){
        console.log("erro")
      }
    }


    return (
          <>
            <div className="caixaform">
              <table>
                <tr>
                  <td><label>Forma de pagamento: <br/>
                      <input list="formaPagamento" name="formaPagamento"  placeholder="Selecione a Forma de pagameto" onChange={handleChanage} /></label>
                                    <datalist id="formaPagamento">
                                        <option value="DINHEIRO">DINHEIRO</option>
                                        <option value="PIX">PIX</option>
                                        <option value="CREDITO">CREDITO</option>
                                        <option value="DEBITO">DEBITO</option>
                                    </datalist>
                  </td>
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
                    <td>Selecionar</td>
                    <td>CLiente</td>
                    <td>Código</td>
                    <td>Valor</td>
                    <td>Data do pedido</td>
                    <td>Status</td>
                  </tr>
                  {APIData.map((data, i) => {
                        return (
                        <>
                            <tr key={i}>
                                <td><input type="checkbox" value={data.id} onClick={(e) => {setidput(data.id)}}/></td>
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
          </>
    );
}

    export default Pedido;