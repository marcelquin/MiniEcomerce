import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Caixa.css';


function Pedido() {
  //const baseUrl = "http://34.133.121.3:8080"
  const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const[idput,setidput] = useState('');
    const [idInfo, setidInfo] = useState('');
    const [PedidoData, setPedidoData] = useState({
      codigo: '',
      cliente: '',
      itens: '',
      valor: '',
      formapagamento: '',
      dataPagamento: '',
    })
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
        parcelas: 1,
        tipocompra: "PADRAO"
  });

  useEffect(()=>{
    fetch(`${baseUrl}/pedido/BuscarPedidoPorId?id=${idInfo}`, 
        {
            method:'GET',
            headers:{
                'content-type': 'application/json',
            },
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setPedidoData(data)
        })
        .catch(err => console.log(err))
}, [idInfo])
      
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
    })
    setidput('');
      }catch (err){
        console.log("erro")
      }
    }
    return (
          <>
           <div className='boxgeral'>

                 

            <div className='boxform'>
            <form>
                    <table>
                        <tr>
                          <td><label>Forma de pagamento:<br/>
                            <input list="formaPagamento" name="formaPagamento"  placeholder="Selecione a Forma de pagameto" onChange={handleChanage} />
                                          <datalist id="formaPagamento">
                                              <option value="DINHEIRO">DINHEIRO</option>
                                              <option value="PIX">PIX</option>
                                              <option value="CREDITO">CREDITO</option>
                                              <option value="DEBITO">DEBITO</option>
                                          </datalist>
                                          </label></td>
                        </tr>
                        {caixa.formaPagamento.length === 7?(<>
                          <tr>
                          <td><label>Parcelas: <br/><input type="number" name="parcelas" onChange={handleChanage}/></label></td>   
                          </tr>
                        </>):(<></>)}         
                        <tr>  
                          <td>
                            <input type='checkbox' name="tipocompra" value="ENTREGA" onClick={handleChanage} />Entrega
                          <br/>
                          </td>
                      </tr>
                      <tr>
                        <td><input type="submit" value="Finalizar" className="btn" onClick={FinalizarPedido} />
                      </td>
                      </tr>
                  </table>
                </form>
            </div>
            <div className='boxtabela'>
                <div className='retornoTabela'>
                <table>
                  <tr>
                    <td>Selecionar</td>
                    <td>Cliente</td>
                    <td>Código</td>
                    <td>Data Compra</td>
                    <td>Valor</td>
                  </tr>
                  {APIData.map((data, i) => {
                        return (
                        <>
                            <tr key={i}>
                                <td><input type="checkbox" value={data.id} onClick={(e) => {setidput(data.id)}}/></td>
                                <td>{data.nomeCLiente}</td>
                                <td>{data.codigo}</td>
                                <td>{data.dataPedido}</td>
                                <td>{data.valorTotalFront}</td>
                                <td><a onClick={(e) => {setidInfo(data.id)}}>+detalhes</a></td>
                            </tr>
                        </>
                        )})}
                </table>
                </div>
                <div className='retornoCupomFiscal'>
                    <a>Imprimir</a> <a>Enviar por email</a>
                    <div className='boxCupom'>
                      {idInfo}
                      {idput}
                      {}
                    </div>
                </div>
            </div>
          </div>
          </>
    );
}

    export default Pedido;