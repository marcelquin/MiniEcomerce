import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import './Caixa.css';
import '../../Style/Global.css'
import Nav from '../../Componentes/Nav/Nav';
import { useReactToPrint } from "react-to-print";

function Pedido() {
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const documentPrint = useRef();
    const [APIDataEmpresa, setAPIDataEmpresa] = useState([]);
    const [APIData, setAPIData] = useState([]);
    const[idput,setidput] = useState('');
    const [idInfo, setidInfo] = useState('');
    const [responseData, setresponseData] = useState({
      codigo: '',
      nomeCliente: '',
      sobrenomeCliente: '',
      telefone: '',
      dataVenda: '',
      itens: [],
      valor: ''
    })
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
        tipocompra: "PADRAO",
        valorPago: 0,
        desconto: 0
  });

  useEffect(() => {
    Axios
      .get(`${baseUrl}/empresa/ListarEmpresas`)
      .then((response) => { setAPIDataEmpresa(response.data)}) 
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  useEffect(()=>{
    fetch(`${baseUrl}/pedido/BuscarPedidoPorIdCaixa?id=${idInfo}`, 
        {
            method:'GET',
            headers:{
                'content-type': 'application/json',
            },
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setresponseData(data)
        })
        .catch(err => console.log(err))
}, [idInfo])
      
    const handlePrint = useReactToPrint  ({
      content: ()=> documentPrint.current,
    })

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
              'valorPago': caixa.valorPago,
              'desconto': caixa.desconto,
              'tipocompra': caixa.tipocompra
      })})
      .then(handlePrint())
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

<div className='ndBackground'>
            
            <div className='ndBoxSection'>
                <div className='ndBoxNav'><Nav></Nav></div>
                <div className='ndBoxSectionInFlex'>
                    
                    <div className='BoxRetornoTabela'>

                      <div className='formPost'>
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
                                    {caixa.formaPagamento.length === 8?(<>
                                    <tr>
                                    <td><label>Valor Pago: <br/><input type="number" name="valorPago" onChange={handleChanage}/></label></td>   
                                    </tr>
                                    </>):(<></>)}

                                   {caixa.formaPagamento.length === 7?(<>
                                    <tr>
                                    <td><label>Parcelas: <br/><input type="number" name="parcelas" onChange={handleChanage}/></label></td>   
                                    </tr>
                                </>):(<></>)}                 
                                  <td>
                                    <input type='checkbox' name="tipocompra" value="ENTREGA" onClick={handleChanage} />Entrega
                                  </td>
                              </tr>
                              <tr>
                                <td>
                                <label>Desconto: <br/><input type="number" name="desconto" onChange={handleChanage}/></label>
                                </td>
                                <td><input type="submit" value="Finalizar" className="btn" onClick={FinalizarPedido} />
                              </td>
                              </tr>
                          </table>
                        </form>

                      </div>
                      <div className='infoCadastro'>

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
                                      <td><button onClick={(e) => {setidInfo(data.id)}}>Mais Informações</button></td>
                                  </tr>
                              </>
                              )})}
                          </table>

                      </div>

                    </div>

                    <div className='BoxRetornoCupomFiscal'>
                      <button onClick={handlePrint}>Imprimir</button>

                      <div className='BoxRetornoCupomFiscalPrint' ref={documentPrint}>
                      <div className='RetornoCupomFiscalBox'>
                        {APIDataEmpresa.map((data, i)=>{return(<>
                          <span>{data.razaoSocial}</span><br/>
                          <span>{data.cnpj}</span><br/> 
                          <span>{data.endereco.logradouro}, {data.endereco.numero} </span><br/>
                          <span>{data.endereco.cidade}-{data.endereco.estado}</span><br/>
                          <span>({data.contato.prefixo}) {data.contato.telefone}</span><br/>
                        </>)})}           
                      </div>          
                      <div className='RetornoCupomFiscalseparador'></div>
                      <div className='RetornoCupomFiscalBox'>
                          <br/>
                          <span>{responseData.nomeCliente} {responseData.sobrenomeCliente}</span><br/>
                          <span>{responseData.dataVenda}</span><br/>
                          <span>{responseData.codigo}</span> 
                      </div>           
                      <div className='RetornoCupomFiscalseparador'></div>
                      <div className='RetornoCupomFiscalBox'>
                          <span>{responseData.cliente}</span><br/> 
                      </div>           
                      <div className='RetornoCupomFiscalBox'>
                          <table>
                            <tr>
                              <td>Item</td>
                              <td>Código</td>
                              <td>descriçao</td>
                              <td>Qtda</td>
                              <td>Preço</td>
                              <td>Total</td>
                            </tr>
                            {responseData.itens.map((data,i)=>{return(<>
                              <tr>
                              <td>{data.nome}</td>
                              <td>{data.codigo}</td>
                              <td>{data.descricao}</td>
                              <td>{data.quantidade}</td>
                              <td>{data.valorUnitario}</td>
                              <td>{data.valorTotal}</td>
                            </tr>
                            </>)})}
                            
                          </table>
                      </div>
                        <div className='RetornoCupomFiscalBox'>
                          <br/>
                          <span>Valor Total: {responseData.valor}</span>
                        </div>
                        <div className='RetornoCupomFiscalBox'>
                          <br/>
                          <span>Procon PROCON MT Rua Baltazar Navarros, N 567, Bandeirantes, Cuiaba-MT, CEP: 78010-020, TEL: (65) 3613-2100 ου 151.</span>
                        </div>          
                      </div>
                    </div>          
                      </div>
                      

                </div>
            </div>
          </>
    );
}

    export default Pedido;