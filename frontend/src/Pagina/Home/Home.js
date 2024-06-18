import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Axios from 'axios';
import './Home.css';

function Home() {

    const baseUrl = "http://34.171.157.122:8080"
    //(`${baseUrl}/register`

    const [APIData, setAPIData] = useState([]);
    const [APIDataProduto, setAPIDataProduto] = useState([]);

    useEffect(() => {
        Axios
          .get(`${baseUrl}/pedido/ListarPedidosAbertos`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      const {codigo} = useParams();

      useEffect((APIData) => {
        Axios
          .get(`${baseUrl}/estoque/ListarEstoque`)
          .then((response) => { setAPIDataProduto(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, [APIData]);

      const [nomecliente, setnomecliente] = useState('');


      async function NovoPedido(e){
        try{
          fetch(`${baseUrl}/pedido/NovoPedido`, {
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

      const [putCompra, setputCompra] = useState({
        codigoPedido: "",
        codigoProduto: "",
        quantidade: ""
  });

      const handleChanage = (e) => {
        setputCompra(prev=>({...prev,[e.target.name]:e.target.value}));
      } 

      async function AdicionarProduto(e){
        
        try{
          console.log(putCompra)
        }catch (err){
          console.log("erro")
        }
      }

      

    return (
        <>
          <div className='homeCad'>  
              <h3>Novo Pedido</h3>
                  <table>
                    <tr>
                      <td><label>Cliente</label></td>
                      <td><input type="text" name="nomeCliente" value={nomecliente} onChange={(e)=> setnomecliente(e.target.value)}/></td>   
                      <td><input type="submit" value="Salvar" className="btn" onClick={NovoPedido}/></td>
                    </tr>
                  </table> 
          </div>
          <div className='homeCad'>
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
                              <td><input className='inputretorno' type="hidden" name="codigoPedido" value={data.codigo} onChange={handleChanage} /></td>
                              <td><input className='inputretorno' type="text" name="codigoProduto"  placeholder="Código"  onChange={handleChanage}/></td>
                              <td><input className="inputretorno"  type="number" name="quantidade"  placeholder="quantidade"  onChange={handleChanage} /> </td>
                              <td><input type="submit" value="Adicionar" className="btn" onClick={AdicionarProduto} /></td>
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