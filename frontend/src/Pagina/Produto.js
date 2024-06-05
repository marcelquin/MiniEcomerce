import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Style/Conteudo.css';

function Produto() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://130.211.116.164:8080/produto/ListarProdutos")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      const [valorProduto, setValorProduto] = useState('');
      const [nome, setNome] = useState('');
      const [descriacao, setDescricao] = useState('');
      const [quantidade, setQuantidade] = useState('');
      const [medida, setMedida] = useState('');
      const [estoque, setEstoque] = useState('');


      async function savedata(e){
        try{
          fetch('http://130.211.116.164:8080/produto/NovoProduto', {
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
        }catch (err){
          console.log("erro")
        }
      }

    const [codigoProduto, setCodigoProduto] = useState('');
    const [porcentagem, setPorcentagem] = useState('');

    async function ReajusteValor(e){
        try{
          fetch('http://130.211.116.164:8080/produto/ReajustePreco', {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'codigoProduto':codigoProduto,
                'porcentagem': porcentagem
        })})
        setCodigoProduto('');
        setPorcentagem('');
        }catch (err){
          console.log("erro")
        }
      }

      async function QueimaEstoque(e){
        try{
          fetch('http://130.211.116.164:8080/produto/QueimaEstoque', {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'codigoProduto':codigoProduto,
                'porcentagem': porcentagem
        })})
        setCodigoProduto('');
        setPorcentagem('');
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
                            <td>Nome:</td>
                            <td><input type="text" name="nome" value={nome} onChange={(e)=> setNome(e.target.value)}/>  </td>
                            <td>Descrião:</td>
                            <td><input type="text" name="descricao" value={descriacao} onChange={(e)=> setDescricao(e.target.value)}/>  </td>
                        </tr> 
                        <tr>   
                            <td>Quantidade:</td>
                            <td><input type="number" name="quantidade" value={quantidade} onChange={(e)=> setQuantidade(e.target.value)}/>  </td>
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
                            <td>Valor Produto:</td>
                            <td><input type="number" name="valorProduto" value={valorProduto} onChange={(e)=> setValorProduto(e.target.value)}/>  </td>
                            <td>Estoque:</td>
                            <td><input type="number" name="estoque" value={estoque} onChange={(e)=> setEstoque(e.target.value)}/>  </td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Salvar" className="btn" onClick={savedata}/>  </td> 
                        </tr>
                    </table>            

                </form>    
                <form>
                    <table>
                        <tr>
                            <td>Codigo Produto:</td>
                            <td><input type="text" name="codigoProduto" onChange={(e)=> setCodigoProduto(e.target.value)}/></td>
                            <td>Porcentagem:</td>
                            <td><input type="number" name="codigoProduto" onChange={(e)=> setPorcentagem(e.target.value)}/></td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Reajuste" className="btn" onClick={ReajusteValor}/>  </td> 
                            <td><input type="submit" value="Desconto" className="btn" onClick={QueimaEstoque}/>  </td> 
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