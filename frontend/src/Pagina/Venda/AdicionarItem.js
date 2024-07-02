import { Link, useParams, useNavigate } from 'react-router-dom'
import './Venda.css'
import { useEffect, useState } from 'react';
import Axios from 'axios';

function AdicionarItem() {
    const baseUrl = "http://34.133.121.3:8080"
    //const baseUrl = "http://localhost:8080"
  
    const navegate = useNavigate()
    const {id} = useParams()
    const [APIDataProduto, setAPIDataProduto] = useState([]);
    const [idProduto, setidProduto] = useState('')
    const [quantidade, setquantidade] = useState('')
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    APIDataProduto.filter(dados => dados.nome.includes(dadoPesquisa)) :
    []

    const BuscarEstoque = async () => {
        await Axios
         .get(`${baseUrl}/estoque/ListarEstoque`)
         .then((response) => { setAPIDataProduto(response.data)})
         .catch((err) => {
           console.error("ops! ocorreu um erro" + err);
         });
       }
    
    const AdicionarProduto = async () =>{ 
        try{
          await fetch(`${baseUrl}/pedido/AdicionarProdutoPedido`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'id': id,
                'idProduto': idProduto,
                'quantidade': quantidade
        })})
        .then(navegate("/"))  
        }catch (err){
          console.log("erro")
        }
         
      }   
       
      useEffect(() => {
        BuscarEstoque()
    }, []);

    return(<>
        <div className='navHome'>
              <h3 className='navBtn'><Link to={"/novavenda"}>Novo Pedido</Link></h3>
        </div>
        <div className="campoPesquisa">
            <label>Nome:<br/>
            <input type="text" onChange={e => setdadoPesquisa(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
            </label>
        </div>
        <div className='campoPesquisa'>
            <form onSubmit={AdicionarProduto}>
                <label>Quantidade: <br/>
                <input type='number' name='quantidade' onChange={(e)=>{setquantidade(e.target.value)}} /></label>
                <input type='submit' value="Adicionar"/>
            </form>
        </div>
        <div className='boxtabela'>

            {dadoPesquisa.length > 0 ?(<>
                {pesquisa.map((data, i) =>{
                        return(
                            <>
                            <div className='Blocoestoque' key={i}>
                                    <input type="checkbox" name='idProduto' value={data.id} onClick  = {(e) => {setidProduto(data.id)}}/> Selecionar                                         
                                    <div className='imagem'></div>
                                    <div className='info'>
                                        <div className='infoproduto'>
                                            <span>{data.nome}</span><br/>
                                        </div>   
                                    </div>
                                    <span>{data.valorFront}</span><br/>
                                    <span>Código: {data.codigo}</span><br/>
                                    <span> {data.quantidade} unidades</span>
                            </div>
                            </>
                        )
                    })}        
            </>) :(<>
                {APIDataProduto.map((data, i) =>{
                        return(
                            <>
                            <div className='Blocoestoque' key={i}>
                            <input type="checkbox" name='idProduto' value={data.id} onClick  = {(e) => {setidProduto(data.id)}}/> Selecionar                                         
                            <div className='imagem'></div>
                                    <div className='info'>
                                        <div className='infoproduto'>
                                            <span>{data.nome}</span><br/>
                                        </div>   
                                    </div>
                                    <span>{data.valorFront}</span><br/>
                                    <span>Código: {data.codigo}</span><br/>
                                    <span> {data.quantidade} unidades</span>
                            </div>
                            </>
                        )
                    })}         
            </>)}

        </div>
    </>)}

export default AdicionarItem