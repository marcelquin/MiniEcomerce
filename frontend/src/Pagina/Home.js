import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Style/Conteudo.css';

function Home() {

    const [APIData, setAPIData] = useState([]);
    const [APIDataProduto, setAPIDataProduto] = useState([]);

    useEffect(() => {
        Axios
          .get("http://localhost:8080/pedido/ListarPedidosAbertos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      useEffect((APIData) => {
        Axios
          .get("http://localhost:8080/estoque/ListarEstoque")
          .then((response) => { setAPIDataProduto(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      const [nomecliente, setnomecliente] = useState('');


      async function NovoPedido(e){
        try{
          fetch('http://34.171.157.122:8080/pedido/NovoPedido', {
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
          fetch('http://34.171.157.122:8080/pedido/AdicionarProdutoPedido', {
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

      

    return (
        <>
        <div className="blocoConteudo">

                <div className="pedidoBox">

                    <div className="pedidoFrame">
                    <h3>Novo Pedido</h3>
                    <table>
                        <tr>
                            <td><label>Cliente</label></td>
                            <td><input type="text" name="nomeCliente" value={nomecliente} onChange={(e)=> setnomecliente(e.target.value)}/></td>   
                            <td><input type="submit" value="Salvar" className="btn" onClick={NovoPedido}/></td>
                        </tr>
                    </table>

                    <h3>Adicionar Produto</h3>
                    <table>
                        <tr>
                            <td><label>Código Pedido</label></td>
                            <td><input type="text" name="codigoPedido" value={codigoPedido} onChange={(e)=> setcodigoPedido(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><label>Código Produto</label></td>
                            <td><input type="text" name="codigoProduto" value={codigoProduto} onChange={(e)=> setcodigoProduto(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><label>Quantidade</label></td>
                            <td><input type="number" name="quantidade" value={quantidade} onChange={(e)=> setquantidade(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Adicionar" className="btn" onClick={AdicionarProduto} /></td>
                        </tr>
                    </table>
                    </div>


                    <div className="homeBloco">

                        <div className="homeRetorno">
                            <table>
                              <tr>
                                <td>Produto</td>
                                <td>Código</td>
                                <td>Valor</td>
                                <td>Estoque</td>
                              </tr>
                              {APIDataProduto.map((data, i) =>{
                        return(
                            <>
                            <tr key={i}>
                                <td>{data.nome}</td>
                                <td>{data.codigo}</td>
                                <td>{data.valorFront}</td>
                                <td>{data.quantidade} unidades</td>
                            </tr>
                            </>
                        )
                    })} 
                            </table>
                        </div>

                    </div>
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
                            <tr>
                              <td>{data.nomeCLiente}</td>
                              <td>{data.codigo}</td>
                              <td>{data.valorTotalFront}</td>
                            </tr>
                            </>
                            )
                          }
                        )}
                  </table>
                </div>
        </div>   
        </>
    );
}

    export default Home;