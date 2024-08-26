import { Link, useParams, useNavigate } from 'react-router-dom'
import './Venda.css'
import '../../Style/Global.css'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Nav from '../../Componentes/Nav/Nav';

function AdicionarItem() {
    const baseUrl = "http://34.67.211.119:8080"
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

        <div className='ndBackground'>
            
            <div className='ndBoxSection'>
                <div className='ndBoxNav'><Nav></Nav></div>
                <div className='ndBoxSectionInFlex'>
                    <div className='addItemBlocoForm'>
                        <div className='addItemBlocoCampoPesquisa'>
                            <label>Nome:<br/>
                            <input type="text" onChange={e => setdadoPesquisa(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                            </label>
                        </div>
                        <div className='addItemBlocoformPagina'>
                            <form onSubmit={AdicionarProduto}>
                                <label>Quantidade: <br/>
                                <input type='number' name='quantidade' onChange={(e)=>{setquantidade(e.target.value)}} /></label>
                                <input type='submit' value="Adicionar"/>
                            </form>
                        </div>
                    </div>
                    <div className='addItemBlocoRetornoEstoque'>
                        <table>
                            <tr>
                                <td>Selecionar</td>
                                <td>Nome</td>
                                <td>Valor</td>
                                <td>Quantidade</td>
                            </tr>
                            
                            {dadoPesquisa.length > 0 ?(<>
                                
                                {pesquisa.map((data, i) =>{return(<>
                                <tr key={i}>
                                    <td><input type="checkbox" name='idProduto' value={data.id} onClick  = {(e) => {setidProduto(data.id)}}/> </td>
                                    <td>{data.nome}</td>
                                    <td>{data.valorFront}</td>
                                    <td>{data.quantidade}</td>
                                </tr>
                                    
                                </>)})}

                            </>):(<>
                            
                                {APIDataProduto.map((data, i) =>{return(<>
                                
                                <tr key={i}>
                                    <td><input type="checkbox" name='idProduto' value={data.id} onClick  = {(e) => {setidProduto(data.id)}}/> </td>
                                    <td>{data.nome}</td>
                                    <td>{data.valorFront}</td>
                                    <td>{data.quantidade} unidades</td>
                                </tr>
                                </>)})}

                            </>)}
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
      
    </>)}

export default AdicionarItem