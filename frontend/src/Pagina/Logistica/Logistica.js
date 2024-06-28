import './Logistica.css';
//import Axios from 'axios';
//import React, { useState, useEffect } from 'react';


function Logistica() {
    //const baseUrl = "http://34.133.121.3:8080"
       // const baseUrl = "http://localhost:8080"
    //const [APIData, setAPIData] = useState([]);
    //const [id, setid] = useState('');
 
    /*
    const atualiarEntregas = async()=>{
        await Axios.get(`${baseUrl}/entrega/ListarEntregas`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    }
    
    {APIData.map((data,i)=>{
                    return(<>
                    <tr key={i}>
                    <td><input type='checkbox' name='selecionar' onClick={setid(data.id)} /></td>
                    <td>{data.nomeCliente}</td>
                    <td>{data.enderecoEntrega}</td>
                    <td>{data.telefoneContato}</td>
                    <td>{data.produtos}</td>
                    <td>{data.dataEntrega}</td>
                    
                    </tr>
                    </>)
                })}
    
    
    const iniciarEntrega = async()=>{
        try{
            await fetch(`${baseUrl}/entrega/ListarEntregasEmAberto`, {
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
    
    const finalizarEntrega = async() =>{
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

    useEffect(()=> {
       // atualiarEntregas();  
    }, []);
    */
    return(
    <>
    <div className="blocoConteudo">
    <h1>logistica</h1>
        <div className='tabelaLogistica'>
            <table>
                <tr>
                    <td>Cliente</td>
                    <td>Endereço</td>
                    <td>Telefone</td>
                    <td>Volumes</td>
                    <td>Status</td>
                </tr>
                
            </table>
        </div>
    </div>
        
    </>
    );
}

export default Logistica;