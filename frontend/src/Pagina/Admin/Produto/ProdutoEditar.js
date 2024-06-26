import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Produto.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function ProdutoEditar() {

  const {id} = useParams()
  const baseUrl = "http://34.136.115.180:8080"
  //const baseUrl = "http://localhost:8080"
  const navigate = useNavigate();
  const[idNota, setidNota] = useState('')
  const [APIData,setAPIData] = useState([])
  const [produtoData, setprodutoData] = useState({
    nome: "",
    descriacao: "",
    quantidade: "",
    medida: "",
    estoque: "",
    valorEmNota: "",
    impostoAplicado: "",
    porcentagemLucro: "",
    valorFrete: "",
    valorCusto: ""
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
      .then(console.log(produtoData))
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
          'idNotaFiscal': idNota,
          'valorEmNota': produtoData.valorEmNota,
          'impostoAplicado': produtoData.impostoAplicado,
          'porcentagemLucro': produtoData.porcentagemLucro,
          'valorFrete': produtoData.valorFrete,
          'valorCusto': produtoData.valorCusto
  })})
  .then(navigate("/adm")) 
  setprodutoData({
    nome: "",
    descriacao: "",
    quantidade: "",
    medida: "",
    estoque: "",
    valorEmNota: "",
    impostoAplicado: "",
    porcentagemLucro: "",
    valorFrete: "",
    valorCusto: ""
  })
  }catch (err){
    console.log("erro")
  }
}

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

                        <div className="formBloco">
                            <h3>Dados do Produto</h3>
                            <form>
                                <table>
                                <tr>
                                    <td>Nome: <input type="text" name="nome" value={produtoData.nome} onChange={handleChanage} /></td>
                                    <td>Descriçao: <input type="text" name="descriacao" value={produtoData.descricao} onChange={handleChanage} /></td>
                                    <td>Quantidade: <input type="number" name="quantidade" value={produtoData.quantidade} onChange={handleChanage}/></td>
                                </tr>
                                <tr>                
                                    <td>Medida:
                                    <input list="medida" name="medida"  placeholder="Selecione a unidade de medida" value={produtoData.medida} onChange={handleChanage} />
                                    <datalist id="medida">
                                        <option value="KG">Kg</option>
                                        <option value="G">G</option>
                                        <option value="L">L</option>
                                        <option value="ML">Ml</option>
                                    </datalist>                             
                                    </td>
                                    <td>Estoque: <input type="number" name="estoque" value={produtoData.estoque} onChange={handleChanage}/></td>
                                </tr>
                              </table>
                            </form>
                    </div>

                    <div className="formBloco">
                          <h3>Dados de Nota Fiscal</h3>
                          <table>

                            <tr>
                              <td>Valor Em Nota: <input type="number" name="valorEmNota" value={produtoData.valorEmNota} onChange={handleChanage} /></td>
                              <td>Porcentagem de Imposto Aplicado: <input type="number" name="impostoAplicado" value={produtoData.impostoAplicado} onChange={handleChanage} /></td>
                            </tr>
                            <tr>
                              <td>Porcentagem de Lucro: <input type="text" name="porcentagemLucro" value={produtoData.porcentagemLucro} onChange={handleChanage} /></td>
                              <td>Valor Frete: <input type="number" name="valorFrete" value={produtoData.valorFrete} onChange={handleChanage} /></td>
                              <td>Custo Operacional: <input type="number" name="valorCusto" value={produtoData.valorCusto} onChange={handleChanage} /></td>
                            </tr>
                            <tr>
                            <tr>
                              <h3>Selecione a NotaFiscal Desejada</h3>
                              {APIData.map((data, i) =>{
                                    return(
                                      <>
                                      <label><input type="checkbox" onClick={(e) => {setidNota(data.id)}}/>{data.fornecedor.razaoSocial} {data.xml}</label>
                                      </>
                                    )
                                  })} 
                            </tr>
                            </tr>
                            <tr>                          
                              <td><input type="submit" value="Salvar" className="btn" onClick={handleClick}/>  </td> 
                            </tr>
                          </table>    

                    </div>

                    </div>
                </div>

    </>
    );
}

export default ProdutoEditar;