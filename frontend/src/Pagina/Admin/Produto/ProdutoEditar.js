import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Produto.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function ProdutoEditar() {

  const {id} = useParams()
  //const baseUrl = "http://34.136.115.180:8080"
  const baseUrl = "http://localhost:8080"
  const[fornecedorData, setfornecedorData] = useState([])
  const navigate = useNavigate();
  const [produtoData, setprodutoData] = useState({
    nome: "",
    descriacao: "",
    quantidade: "",
    medida: "",
    estoque: "",
    valor: "",
    porcentagemLucro: ""
});
const[idFornecedor,setidFornecedor] = useState('')

useEffect(()=>{
  fetch(`${baseUrl}/cliente/BuscarProdutoporid?id=${id}`,
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
      .catch(err => console.log(err))
}, [id])

const handleChanage = (e) => {
  setprodutoData(prev=>({...prev,[e.target.name]:e.target.value}));
}


const handleClick=async (e)=>{
  try{
    fetch(`${baseUrl}/produto/EditarProduto`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },    
      body: new URLSearchParams({
          'id': id,
          'nome': produtoData.nome,
          'descriacao': produtoData.descriacao,
          'quantidade': produtoData.quantidade,
          'medida': produtoData.medida,
          'estoque': produtoData.estoque,
          'fornecedorId': idFornecedor,
          'valor': produtoData.valor,
          'porcentagemLucro': produtoData.porcentagemLucro
  })})
  .then(navigate("/admprodutogerencia"))  
  setprodutoData({
    nome: "",
    descriacao: "",
    quantidade: "",
    medida: "",
    estoque: "",
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

                <div className="admBox">

                    <div className="admNav"><Navadm></Navadm></div>
                    <div className="admConteudo">

                    <div className="formBloco">
                            <h3>Dados do Produto</h3>
                            <form>
                                <table>
                                <tr>
                                    <td><label>Nome:<br/>
                                     <input type="text" name="nome" onChange={handleChanage} /></label></td>
                                    <td><label>Descriçao: <br/>
                                     <input type="text" name="descriacao" onChange={handleChanage} /></label></td>
                                </tr>
                                <tr>
                                    <td><label>Quantidade:<br/> 
                                    <input type="number" name="quantidade" onChange={handleChanage}/></label></td>                
                                    <td><label>Medida: <br/>
                                    <input list="medida" name="medida"  placeholder="Selecione a unidade de medida" onChange={handleChanage} />
                                    <datalist id="medida">
                                        <option value="KG">Kg</option>
                                        <option value="G">G</option>
                                        <option value="L">L</option>
                                        <option value="ML">Ml</option>
                                    </datalist>                             
                                   </label> </td>
                                    <td><label> Estoque: <br/>
                                    <input type="number" name="estoque" onChange={handleChanage}/></label></td>
                                    
                                </tr>
                                <br/>
                                <tr>
                                
                                  <td><label>Valor de venda:<br/>
                                  <input type="number" name="valor" onChange={handleChanage}/></label></td>
                                  <td><label>Porcentagem de Lucro:<br/>
                                  <input type="number" name="porcentagemLucro" onChange={handleChanage}/></label></td>
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
                                    <td><input type="submit" value="Salvar" className="btn" onClick={handleClick}/>  </td> 
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