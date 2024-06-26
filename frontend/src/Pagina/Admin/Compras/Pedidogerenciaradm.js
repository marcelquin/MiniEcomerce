import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Compra.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Pedidogerenciaadm() {
    const baseUrl = "http://34.136.115.180:8080"
    //const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    APIData.filter(dados => dados.codigo.includes(dadoPesquisa)) :
    []
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
                    <div className="campoPesquisa">
                          <label>Nome:<br/>
                          <input type="text" onChange={e=> setdadoPesquisa(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                          </label>
                      </div>    
                      {dadoPesquisa.length >0 ? (<>
                        {pesquisa.map((data, i) => {
                                    return (
                                    <>
                        <div className="blocoinfo" key={i}>
                            <details>
                                <summary>{data.codigo}</summary>
                                <p>Dados Do Cliente:</p>
                                <span>Nome: {data.cliente.nome}</span><br/>
                                <span>CPF: {data.cliente.cpf}</span><br/>
                                <span>Telefone: ({data.cliente.contato.prefixo}) {data.cliente.contato.telefone}</span><br/>
                                <span>Tipo Compra: {data.tipocompra}</span><br/>
                                <p>Items</p>
                                <span>{data.produtos.map((item, i) => { return(<>{item.quantidade}x {item.produto.nome}<br/> </>)})}</span><br/>
                                <p>Dados de Pedido e Pagamento</p>
                                <span>Data do Pedido: {data.dataPedido}</span><br/>
                                <span>Forma de Pagamento: {data.pagamento.formaPagamento}</span><br/>
                                <span>Parcelamento: {data.pagamento.parcelas}</span><br/>
                                <span>Valor: {data.valorTotalFront}</span><br/>
                                <span>Data do pagamento: {data.pagamento.dataPagamento}</span><br/>      
                            </details>
                        </div> 
                                    </>
                                    )})}
                      </>): (<>
                        {APIData.map((data, i) => {
                                    return (
                                    <>
                        <div className="blocoinfo" key={i}>
                            <details>
                                <summary>{data.codigo}</summary>
                                <p>Dados Do Cliente:</p>
                                <span>Nome: {data.cliente.nome}</span><br/>
                                <span>CPF: {data.cliente.cpf}</span><br/>
                                <span>Telefone: ({data.cliente.contato.prefixo}) {data.cliente.contato.telefone}</span><br/>
                                <span>Tipo Compra: {data.tipocompra}</span><br/>
                                <p>Items</p>
                                <span>{data.produtos.map((item, i) => { return(<>{item.quantidade}x {item.produto.nome} <br/> </>)})}</span><br/>
                                <p>Dados de Pedido e Pagamento</p>
                                <span>Data do Pedido: {data.dataPedido}</span><br/>
                                <span>Forma de Pagamento: {data.pagamento.formaPagamento}</span><br/>
                                <span>Parcelamento: {data.pagamento.parcelas}</span><br/>
                                <span>Valor: {data.valorTotalFront}</span><br/>
                                <span>Data do pagamento: {data.pagamento.dataPagamento}</span><br/>      
                            </details>
                        </div> 
                                    </>
                                    )})}
                      </>)}
                                
                        
                    </div>
            </div>
    </>
    );
}

export default Pedidogerenciaadm;