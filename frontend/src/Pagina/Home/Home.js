import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Axios from 'axios';
import './Home.css';
import { Navigate } from 'react-router-dom';

function Home() {
  const baseUrl = "http://34.136.115.180:8080"
  //const baseUrl = "http://localhost:8080"

    const [APIData, setAPIData] = useState([]);
    const [APICliente, setAPICliente] = useState([]);
    const [APIDataProduto, setAPIDataProduto] = useState([]);
    const [Search, setSearch] = useState('') 
    const [nomecliente, setnomecliente] = useState('');
    //const pedidos = Search.length > 0 ?
    //APICliente.filter(dado => setSearch(dado.nome)): [];


  async function AtualizarPedidos(){
    Axios
    .get(`${baseUrl}/pedido/ListarPedidosAbertos`)
    .then((response) => { setAPIData(response.data)})
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  async function BuscarClientes(){
   await Axios
    .get(`${baseUrl}/cliente/ListarClientes`)
    .then((response) => { setAPICliente(response.data)})
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  async function BuscarEstoque(){
   await Axios
    .get(`${baseUrl}/estoque/ListarEstoque`)
    .then((response) => { setAPIDataProduto(response.data)})
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }
      async function NovoPedido(e){
        try{
         await fetch(`${baseUrl}/pedido/NovoPedido`, {
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
      const [idput, setidput] = useState('');
      const[codigoProduto, setcodigoProduto] = useState('');
      const[quantidade, setquantidade] = useState('');

      const [corpo, setcorpo] = useState([])

      const BuscaPorId = async id =>{
        
          await Axios.get(`${baseUrl}/pedido/BuscarPedidoPorId:${id}`)
          .then((response)=>{setcorpo(response.data)})
          console.log(corpo.data)
      }  


      const AdicionarProduto = async () =>{
        console.log("id: "+idput)
        console.log("codigo: "+codigoProduto)
        console.log("quantidade: "+quantidade)      
        try{
          await fetch(`${baseUrl}/pedido/AdicionarProdutoPedido`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'id': idput,
                'codigoProduto': codigoProduto,
                'quantidade': quantidade
        })})
        .then(setcodigoProduto(''))
        .then( setquantidade(''))       
        .then(setidput(''))
        }catch (err){
          console.log("erro")
        }
         
      }
      
      useEffect(() => {
        BuscarClientes()
        BuscarEstoque()
        AtualizarPedidos()
      }, []);
      
    return (
        <>
          <div className="blocoHomeCad">

          <div className='homeCadput'>  
              <h3>Novo Pedido</h3>
                  <table>
                    <tr>
                      <td><input className='inputretorno' type='text' 
                      name='nomeCLiente' 
                      value={nomecliente} 
                      onChange={(e)=> {setnomecliente(e.target.value)}}
                      placeholder='nome do cliente' /></td>
                    </tr>
                    <tr>
                        <td><input type='submit' value="Salvar" onClick={NovoPedido} className='btn' /> </td>
                    </tr>
                    
                  </table> 
          </div>
          <div className='homeCadput'>  
              <h3>Adicionar Item </h3>
                  <table>
                    <tr>
                      <td><input className='inputretorno' type='text' 
                      name='quantidade' 
                      value={quantidade} 
                      onChange={(e)=> {setquantidade(e.target.value)}}
                      placeholder='Quantidade' /></td>
                    </tr>
                    <tr>
                        <td><input type='submit' value="Adicionar"className='btn' onClick={AdicionarProduto} /> </td>
                    </tr>
                    
                  </table> 
          </div>


          </div>
          

          <div className='homeCad'>
          <table>
                    <tr>
                      <td>Selecionar</td>
                      <td>Cliente</td>
                      <td>Código</td>
                      <td>Valor</td>
                    </tr>
                    {APIData.map((data, i) => {
                            return (
                            <>
                            <tr>
                              <td><input type="checkbox" value={data.id} onClick={(e) => {setidput(data.id)}}/></td>
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
          <div className='homeCad'>
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
                                <td><input type="checkbox" value={data.id} onClick={(e) => {setcodigoProduto(data.codigo)}}/></td>
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
          
                    
        </>
    );
}

    export default Home;