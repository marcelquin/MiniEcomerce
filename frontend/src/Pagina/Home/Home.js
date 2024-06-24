import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Home.css';
import { useNavigate } from "react-router-dom";

function Home() {
  //const baseUrl = "http://34.136.115.180:8080"
  const baseUrl = "http://localhost:8080"

    const [APIData, setAPIData] = useState([]);
    const [APICliente, setAPICliente] = useState([]);
    const [APIDataProduto, setAPIDataProduto] = useState([]);
    const [idcliente, setidcliente] = useState('');
    const [idproduto, setidproduto] = useState('');
    const [idput, setidput] = useState('');
    const[quantidade, setquantidade] = useState('');
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const[dadoPesquisaProduto, setdadoPesquisaProduto]=useState('')
    //pesquisa automática
    
    const pesquisa = dadoPesquisa.length > 0 ?
    APICliente.filter(dados => dados.nome.includes(dadoPesquisa)) :
    []
    
    const pesquisaproduto = dadoPesquisaProduto.length > 0 ?
    APIDataProduto.filter(dados => dados.nome.includes(dadoPesquisaProduto)) :
    []

    const navigate = useNavigate();

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
                'idCliente': idcliente,
        })})
        .then(window.location.reload())
        setidcliente('');
        setdadoPesquisa('')   
        }catch (err){
          console.log("erro")
        }
      }
      
      
      const AdicionarProduto = async () =>{    
        try{
          await fetch(`${baseUrl}/pedido/AdicionarProdutoPedido`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'id': idput,
                'idProduto': idproduto,
                'quantidade': quantidade
        })})
        .then(window.location.reload())
        setquantidade('')       
        setidput('')
        setidproduto('')
        setdadoPesquisaProduto('')
        setdadoPesquisaProduto('')
        
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
                      <td><input 
                        className='inputretorno' 
                        name="dadoPesquisa" onChange={e=> setdadoPesquisa(e.target.value)} 
                        type='text' 
                        placeholder='digite o nome do cliente' />
                        <input type='submit' value="Salvar" onClick={NovoPedido} className='btn' /> </td>

                    </tr>
                    <tr>
                        <div className="resultadoPesquisa">
                        {dadoPesquisa.length >0?(<>
                        {pesquisa.map((data, i) => {
                        return(<>
                        <span key={i}><input type="checkbox" value={data.id} onClick={(e) => {setidcliente(data.id)}}/>
                        {data.nome} {data.sobrenome}</span>
                    </>
                  )})}
                  </>) : (<></>)}
                    </div> 
                    </tr>
                 
                    
                  </table>
                  
          </div>
          <div className='homeCadput'>  
              <h3>Adicionar Item </h3>
                  <table>
                    <tr>
                      <td>
                      <input className='inputretorno' type='text' 
                      name='quantidade' 
                      value={quantidade} 
                      onChange={(e)=> {setquantidade(e.target.value)}}
                      placeholder='Quantidade' />
                      </td>
                      <td>
                      <input 
                        className='inputretorno' 
                        name="dadoPesquisaProduto" onChange={e=> setdadoPesquisaProduto(e.target.value)} 
                        type='text' 
                        placeholder='digite o nome do Produto' />
                      </td>
                     </tr>
                    <tr>
                      <td><input type='submit' value="Adicionar"className='btn' onClick={AdicionarProduto} /></td>
                    </tr>
                    <tr>
                    <div className="resultadoPesquisa">
                        {dadoPesquisaProduto.length >0?(<>
                        {pesquisaproduto.map((data, i) => {
                        return(<>
                        <span key={i}><input type="checkbox" value={data.id} onClick={(e) => {setidproduto(data.id)}}/>
                        {data.nome} {data.valorTotalFront}</span>
                    </>
                  )})}
                  </>) : (<></>)}
                    </div> 
                    </tr>
                    
                  </table> 
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
          </div> 
                    
        </>
    );
}

    export default Home;