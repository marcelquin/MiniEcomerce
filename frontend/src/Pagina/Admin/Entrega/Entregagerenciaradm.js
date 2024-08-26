import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Entrega.css';
import '../AdmGlobal.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Entregagerenciaadm() {
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const [idEntrega, setidEntrega ] = useState('')
    const [corpoResponse, setcorpoResponse] = useState({
        'nomeCliente': '',
        'enderecoEntrega': '',
        'telefoneContato': '',
        'produtos': [],
        'statusentrega': '',
    })
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
      APIData.filter(dados => dados.nomeCliente.includes(dadoPesquisa)) :
      []
    useEffect(() => {
        Axios
          .get(`${baseUrl}/entrega/ListarEntregas`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      useEffect(()=>{
        fetch(`${baseUrl}/entrega/BuscarEntregaPorId?id=${idEntrega}`,
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setcorpoResponse(data)
            })
            .catch(err => console.log(err))
      }, [idEntrega]) 
      

    return(
    <>

        <div className="ndBackground">
            <div className="ndBoxSection">

                <div className="ndBoxNavAdm"><Navadm></Navadm></div>

                <div className="ndBoxSectionIn">
                    <div className="ndSectionInCampoPesquisaAdm">
                    
                        <label>Razão Social:
                        <input type="text" name="dadoPesquisa" onChange={e=> setdadoPesquisa(e.target.value)} className="inputPesquisa" placeholder="Digite o coódigo de busca" />
                        </label>

                    </div>

                    <div className="ndSectionInRetornoInfoFlexAdm">

                        <div className="infoRetornoTabelaAdm">

                            <table>
                                    <tr>
                                        <td>Cliente</td>
                                        <td>Endereço</td>
                                        <td>Telefone</td>
                                        <td>Status</td>
                                    </tr>
                                    {dadoPesquisa.length > 0 ? (<>
                                {pesquisa.map((data, i) => {
                                return (
                                <>
                            <tr key={i}>
                                    <td>{data.nomeCliente}</td>
                                    <td>{data.enderecoEntrega}</td>
                                    <td>{data.telefoneContato}</td>
                                    <td>{data.status}</td>
                                    <a onClick={(e)=>{setidEntrega(data.id)}}>+ detalhes</a>
                                </tr> 
                                            </>
                                            )})}
                                </>) : (<>
                                {APIData.map((data, i) => {
                                return (
                                <>
                                <tr key={i}>
                                    <td>{data.nomeCliente}</td>
                                    <td>{data.enderecoEntrega}</td>
                                    <td>{data.telefoneContato}</td>
                                    <td>{data.status}</td>
                                    <button onClick={(e)=>{setidEntrega(data.id)}}>Mais Informações</button>
                                </tr> 
                                            </>
                                            )})}
                                </>)}
                                    </table>

                        </div>

                        <div className="infoRetornoVisorAdm">
                            <table>
                                <tr>
                                    <td>{corpoResponse.nomeCliente}</td>
                                </tr>
                                <tr>
                                    <td>{corpoResponse.enderecoEntrega}</td>
                                </tr>
                                <tr>
                                    <td>{corpoResponse.telefoneContato}</td>
                                </tr>
                                <tr>
                                    <td>{corpoResponse.produtos}</td>
                                </tr>
                                <tr>
                                    <td>{corpoResponse.statusentrega}</td>
                                </tr>
                            </table>


                        </div>

                    </div>
                </div>
            </div>
        </div>    
    </>
    );
}

export default Entregagerenciaadm;