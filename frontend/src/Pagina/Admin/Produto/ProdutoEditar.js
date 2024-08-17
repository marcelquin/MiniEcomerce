import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Produto.css';
import '../AdmGlobal.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function ProdutoEditar() {

  const {id} = useParams()
  //const baseUrl = "http://34.67.211.119:8080"
  const baseUrl = "http://localhost:8080"
  const[fornecedorData, setfornecedorData] = useState([])
  const navigate = useNavigate();
  const [produtoData, setprodutoData] = useState({
    nome: "",
    descricao: "",
    quantidade: "",
    medida: "",
    estoque: "",
    fabricante: "",
    valor: '',
    porcentagemLucro: '',
    cfop: '',
    ncmsh: ''
});
const[idFornecedor,setidFornecedor] = useState('')

useEffect(()=>{
  fetch(`${baseUrl}/produto/BuscarProdutoPorId?id=${id}`,
      {
          method:'GET',
          headers:{
              'content-type': 'application/json',
          },
      })
      .then((resp)=> resp.json())
      .then((data)=> {
          setprodutoData(data)
      })
      .then(console.log(id))
      .catch(err => console.log(err))
}, [id])

const handleChanage = (e) => {
  setprodutoData(prev=>({...prev,[e.target.name]:e.target.value}));
  console.log(produtoData)
}


const handleClick=async (e)=>{
  try{
    await fetch(`${baseUrl}/produto/EditarProduto`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },    
      body: new URLSearchParams({
          'id': id,
          'nome': produtoData.nome,
          'descricao': produtoData.descricao,
          'quantidade': produtoData.quantidade,
          'medida': produtoData.medida,
          'estoque': produtoData.estoque,
          'fornecedorId': idFornecedor,
          'fabricante': produtoData.fabricante,
          'cfop': produtoData.cfop,
          'ncmsh': produtoData.ncmsh,
          'valor': produtoData.valor,
          'porcentagemLucro': produtoData.porcentagemLucro
  })})
  .then(navigate("/admprodutogerencia"))  
  setprodutoData({
    nome: "",
    descricao: "",
    quantidade: "",
    medida: "",
    estoque: "",
    fabricante: "",
    cfop: "",
    ncmsh: "",
    valor: "",
    porcentagemLucro: ""
  })
  }catch (err){
    console.log("erro")
  }
}
useEffect(() => {
  Axios
    .get(`${baseUrl}/fornecedor/ListarFornecedor`)
    .then((response) => { setfornecedorData(response.data)})
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
}, []);
    return(
    <>
        <div className="admBlocoGeral">
            <div className="admBlocoNav">
                <Navadm></Navadm>
            </div>
            <div className="admBlocoConteudo">
            <div className="formBloco">
                            <h3>Dados do Produto</h3>
                            <form onSubmit={handleClick}>
                                <table >
                                <tr>
                                    <td><label>Nome:<br/>
                                     <input type="text" name="nome" value={produtoData.nome  } onChange={handleChanage} /></label></td>
                                    <td><label>Descriçao: <br/>
                                     <input type="text" name="descricao" value={produtoData.descricao  } onChange={handleChanage} /></label></td>
                                </tr>
                                <tr>
                                    <td><label>Quantidade:<br/> 
                                    <input type="number" name="quantidade" value={produtoData.quantidade  } onChange={handleChanage}/></label></td>                
                                    <td><label>Medida: <br/>
                                    <input list="medida" name="medida" value={produtoData.medida  }  placeholder="Selecione a unidade de medida" onChange={handleChanage} />
                                    <datalist id="medida">
                                        <option value="KG">Kg</option>
                                        <option value="G">G</option>
                                        <option value="L">L</option>
                                        <option value="ML">Ml</option>
                                    </datalist>                             
                                   </label> </td>
                                    <td><label> Estoque: <br/>
                                    <input type="number" name="estoque" value={produtoData.estoque  } onChange={handleChanage}/></label></td>
                                    
                                </tr>
                                <br/>
                                <tr>
                                <td><label>fabricante:<br/>
                                <input type="text" name="fabricante" value={produtoData.fabricante  } onChange={handleChanage}/></label></td>
                                  <td><label>Valor unitário de Compra:<br/>
                                  <input type="number" name="valor" value={produtoData.valor  } onChange={handleChanage}/></label></td>
                                  <td><label>Porcentagem de Lucro:<br/>
                                  <input type="number" name="porcentagemLucro" onChange={handleChanage}/></label></td>
                                </tr>
                                <tr>
                                  <td><label>CFOP:<br/>
                                  <input type="number" name="cfop" value={produtoData.cfop  } onChange={handleChanage}/></label></td>
                                  <td><label>NCMSH:<br/>
                                  <input type="number" name="ncmsh" value={produtoData.ncmsh  } onChange={handleChanage}/></label></td>
                                </tr>
                                  <h3>Fornecedor</h3><br/>
                                  <label>Selecione um Fornecedor</label>
                                <tr>
                                  {fornecedorData.map((data, i) => {
                                      return (
                                      <>
                                      <td><input type="checkbox" value={data.razaoSocial} onClick={(e) => {setidFornecedor(data.id)}}/>{data.razaoSocial}</td>
                                      </>
                                      )})}
                                </tr>
                                <br/>
                                <tr>
                                    <td><input type="submit" value="Salvar" className="btn" />  </td> 
                                </tr>
                              </table>
                            </form>
                    </div>
            </div>
        </div> 
    </>
    );
}

export default ProdutoEditar;