import { useEffect, useState } from 'react';
import './Logistica.css';
import Axios from 'axios';
//import React, { useState, useEffect } from 'react';


function Logistica() {
  //const baseUrl = "http://34.67.211.119:8080"
  const baseUrl = "http://localhost:8080"
    const [status, setstatus] = useState('')
    const [id, setid] = useState('')
    const [idInfo, setidInfo] = useState('')
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
          await fetch(`${baseUrl}/pedido/CancelarEntrega`, {
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
        await fetch(`${baseUrl}/pedido/AtencaoEntrega`, {
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
    
    <div className='boxgeral'>

                 

<div className='boxform'>
<form>
        <table>
            <tr>
               <td><input type='submit' value="Iniciar Entrega" onClick={IniciarEntrega} /></td>
            </tr>
            <tr>
               <td><input type='submit' value="Finalizar Entrega" onClick={FinalizarEntrega} /></td>
            </tr>
            <tr>
               <td><input type='checkbox' value="CANCELADA" onClick={(e) => {setstatus(e.target.value)}}/>Cancelada</td>  
            </tr>
            <tr>
               <td><input type='checkbox' value="ATENCAO" onClick={(e) => {setstatus(e.target.value)}}/>Reinicar Entrega</td>  
            </tr>
            {status.length === 9 ?(<>
              <tr>
                <td><textarea name='motivo' onChange={(e)=>{setMotivo(e.target.value)}} placeholder='Motivo'></textarea> </td>
            </tr>
            <tr>
              <td><input type="submit" value="Cancelar" className="btn" onClick={CancelarEntrega} /></td>
            </tr>  
            </>):(<></>)}
            {status.length === 7 ?(<>
              <tr>
              <td><textarea name='motivo' onChange={(e)=>{setMotivo(e.target.value)}} placeholder='Motivo'></textarea> </td>
              </tr>
            <tr>
              <td><input type="submit" value="Reiniciar" className="btn" onClick={ReinicarEntrega} /></td>
            </tr>  
            </>):(<></>)}              
      </table>
    </form>
</div>
<div className='boxtabela'>
    <div className='retornoTabela'>
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
                    </tr>
                    </>)
                })}
    </table>
    </div>
    <div className='retornoCupomFiscal'>
        <a>Imprimir</a> <a>Enviar por email</a>
        <div className='boxCupom'>

              
              <span></span><br/>
        </div>
    </div>
</div>
</div>
        
    </>
    );
}

export default Logistica;