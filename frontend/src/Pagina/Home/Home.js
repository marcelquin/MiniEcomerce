import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Home.css';
import '../../Style/Global.css'
import { Link } from 'react-router-dom';
import Nav from '../../Componentes/Nav/Nav';


function Home() {
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
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
      nomeCliente: '',
      sobrenomeCliente: '',
      telefone: '',
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
      Axios
    .get(`${baseUrl}/produto/verificaEstoque`)
    .then((response) => { setAPIDataProduto(response.data)})
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }, []);

      useEffect(() => {
          AtualizarPedidos()
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
                    <div className='RetornoCupomFiscalseparador'></div>
                      <div className='RetornoCupomFiscalBox'>
                          <span>Data da Venda: {responseData.dataVenda}</span><br/>
                          <span>Código: {responseData.codigo}</span> 
                      </div>           
                      <div className='RetornoCupomFiscalseparador'></div>
                      <div className='RetornoCupomFiscalBox'>
                          <span>Cliente: {responseData.nomeCliente} {responseData.sobrenomeCliente}</span><br/> 
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
                      <div className='RetornoCupomFiscalseparador'></div>
                      <div className='RetornoCupomFiscalBox'>
                          <span>VALOR TOTAL: {responseData.valor}</span><br/>
                      </div>
                    </div>
                </div>  
              </div>
             
        </div>
                

          
                    
        </>
    );
}

    export default Home;