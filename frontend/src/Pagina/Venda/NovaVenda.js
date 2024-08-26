import { useNavigate } from 'react-router-dom'
import './Venda.css'
import '../../Style/Global.css'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Nav from '../../Componentes/Nav/Nav';


function NovaVenda() {
  //const baseUrl = "http://34.67.211.119:8080"
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
          <div className='ndBackground'>
            
            <div className='ndBoxSection'>
                <div className='ndBoxNav'><Nav></Nav></div>
                <div className='ndBoxSectionIn'>
                  <div className='ndSectionInCampoFiltroCadastro'>
                    <input type="radio" name="filtroCadastro" value="CPF" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa fisica
                    <input type="radio" name="filtroCadastro" value="CNPJ" onClick={e=>setfiltroCadastro(e.target.value)}/>Pessoa Juridica
                  </div>
          {filtroCadastro.length === 3 ?(<>
            
            <div className='ndSectionInCampoPesquisa'>
              <label>Nome:
              <input type="text" onChange={e=> {setdadoPesquisaCpf(e.target.value); setnomeCLiente(e.target.value) }} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
              </label>
              <input type='submit' value="Iniciar Compra" onClick={NovoPedido}/>
            </div>
            <div className='ndSectionInRetornoInfo'>
                <table>
                  <tr className='trDestaque'>
                    <td>Selecionar</td>
                    <td>Nome</td>
                    <td>Telefone</td>
                  </tr>
                  {dadoPesquisaCpf.length > 0 ?(<>
                  
                    {pesquisaCpf.map((data, i) => { return(<>
                      <tr key={i}>
                        <td><input type="checkbox" value={data.id} onClick={(e) => {setidcliente(data.id)}}/></td>
                        <td>{data.nome} {data.sobrenome}</td>
                        <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                      </tr>                      
                    </>)})}
                              
                  </>):(<>
                    
                    {APIDataCpf.map((data, i) => { return(<>
                    
                      <tr key={i}>
                        <td><input type="checkbox" value={data.id} onClick={(e) => {setidcliente(data.id)}}/></td>
                        <td>{data.nome} {data.sobrenome}</td>
                        <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                      </tr>
                    </>)})}

                  </>)}
                </table>

            </div>
          
          </>):(<>

            <div className='ndSectionInCampoPesquisa'>
              <label>Razao Social:
              <input type="text" onChange={e=> {setdadoPesquisaCnpj(e.target.value); setnomeCLiente(e.target.value)}} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
              </label>
              <input type='submit' value="Iniciar Compra" onClick={NovoPedido}/>
            </div>
            <div className='ndSectionInRetornoInfo'>

              <table>
                <tr className='trDestaque'>
                  <td>Selecionar</td>
                  <td>Razao Social</td>
                  <td>Telefone</td>
                </tr>
                {dadoPesquisaCnpj.length > 0 ?(<>
                  
                  {pesquisaCnpj.map((data, i) =>{return(<>
                    
                    <tr key={i}>
                      <td><input type="checkbox" value={data.id} onClick={(e) => {setidcliente(data.id)}}/></td>
                      <td>{data.razaoSocial}</td>
                      <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                    </tr>

                  </>)})}
                </>):(<>
                
                  {APIDataCnpj.map((data, i) =>{return(<>
                  
                    <tr key={i}>
                      <td><input type="checkbox" value={data.id} onClick={(e) => {setidcliente(data.id)}}/></td>
                      <td>{data.razaoSocial}</td>
                      <td>({data.contato.prefixo}) {data.contato.telefone}</td>
                    </tr>

                  </>)})}
                </>)}
              </table>  

            </div>
          
          </>)}
                </div>    
            </div>
        </div>                        
      </>)          
}
export default NovaVenda