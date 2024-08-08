import { useNavigate } from 'react-router-dom'
import './Venda.css'
import { useEffect, useState } from 'react';
import Axios from 'axios';


function NovaVenda() {
    //const baseUrl = "http://34.133.121.3:8080"
    const baseUrl = "http://localhost:8080"
    const navegate = useNavigate()
    const [filtroCadastro, setfiltroCadastro] = useState('');
    const [APIDataCpf, setAPIDataCpf] = useState([]);
    const [APIDataCnpj, setAPIDataCnpj] = useState([]);
    const[dadoPesquisaCpf, setdadoPesquisaCpf] = useState('')
    const[dadoPesquisaCnpj, setdadoPesquisaCnpj] = useState('')
    const[idCLiente, setidcliente] = useState('')
    const [nomeCLiente, setnomeCLiente] = useState('')
    const pesquisaCpf = dadoPesquisaCpf.length > 0 ?
    APIDataCpf.filter(dados => dados.nome.includes(dadoPesquisaCpf)) :
    []
    const pesquisaCnpj = dadoPesquisaCnpj.length > 0 ?
    APIDataCnpj.filter(dados => dados.razaoSocial.includes(dadoPesquisaCnpj)) :
    []
    


    async function buscaCLientes(){
        await Axios
        .get(`${baseUrl}/cliente/ListarClientes`)
        .then((response) => { setAPIDataCpf(response.data)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
       }
       
       async function buscaCLientesEmpresa(){
        await Axios
        .get(`${baseUrl}/clienteempresa/ListarClienteEmpresa`)
        .then((response) => { setAPIDataCnpj(response.data)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
       }    

    useEffect(()  => {
          buscaCLientes()
          buscaCLientesEmpresa() 
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
                'clienteNome':nomeCLiente
        })})
        .then(navegate("/"))  
        setidcliente('');
        setdadoPesquisaCpf('')
        setdadoPesquisaCnpj('')
        setnomeCLiente('')   
        }catch (err){
          console.log("erro")
        }
      }
      
    return(
        <>
          <div className="clienteSeletorCadastro">
            <input type="radio" name="filtroCadastro" value="CPF" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa fisica
            <input type="radio" name="filtroCadastro" value="CNPJ" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa Juridica
          </div>
          {filtroCadastro.length === 3 ?(<>
            <div className="campoPesquisa">
            <label>Nome:<br/>
            <input type="text" onChange={e=> {setdadoPesquisaCpf(e.target.value); setnomeCLiente(e.target.value) }} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
            </label>
            <input type='submit' value="Iniciar Compra" onClick={NovoPedido}/>
        </div>
        <div className='boxtabela'>

                    {dadoPesquisaCpf.length > 0 ?(<>
                      {pesquisaCpf.map((data, i) => {
                        return (
                          <>
                          <div className='Blocoestoque' key={i}>        
                          <span><input type="checkbox" value={data.id} onClick={(e) => {setidcliente(data.id)}}/>
                          {data.nome} {data.sobrenome}</span>
                          </div>
                        </>
                        )})}
                  </>) :(<>
                    {APIDataCpf.map((data, i) => {
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
          </>):(<>
            <div className="campoPesquisa">
            <label>Nome:<br/>
            <input type="text" onChange={e=> {setdadoPesquisaCnpj(e.target.value); setnomeCLiente(e.target.value)}} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
            </label>
            <input type='submit' value="Iniciar Compra" onClick={NovoPedido}/>
        </div>
        <div className='boxtabela'>

                    {dadoPesquisaCnpj.length > 0 ?(<>
                      {pesquisaCnpj.map((data, i) => {
                        return (
                          <>
                          <div className='Blocoestoque' key={i}>        
                          <span><input type="checkbox" value={data.id} onClick={(e) => {setidcliente(data.id)}}/>
                          {data.nome} {data.sobrenome}</span>
                          </div>
                        </>
                        )})}
                  </>) :(<>
                    {APIDataCnpj.map((data, i) => {
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
        
    </>)}

export default NovaVenda