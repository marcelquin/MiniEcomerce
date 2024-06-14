import Navadm from "../Componentes/NavAdm";
import '../Style/Conteudo.css';
import React, { useState, useEffect } from 'react';


function Produtoadm() {

  const [produtoData, setprodutoData] = useState({
    nome: "",
    descriacao: "",
    quantidade: "",
    medida: "",
    estoque: "",
    xml: "",
    valorEmNota: "",
    impostoAplicado: "",
    porcentagemLucro: "",
    valorFrete: "",
    valorCusto: ""
});
 
const handleChanage = (e) => {
  setprodutoData(prev=>({...prev,[e.target.name]:e.target.value}));
}


const handleClick=async (e)=>{
  try{
    fetch('http://localhost:8080/produto/NovoProduto', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },    
      body: new URLSearchParams({
          'nome': produtoData.nome,
          'descriacao': produtoData.descriacao,
          'quantidade': produtoData.quantidade,
          'medida': produtoData.medida,
          'estoque': produtoData.estoque,
          'xml': produtoData.xml,
          'valorEmNota': produtoData.valorEmNota,
          'impostoAplicado': produtoData.impostoAplicado,
          'porcentagemLucro': produtoData.porcentagemLucro,
          'valorFrete': produtoData.valorFrete,
          'valorCusto': produtoData.valorCusto
  })})
  setprodutoData({
    nome: "",
    descriacao: "",
    quantidade: "",
    medida: "",
    estoque: "",
    xml: "",
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
                                    <td>Nome: <input type="text" name="nome" onChange={handleChanage} /></td>
                                    <td>Descriçao: <input type="text" name="descriacao" onChange={handleChanage} /></td>
                                    <td>Quantidade: <input type="number" name="quantidade" onChange={handleChanage}/></td>
                                </tr>
                                <tr>                
                                    <td>Medida:
                                    <input list="medida" name="medida"  placeholder="Selecione a unidade de medida" onChange={handleChanage} />
                                    <datalist id="medida">
                                        <option value="KG">Kg</option>
                                        <option value="G">G</option>
                                        <option value="L">L</option>
                                        <option value="ML">Ml</option>
                                    </datalist>                             
                                    </td>
                                    <td>Estoque: <input type="number" name="estoque" onChange={handleChanage}/></td>
                                </tr>
                              </table>
                            </form>
                    </div>

                    <div className="formBloco">
                          <h3>Dados de Nota Fiscal</h3>
                          <table>

                            <tr>
                              <td>XML: <input type="text" name="xml" onChange={handleChanage} /></td>
                              <td>Valor Em Nota: <input type="number" name="valorEmNota" onChange={handleChanage} /></td>
                              <td>Porcentagem de Imposto Aplicado: <input type="number" name="impostoAplicado" onChange={handleChanage} /></td>
                            </tr>
                            <tr>
                              <td>Porcentagem de Lucro: <input type="text" name="porcentagemLucro" onChange={handleChanage} /></td>
                              <td>Valor Frete: <input type="number" name="valorFrete" onChange={handleChanage} /></td>
                              <td>Custo Operacional: <input type="number" name="valorCusto" onChange={handleChanage} /></td>
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

export default Produtoadm;