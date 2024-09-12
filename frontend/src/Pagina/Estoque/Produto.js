import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Nav from '../../Componentes/Nav/Nav'
import './Estoque.css';
import '../../Style/Global.css'

function Produto() {
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const [dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
    [];

    useEffect(() => {
        Axios
          .get(`${baseUrl}/estoque/ListarEstoque`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    return (
        <>

        <div className='ndBackground'>
            
            <div className='ndBoxSection'>
                <div className='ndBoxNav'><Nav></Nav></div>
                <div className='ndBoxSectionIn'>
                    
                    <div className='ndSectionInCampoPesquisa'>
                          <label>Nome:
                          <input type="text" onChange={e=> setdadoPesquisa(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                          </label>
                    </div>
                    <br/>
                    <div className='ndSectionInRetornoInfo'>
                        <table>
                            <tr>
                                <td>Nome</td>
                                <td>Descrição</td>
                                <td>Código</td>
                                <td>Valor</td>
                                <td>Quantidade Atual</td>
                                <td>Notificação</td>
                            </tr>
                        
                        {dadoPesquisa.length > 0 ?(<>
                        
                            {pesquisa.map((data, i)=>{
                                    return(<>
                                        <tr>
                                        <td>{data.nome}</td>
                                        <td>{data.descricao}</td>
                                        <td>{data.codigo}</td>
                                        <td>{data.valorFront}</td>
                                        <td>{data.quantidade} Unidades</td>
                                        {data.notificacao?(<>
                                        <td>{data.notificacao}</td>
                                        </>):(<></>)}
                                    </tr>
                                    </>)
                                    
                            })}

                        </>):(<>
                        
                            {APIData.map((data, i)=>{
                                return(<>
                                    <tr>
                                    <td>{data.nome}</td>
                                    <td>{data.descricao}</td>
                                    <td>{data.codigo}</td>
                                    <td>{data.valorFront}</td>
                                    <td>{data.quantidade} Unidades</td>
                                </tr>
                                </>)
                                
                            })}
                        
                        </>)}
                        </table>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
}

    export default Produto;