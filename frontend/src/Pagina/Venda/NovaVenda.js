import { Link, useNavigate } from 'react-router-dom'
import './Venda.css'
import { useEffect, useState } from 'react';
import Axios from 'axios';


function NovaVenda() {
    const baseUrl = "http://34.133.121.3:8080"
    //const baseUrl = "http://localhost:8080"
    const navegate = useNavigate()
    const [APIData, setAPIData] = useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const[idCLiente, setidcliente] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
    []

    async function buscaCLientes(){
        await Axios
        .get(`${baseUrl}/cliente/ListarClientes`)
        .then((response) => { setAPIData(response.data)})
        .then(console.log(APIData))
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
       } 

    useEffect(()  => {
          buscaCLientes() 
    }, []);

    async function NovoPedido(id){
        try{
         await fetch(`${baseUrl}/pedido/NovoPedido`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'idCliente': idCLiente,
        })})
        .then(navegate("/"))  
        setidcliente('');
        setdadoPesquisa('')   
        }catch (err){
          console.log("erro")
        }
      }

    return(<>
        <div className='navHome'>
              <h3 className='navBtn'><Link to={"/novavenda"}>Novo Pedido</Link></h3>
        </div>
                
        <div className="campoPesquisa">
            <label>Nome:<br/>
            <input type="text" onChange={e=> setdadoPesquisa(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
            </label>
            <input type='submit' value="Iniciar Compra" onClick={NovoPedido}/>
        </div>
        <div className='boxtabela'>

                    {dadoPesquisa.length > 0 ?(<>
                      {pesquisa.map((data, i) => {
                        return (
                          <>
                          <div className='Blocoestoque' key={i}>        
                          <span><input type="checkbox" value={data.id} onClick={(e) => {setidcliente(data.id)}}/>
                          {data.nome} {data.sobrenome}</span>
                          </div>
                        </>
                        )})}
                  </>) :(<>
                    {APIData.map((data, i) => {
                        return (
                          <>
                          <div className='Blocoestoque' key={i}>        
                          <span><input type="checkbox" value={data.id} onClick={(e) => {setidcliente(data.id)}}/>
                          {data.nome} {data.sobrenome}</span>
                          </div>
                        </>
                        )})}  
                  </>)}   

        </div>
    </>)}

export default NovaVenda