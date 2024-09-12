import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Produto.css';
import '../AdmGlobal.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


function Produtoadm() {
  //const baseUrl = "http://34.67.211.119:8080"
  const baseUrl = "http://localhost:8080"
  const navigate = useNavigate();
  const [fornecedorData, setfornecedorData] = useState([])
  const [produtoData, setprodutoData] = useState({
    nome: "",
    descricao: "",
    estoque: "",
    valor: "",
    porcentagemLucro: "",
    fabricante: "",
    cfop: "",
    ncmsh: ""
});
const [idFornecedor, setidFornecedor] = useState('')
 
useEffect(() => {
  Axios
    .get(`${baseUrl}/fornecedor/ListarFornecedor`)
    .then((response) => { setfornecedorData(response.data)})
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
}, []);

const handleChanage = (e) => {
  setprodutoData(prev=>({...prev,[e.target.name]:e.target.value}));
  console.log(produtoData)
}


const handleClick=async (e)=>{
  try{
    fetch(`${baseUrl}/produto/NovoProduto`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },    
      body: new URLSearchParams({
          'nome': produtoData.nome,
          'descricao': produtoData.descricao,
          'estoque': produtoData.estoque,
          'fornecedorId': idFornecedor,
          'valor': produtoData.valor,
          'porcentagemLucro': produtoData.porcentagemLucro,
          'fabricante': produtoData.fabricante,
          'ncmsh':produtoData.ncmsh,
          'cfop':produtoData.cfop
  })})
  .then(navigate("/adm"))  
  setprodutoData({
    nome: "",
    descricao: "",
    estoque: "",
    valor: "",
    porcentagemLucro: "",
    fabricante: "",
    cfop: "",
    ncmsh: ""
  })
  }catch (err){
    console.log("erro")
  }
}

    return(
    <>

    <div className="ndBackground">
      <div className="ndBoxSection">
          
          <div className="ndBoxNavAdm"><Navadm></Navadm></div>

          <div className="ndBoxSectionIn">
              <div className="ndSectionInRetornoInfo">
                  
              <h3>Dados do Produto</h3>
                            <form>
                                <table>
                                <tr>
                                    <td><label>Nome:<br/>
                                     <input type="text" name="nome" onChange={handleChanage} /></label></td>
                                    <td><label>Descriçao: <br/>
                                     <input type="text" name="descricao" onChange={handleChanage} /></label></td>
                                </tr>
                                <tr>
                                <td><label> CFOP: <br/>
                                  <input type="number" name="cfop" onChange={handleChanage}/></label></td>
                                  <td><label> NCMSH: <br/>
                                  <input type="number" name="ncmsh" onChange={handleChanage}/></label></td>
                                </tr>
                                <tr>
                                    <td><label> Estoque: <br/>
                                    <input type="number" name="estoque" onChange={handleChanage}/></label></td>
                                    <td><label> Fabricante: <br/>
                                    <input type="text" name="fabricante" onChange={handleChanage}/></label></td>
                                </tr>
                                <br/>
                                <tr>                
                                  <td><label>Valor Total da Compra:<br/>
                                  <input type="number" name="valor" step="any"  onChange={handleChanage}/></label></td>
                                  <td><label>Porcentagem de Lucro:<br/>
                                  <input type="number" name="porcentagemLucro" onChange={handleChanage}/></label></td>
                                </tr>
                                
                                <tr>
                                <h3>Fornecedor</h3><br/>
                                <label>Selecione um Fornecedor</label>
                                  {fornecedorData.map((data, i) => {
                                      return (
                                      <>
                                      <td><input type="checkbox" value={data.razaoSocial} onClick={(e) => {setidFornecedor(data.id)}}/>{data.razaoSocial}</td>
                                      </>
                                      )})}
                                </tr>
                                <br/>
                                <tr>
                                    <td><input type="submit" value="Salvar" className="btn" onClick={handleClick}/>  </td> 
                                </tr>
                              </table>
                            </form>

              </div>
          </div>
      </div>
    </div>
 
    </>
    );
}

export default Produtoadm;