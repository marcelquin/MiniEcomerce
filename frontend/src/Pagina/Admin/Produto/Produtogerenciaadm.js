import { Link } from "react-router-dom";
import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Produto.css';
import '../AdmGlobal.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Produtogerenciaadm() {
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    useEffect(() => {
        Axios
          .get(`${baseUrl}/produto/ListarProdutos`)
          .then((response) => { setAPIData(response.data)})
          .then(console.log(APIData))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);
      const pesquisa = dadoPesquisa.length > 0 ?
      APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
      []



    return(
    <>
        <div className="admBlocoGeral">
            <div className="admBlocoNav">
                <Navadm></Navadm>
            </div>
            <div className="admBlocoConteudo">
            <div className="produtocampoPesquisa">
                            <label>Nome:<br/>
                            <input type="text" name="dadoPesquisa" onChange={e=> setdadoPesquisa(e.target.value)} className="inputPesquisa" placeholder="Digite o coódigo de busca" />
                            </label>
                        </div>
                        
                        <div className="produtoBox">
                        {dadoPesquisa.length > 0 ?(<>
                      {pesquisa.map((data, i) =>{
                        return(
                            <>
                             <div className="produtoRetorno">
                            <div className="produtoDestaque">
                                <div className="thumb"></div>
                                <div className="info">
                                <span>{data.nome}</span><br/>
                                <span>{data.valorFront}</span><br/>
                                </div>
                            </div>
                        <div className="infoGeral">
                            <span>{data.nome} {data.quantidade}{data.medida}</span><br/>
                            <span>{data.descricao}</span><br/>
                            <span>Valor unitário: {data.valorFront}</span><br/>
                            <span>Código: {data.codigo}</span><br/>
                            <span>Código Estoque: {data.estoque.codigo} </span><br/>
                            <span>Estoque Atual: {data.estoque.quantidade} </span><br/>
                            <span>Data de entrada: {data.DataEntrada}</span><br/><br/>
                            <span><Link to={`/produtoeditar/${data.id}`}>Editar</Link></span>
                        </div>
                        </div>
                            </>
                        )
                    })}
                    </>) : (<>
                      {APIData.map((data, i) =>{
                        return(
                            <>
                             <div className="produtoRetorno">
                            <div className="produtoDestaque">
                                <div className="thumb"></div>
                                <div className="info">
                                <span>{data.nome} {data.quantidade}{data.medida}</span><br/>
                                <span>{data.valorFront}</span><br/>
                                </div>
                            </div>
                        <div className="infoGeral">
                            <span>{data.nome} {data.quantidade}{data.medida}</span><br/>
                            <span>{data.descricao}</span><br/>
                            <span>Valor unitário: {data.valorFront}</span><br/>
                            <span>Código: {data.codigo}</span><br/>
                            <span>Código Estoque: {data.estoque.codigo} </span><br/>
                            <span>Estoque Atual: {data.estoque.quantidade} </span><br/>
                            <span>Data de entrada: {data.DataEntrada}</span><br/><br/>
                            <span><Link to={`/produtoeditar/${data.id}`}>Editar</Link></span>                                
                        </div>
                        </div>
                            </>
                        )
                    })}
                    </>)}
                        </div>
            </div>
        </div> 
    </>
    );
}

export default Produtogerenciaadm;