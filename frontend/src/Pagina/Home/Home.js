import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Home.css';
import '../../Style/Global.css'
import { Link } from 'react-router-dom';
import Nav from '../../Componentes/Nav/Nav';


function Home() {
    const baseUrl = "http://34.67.211.119:8080"
    //const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const [APICliente, setAPICliente] = useState([]);
    const [APIDataProduto, setAPIDataProduto] = useState([]);
    const [idcliente, setidcliente] = useState('');
    const [idVenda, setidVenda] = useState('');
    const [idput, setidput] = useState('');
    const[quantidade, setquantidade] = useState('');
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const[dadoPesquisaProduto, setdadoPesquisaProduto]=useState('');
    const [responseData, setresponseData] = useState({
      codigo: '',
      cliente: '',
      documento: '',
      dataVenda: '',
      itens: [],
      valor: ''
    })
    //pesquisa automática
    
    const pesquisa = dadoPesquisa.length > 0 ?
    APICliente.filter(dados => dados.nome.includes(dadoPesquisa)) :
    []
    
    const pesquisaproduto = dadoPesquisaProduto.length > 0 ?
    APIDataProduto.filter(dados => dados.nome.includes(dadoPesquisaProduto)) :
    []


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

  async function VerificaEstoque(){
   await Axios
    .get(`${baseUrl}/produto/verificaEstoque`)
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
      
      useEffect(()=>{
        fetch(`${baseUrl}/pedido/BuscarPedidoPorIdCaixa?id=${idVenda}`, 
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
    }, [idVenda])

      useEffect(() => {
          AtualizarPedidos()
          VerificaEstoque()
      }, []);
      
    return (
        <>

        <div className='ndBackground'>
            
            <div className='ndBoxSection'>
                <div className='ndBoxNav'><Nav></Nav></div>
                <div className='ndBoxSectionInFlex'>
                    <div className='homeRetornoTabela'>
                      <table>
                        <tr>
                          <td>Cliente</td>
                          <td>Código Venda</td>
                          <td>Valor</td>
                        </tr>
                        {APIData.map((data, i) => {return(<>
                        <tr key={i}>
                            <td>{data.nomeCLiente != null ? (<>
                              {data.nomeCLiente} <br/>
                            </>) : (<>
                              {data.cliente.nome} {data.cliente.sobrenome}</>)}</td>
                            <td>{data.codigo} </td>
                            <td>{data.valorTotalFront}</td>
                            <td><button onClick={(e)=>{setidVenda(data.id)}}> Mais Informação</button></td>
                            <td><Link to={`/adicionaritem/${data.id}`}>
                            <button>Adicionar Item</button>
                            </Link></td>
                        </tr>
                        </>)})}
                      </table>  
                    </div>
                    <div className='homeRetornoDetalhes'>

                        <h4>NOME: {responseData.cliente}</h4>
                        <p>Código: {responseData.codigo}</p>
                        <p>Data do Pedido {responseData.dataVenda}:</p>
                        <p>Itens: {responseData.itens}</p>
                        <p>Valor Atual: {responseData.valor}</p>
                    </div>
                </div>  
              </div>
             
        </div>
                

          
                    
        </>
    );
}

    export default Home;