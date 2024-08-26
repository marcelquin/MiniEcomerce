import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Produto.css';
import '../AdmGlobal.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function ProdutoAddEstoque() {

  const {id} = useParams()
  //const baseUrl = "http://34.67.211.119:8080"
  const baseUrl = "http://localhost:8080"
  const[fornecedorData, setfornecedorData] = useState([])
  const navigate = useNavigate();
  const [putData, setputData] = useState({
    estoque: "",
    valor: '',
    porcentagemLucro: ''
});
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
  se(prev=>({...prev,[e.target.name]:e.target.value}));
  console.log(produtoData)
}


const handleClick=async (e)=>{
  try{
    await fetch(`${baseUrl}/produto/AdicionarEstoqueProduto`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },    
      body: new URLSearchParams({
          'id': id,
          'valor': putData.valor,
          'porcentagemLucro': putData.porcentagemLucro,
          'estoque': putData.estoque
  })})
  .then(navigate("/admprodutogerencia"))  
  setprodutoData({
    estoque: "",
    valor: '',
    porcentagemLucro: ''
  })
  }catch (err){
    console.log("erro")
  }
}

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
                                    <td><label> Estoque: <br/>
                                    <input type="number" name="estoque" value={produtoData.estoque  } onChange={handleChanage}/></label></td>
                                    <td><label>Valor unitário de Compra:<br/>
                                    <input type="number" name="valor" value={produtoData.valor  } onChange={handleChanage}/></label></td>
                                    <td><label>Porcentagem de Lucro:<br/>
                                    <input type="number" name="porcentagemLucro" onChange={handleChanage}/></label></td>
                                </tr>
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

export default ProdutoAddEstoque;