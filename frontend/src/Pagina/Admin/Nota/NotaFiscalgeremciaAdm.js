import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import './Nota.css';
import Axios from 'axios';

function Notafiscalgerenciaadm() {
    const baseUrl = "http://34.136.115.180:8080"
    //const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData]= useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const pesquisa = dadoPesquisa.length > 0 ?
    APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
    [];
    useEffect(() => {
      Axios
        .get(`${baseUrl}/notafiscal/ListarNotasFiscais`)
        .then((response) => { setAPIData(response.data)})
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);


    return(
        <>
        <div className="admBox">

            <div className="admNav"><Navadm></Navadm></div>
            <div className="admConteudo">

                      <div className="campoPesquisa">
                          <label>Nome:<br/>
                          <input type="text" onChange={e=> setdadoPesquisa(e.target.value)} name="dadoPesquisa" className="inputPesquisa" placeholder="Digite o Nome para busca" />
                          </label>
                      </div>
                    {APIData.map((data, i) => {
                            return (
                            <>

                        <div className="blocoinfo" key={i}>
                            <details>
                                <summary>{data.xml}</summary>
                                <p>Dados de Nota Fiscal:</p>
                                <span>XML: {data.xml}</span><br/>
                                <span>Data de entrada: {data.dataEntrada}</span><br/>
                                <p>Dados de Fornecedor</p>
                                <span>Razão Social: {data.fornecedor.razaoSocial}</span><br/>
                                <span>CNPJ: {data.fornecedor.cnpj}</span><br/>
                                <p>Produtos Cadastrados:</p>
                                <span>Produtos: {data.produtos.map((item) =>{ return(<><label>{item.nome}, </label></>)})}</span>
                                <table>
                                  <tr>
                                    <td><Link to={`/notafiscaleditar/${data.id}`}>Editar</Link></td>
                                    <td><a>Excluir</a></td>
                                  </tr>
                                </table>
                            </details>
                        </div>
                                            </>
                                            )})}
            </div>
        </div>
        </>
    )
}
export default Notafiscalgerenciaadm;