import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Style/Conteudo.css';

function Home() {

    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        Axios
          .get("http://localhost:8080/pedido/ListarPedidosAbertos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      const [nomecliente, setnomecliente] = useState('');


      async function NovoPedido(e){
        try{
          fetch('http://34.69.39.159:8080/pedido/NovoPedido', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'nomeCliente': nomecliente,
        })})
        setnomecliente('');
        }catch (err){
          console.log("erro")
        }
      }

      const[codigoPedido, setcodigoPedido] = useState('');
      const[codigoProduto, setcodigoProduto] = useState('');
      const[quantidade, setquantidade] = useState('');

      async function AdicionarProduto(e){
        try{
          fetch('http://34.69.39.159:8080/pedido/AdicionarProdutoPedido', {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'codigoPedido': codigoPedido,
                'codigoProduto':codigoProduto,
                'quantidade': quantidade
        })})
        setcodigoPedido('');
        setcodigoProduto('');
        setquantidade('');
        }catch (err){
          console.log("erro")
        }
      }
      
      useEffect(() => {
        Axios
          .get("http://34.69.39.159:8080/pedido/ListarPedidosAbertos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, [APIData]);

      async function FinalizarPedido(e){
        try{
          fetch('http://34.69.39.159:8080/pedido/FinalizarPedido', {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'codigoPedido': codigoPedido
        })})
          setcodigoPedido('');
        }catch (err){
          console.log("erro")
        }
      }

    return (
        <>
        <div className="blocoConteudo">

                <div className="boxForm">
                    <h3>Novo Pedido</h3>
                    <table>
                        <tr>
                            <td><label>Cliente</label></td>
                            <td><input type="text" name="nomeCliente" value={nomecliente} onChange={(e)=> setnomecliente(e.target.value)}/></td>
                        </tr>
                        <tr>    
                            <td><input type="submit" value="Salvar" className="btn" onClick={NovoPedido}/></td>
                        </tr>
                    </table>
                </div>

                <div className="boxForm">
                    <h3>Adicionar Produto</h3>
                    <table>
                        <tr>
                            <td><label>Código Pedido</label></td>
                            <td><input type="text" name="codigoPedido" value={codigoPedido} onChange={(e)=> setcodigoPedido(e.target.value)}/></td>

                            <td><label>Código Produto</label></td>
                            <td><input type="text" name="codigoProduto" value={codigoProduto} onChange={(e)=> setcodigoProduto(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><label>Quantidade</label></td>
                            <td><input type="number" name="quantidade" value={quantidade} onChange={(e)=> setquantidade(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Adicionar" className="btn" onClick={AdicionarProduto} /></td>
                            <td><input type="submit" value="Finalizar" className="btn" onClick={FinalizarPedido} /></td>
                        </tr>
                    </table>
                </div>

                <div className="boxtabela">
                <table>
                         <tr>
                            <td>Cliente</td>
                            <td>Código</td>
                            <td>Valor</td>
                        </tr>            
                    
                {APIData.map((data, i) => {
                        return (
                        <>
                        <tr key={i}>
                          <td>{data.cliente.nome}</td>
                          <td>{data.codigo}</td>
                          <td>{data.valorTotalFront}</td>
                        </tr>
                        </>
                        )})}
                </table>
                </div>


        </div>   
        </>
    );
}

    export default Home;