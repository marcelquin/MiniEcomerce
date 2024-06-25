import { Link } from "react-router-dom";
import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Produto.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Produtogerenciaadm() {
  const baseUrl = "http://34.133.121.3:8080"
  //const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    useEffect(() => {
        Axios
          .get(`${baseUrl}/produto/ListarProdutos`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);
      const pesquisa = dadoPesquisa.length > 0 ?
      APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
      []

    return(
    <>

                <div className="admBox">

                    <div className="admNav"><Navadm></Navadm></div>
                    <div className="admConteudo">
                    <div className="campoPesquisa">
                        <label>Nome:<br/>
                        <input type="text" name="dadoPesquisa" onChange={e=> setdadoPesquisa(e.target.value)} className="inputPesquisa" placeholder="Digite o coódigo de busca" />
                        </label>
                    </div>
                    {dadoPesquisa.length > 0 ?(<>
                      {pesquisa.map((data, i) =>{
                        return(
                            <>
                             <div className="blocoinfo" key={i}>
                            <details>
                                <summary>{data.nome}</summary>
                                <p>Dados de Nota Fiscal:</p>
                                <span>Nome: {data.nome}</span><br/>
                                <span>Descriçao: {data.descricao}</span><br/>
                                <span>Código: {data.codigo}</span><br/>
                                <span>Código de estoque: {data.estoque.codigo}</span><br/>
                                <span>Data de Entrada: {data.DataEntrada}</span><br/>
                                <p>Dados de valores</p>
                                <span>Valor: {data.valorFront}</span><br/>
                                <span>Valor total em estoque: {data.valorTotalEstoqueFront}</span><br/>
                                <table>
                                  <tr>
                                    <td><Link to={`/produtoeditar/${data.id}`}>Editar</Link></td>
                                    <td><a>Excluir</a></td>
                                  </tr>
                                </table>
                            </details>
                        </div>
                            </>
                        )
                    })}
                    </>) : (<>
                      {APIData.map((data, i) =>{
                        return(
                            <>
                             <div className="blocoinfo" key={i}>
                            <details>
                                <summary>{data.nome}</summary>
                                <p>Dados de Nota Fiscal:</p>
                                <span>Nome: {data.nome}</span><br/>
                                <span>Descriçao: {data.descricao}</span><br/>
                                <span>Código: {data.codigo}</span><br/>
                                <span>Código de estoque: {data.estoque.codigo}</span><br/>
                                <span>Data de Entrada: {data.DataEntrada}</span><br/>
                                <p>Dados de valores</p>
                                <span>Valor: {data.valorFront}</span><br/>
                                <span>Valor total em estoque: {data.valorTotalEstoqueFront}</span><br/>
                                <table>
                                  <tr>
                                    <td><Link to={`/produtoeditar/${data.id}`}>Editar</Link></td>
                                    <td><a>Excluir</a></td>
                                  </tr>
                                </table>
                            </details>
                        </div>
                            </>
                        )
                    })}
                    </>)}
                     
                </div>                    
                        
                    </div>

    </>
    );
}

export default Produtogerenciaadm;