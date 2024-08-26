import { useEffect, useState } from 'react';
import './Logistica.css';
import '../../Style/Global.css'
import Nav from '../../Componentes/Nav/Nav'
import Axios from 'axios';


function Logistica() {
  //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const [status, setstatus] = useState('')
    const [id, setid] = useState('')
    const [entregaData, setentregaData] = useState({
      'nomeCliente': '',
      'enderecoEntrega': '',
      'telefoneContato': '',
      'produtos': [],
      'statusentrega': ''
    })
    const [APIData, setAPIData] = useState([]);
    const [motivo, setMotivo] = useState('')
    
    const atualiarEntregas = async()=>{
        await Axios.get(`${baseUrl}/entrega/ListarEntregasEmAberto`)
          .then((response) => { setAPIData(response.data)})
          .then(console.log(APIData))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }
    
    useEffect(()=>{
      fetch(`${baseUrl}/entrega/BuscarEntregaPorId?id=${id}`, 
          {
              method:'GET',
              headers:{
                  'content-type': 'application/json',
              },
          })
          .then((resp)=> resp.json())
          .then((data)=> {
              setentregaData(data)
          })
          .catch(err => console.log(err))
  }, [id])
    
    
    const IniciarEntrega = async()=>{
        try{
            await fetch(`${baseUrl}/entrega/IniciarEntrega`, {
              method: 'PUT',
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              },    
              body: new URLSearchParams({
                  'id': id
          })})
          .then(setid('') )
          .then(window.location.reload())       
          }catch (err){
            console.log("erro")
          }
    }
    
    const FinalizarEntrega = async() =>{
        try{
            await fetch(`${baseUrl}/entrega/FinalizarEntrega`, {
              method: 'PUT',
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              },    
              body: new URLSearchParams({
                  'id': id
          })})
          .then(setid('') )
          .then(window.location.reload())       
          }catch (err){
            console.log("erro")
          }
    }

    const CancelarEntrega = async() =>{
      try{
          await fetch(`${baseUrl}/entrega/CancelarEntrega`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'id': id,
                'motivo': motivo
        })})
        .then(setid('') )
        .then(window.location.reload())       
        }catch (err){
          console.log("erro")
        }
  }

  const ReinicarEntrega = async() =>{
    try{
        await fetch(`${baseUrl}/entrega/ReiniciarEntrega`, {
          method: 'PUT',
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          },    
          body: new URLSearchParams({
              'id': id,
              'motivo': motivo
      })})
      .then(setid('') )
      .then(window.location.reload())       
      }catch (err){
        console.log("erro")
      }
}


    useEffect(()=> {
      atualiarEntregas()
    }, []);
   
    return(
    <>
        
        <div className='ndBackground'>
            
            <div className='ndBoxSection'>
                <div className='ndBoxNav'><Nav></Nav></div>
                <div className='ndBoxSectionInFlex'>
                    <div className='logisticaBlocoFormTabela'>

                      <div className='logisticaBlocoForm'>

                          <table>
                                <tr>
                                  <td><button onClick={IniciarEntrega}>Iniciar Entrega</button></td>
                                  <td><button onClick={FinalizarEntrega}>Finalizar Entrega</button></td>
                                </tr>
                                <tr>
                                  <td><input type='checkbox' value="CANCELADA" onClick={(e) => {setstatus(e.target.value)}}/>Cancelada</td>  
                                  <td><input type='checkbox' value="ATENCAO" onClick={(e) => {setstatus(e.target.value)}}/>Reinicar Entrega</td> 
                                </tr>  
                                  {status.length === 9 ?(<>
                                  <tr>
                                    <td><textarea name='motivo' onChange={(e)=>{setMotivo(e.target.value)}} placeholder='Motivo'></textarea> </td>
                                    <td><input type="submit" value="Cancelar" className="btn" onClick={CancelarEntrega} /></td>
                                  </tr>  
                                  </>):(<></>)}
                              </table>

                      </div>

                      <div className='logisticaBlocoTabela'>

                        <table>
                              <tr>
                                <td>Selecionar</td>
                                <td>Cliente</td>
                                <td>Telefone</td>
                                <td>Status</td>
                              </tr>
                              {APIData.map((data,i)=>{
                                            return(<>
                                            <tr key={i}>
                                              <td><input type='checkbox' name='selecionar' onClick={(e) => {setid(data.id)}} /></td>
                                              <td>{data.nomeCliente}</td>
                                              <td>{data.telefoneContato}</td>
                                              <td>{data.statusEntrega}</td>
                                              <td><button onClick={(e)=>{setid(data.id)}}>Mais Informações</button></td>            
                                            </tr>
                                            </>)
                                        })}
                            </table>                          

                      </div>

                    </div>
                    <div className='logisticaBlocoInformacao'>

                        <p>Cliente: {entregaData.nomeCliente}</p>
                        <p>Endereço: {entregaData.enderecoEntrega}</p>
                        <p>Telefone: {entregaData.telefoneContato}</p>
                        <p>Produtos: {entregaData.produtos}</p>
                        <p>Status Atual: {entregaData.statusentrega}</p>                 

                    </div>
                </div>
            </div>
          </div>   



           
    </>
    );
}

export default Logistica;