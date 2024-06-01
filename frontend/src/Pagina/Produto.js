import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Style/Conteudo.css';

function Produto() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://localhost:8080/produto/ListarProdutos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      const [valorNota, setValorNota] = useState('');
      const [valorFrete, setValorFrete] = useState('');
      const [porcentagemImposto, setPorcentagemImposto] = useState('');
      const [custoOperacional, setCustoOperacional] = useState('');
      const [porcentagemLucro, setPorcentagemLucro] = useState('');
      const [nome, setNome] = useState('');
      const [descriacao, setDescricao] = useState('');
      const [quantidade, setQuantidade] = useState('');
      const [medida, setMedida] = useState('');
      const [estoque, setEstoque] = useState('');


      async function savedata(e){
        try{
          fetch('http://localhost:8080/produto/NovoProduto', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'valorNota': valorNota,
                'valorFrete': valorFrete,
                'porcentagemImposto': porcentagemImposto,
                'custoOperacional': custoOperacional,
                'porcentagemLucro':porcentagemLucro,
                'nome':nome,
                'descriacao':descriacao,
                'quantidade':quantidade,
                'medida':medida,
                'estoque':estoque
        })})
        setValorNota('');
        setValorFrete('');
        setPorcentagemImposto('');
        setCustoOperacional('');
        setPorcentagemLucro('');
        setNome('');
        setDescricao('');
        setMedida('');
        setEstoque('');
        }catch (err){
          console.log("erro")
        }
      }



    return (
        <>
        <div className="blocoConteudo">
            <div className="boxForm">

                <form>

                    <table>
                        <tr>
                            <td>Valor Nota:</td>
                            <td><input type="number" name="valorNota" value={valorNota} onChange={(e)=> setValorNota(e.target.value)}/>  </td>
                            <td>Valor Frete:</td>
                            <td><input type="number" name="valorfrete" value={valorFrete} onChange={(e)=> setValorFrete(e.target.value)}/>  </td>
                        </tr>
                        <tr>
                        <td>Porcenagem Imposto:</td>
                            <td><input type="number" name="porcentagemImposto" value={porcentagemImposto} onChange={(e)=> setPorcentagemImposto(e.target.value)}/>  </td>
                            <td>Custo operacional:</td>
                            <td><input type="number" name="custoOperacional" value={custoOperacional} onChange={(e)=> setCustoOperacional(e.target.value)}/>  </td>
                        </tr>
                        <tr>
                            <td>Porcenagem lucro:</td>
                            <td><input type="number" name="porcentagemLucro" value={porcentagemLucro} onChange={(e)=> setPorcentagemLucro(e.target.value)}/>  </td> 
                            <td>Nome:</td>
                            <td><input type="text" name="nome" value={nome} onChange={(e)=> setNome(e.target.value)}/>  </td>
                        </tr>
                        <tr>
                        <td>Descrião:</td>
                            <td><input type="text" name="descricao" value={descriacao} onChange={(e)=> setDescricao(e.target.value)}/>  </td>
                            <td>Quantidade:</td>
                            <td><input type="number" name="quantidade" value={quantidade} onChange={(e)=> setQuantidade(e.target.value)}/>  </td>
                        </tr>
                        <tr>
                        <td><label>Unidade Medida:</label></td>
                            <td>
                            <input list="unidade" name="unidade" value={medida} placeholder="Selecione a unidade de medida"  onChange={(e)=> setMedida(e.target.value)}/>
                            <datalist id="unidade">
                                <option value="KG">Kg</option>
                                <option value="G">G</option>
                                <option value="L">L</option>
                                <option value="ML">Ml</option>
                            </datalist>
                            </td>
                        </tr>
                        <tr>
                        <td>Estoque:</td>
                            <td><input type="number" name="estoque" value={estoque} onChange={(e)=> setEstoque(e.target.value)}/>  </td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Salvar" className="btn" onClick={savedata}/>  </td> 
                        </tr>
                    </table>            

                </form>    
                
            </div>
            <div className="tabelaProduto">
                <table>
                    <tr>
                        <td className="tdProduto">Nome</td>
                        <td>Descrição</td>
                        <td>Código</td>
                        <td className="tdProduto">Valor</td>
                        <td>Estoque</td>
                        <td>Total Estoque</td> 
                        <td>Data Entrada</td>                  
                    </tr>
                    {APIData.map((data, i) => {
                        return (
                        <>
                            <tr key={i}>

                                <td>{data.nome}</td>
                                <td>{data.descricao}</td>
                                <td>{data.codigo}</td>
                                <td>{data.valorFront}</td>
                                <td>{data.estoque}</td>
                                <td>{data.valorTotalFront}</td>  
                                <td>{data.DataEntrada}</td>

                            </tr>

                        </>
                        )})}
                </table>
                </div>                    
        </div>        
        </>
    );
}

    export default Produto;