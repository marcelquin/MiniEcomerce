import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';
function Home() {
  //const baseUrl = "http://34.133.121.3:8080"
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
          AtualizarPedidos()
      }, []);
      
    return (
        <>
          <div className='boxRetorno'>
              {APIData.map((data, i) => {
                return(<>

                  <div className='itemRetorno'>
                    <h4>
                      <div className='detalheVenda'>
                        {data.nomeCLiente != null ? (<>
                          {data.nomeCLiente} {data.codigo} <br/>
                        </>) : (<>
                          {data.cliente.nome} {data.cliente.sobrenome} {data.codigo}<br/>
                        </>)}            
                      </div>
                      <div className='Adicionar'> 
                      <a>
                        <Link to={`/adicionaritem/${data.id}`}> <div className='icone'><span>Item</span></div></Link>
                      </a>
                      </div>
                    </h4>
                    
                    <span className='titulo'>Data Abertura: {data.dataPedido}</span><br/>
                    <span className='titulo'>Valor: {data.valorTotalFront}</span><br/>
                    <span className='titulo'>itens:</span><br/>
                    <span className='titulo'>{data.produtos.map((item, i) => { return(<>{item.quantidade}x {item.produto.nome} <br/> </>)})}</span>
                  </div>
                
                </>)
              })}
              
          </div>
                    
        </>
    );
}

    export default Home;