import Navadm from "../Componentes/NavAdm";
import '../Style/Conteudo.css';
import React, { useState, useEffect } from 'react';


function Produtoadm() {
    const [valorProduto, setValorProduto] = useState('');
      const [nome, setNome] = useState('');
      const [descriacao, setDescricao] = useState('');
      const [quantidade, setQuantidade] = useState('');
      const [medida, setMedida] = useState('');
      const [estoque, setEstoque] = useState('');


      async function savedata(e){
        try{
          fetch('http://34.29.221.200:8080/produto/NovoProduto', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'nome':nome,
                'descriacao':descriacao,
                'quantidade':quantidade,
                'medida':medida,
                'valorProduto':valorProduto,
                'estoque':estoque
        })})
        setValorProduto('');
        setNome('');
        setDescricao('');
        setMedida('');
        setEstoque('');
        setQuantidade('');
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
                                    <td><td>Nome: <input type="text" name="nome" value={nome} onChange={(e)=> setNome(e.target.value)}/></td></td>
                                    <td>Descriçao: <input type="text" name="descricao" value={descriacao} onChange={(e)=> setDescricao(e.target.value)}/></td>
                                    <td><td>Quantidade: <input type="number" value={quantidade} name="quantidade" onChange={(e)=> setQuantidade(e.target.value)}/></td></td>
                                </tr>
                                <tr>                
                                    <td>Medida:
                                    <input list="medida" name="medida" value={medida} placeholder="Selecione a unidade de medida" onChange={(e)=> setMedida(e.target.value)}/>
                                    <datalist id="medida">
                                        <option value="KG">Kg</option>
                                        <option value="G">G</option>
                                        <option value="L">L</option>
                                        <option value="ML">Ml</option>
                                    </datalist>                             
                                    </td>
                                    <td>Estoque: <input type="number" name="estoque" value={estoque} onChange={(e)=> setEstoque(e.target.value)}/></td>
                                    <td>Valor: <input type="number" name="valor" value={valorProduto} onChange={(e)=> setValorProduto(e.target.value)}/></td>
                                </tr>
                                <tr>                          
                                    <td><input type="submit" value="Salvar" className="btn" onClick={savedata}/>  </td> 
                                </tr>
                                </table>
                            </form>
                    </div>

                    </div>
                </div>

    </>
    );
}

export default Produtoadm;