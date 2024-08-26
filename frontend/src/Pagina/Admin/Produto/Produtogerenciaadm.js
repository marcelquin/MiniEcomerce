import { Link, useNavigate } from "react-router-dom";
import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Produto.css';
import '../AdmGlobal.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Produtogerenciaadm() {
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const [seletorOpcao, setseletorOpcao] = useState('')
    const [id, setid] = useState('')
    const [APIData, setAPIData] = useState([]);
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const [produtoData, setprodutoData] = useState({
        nome: "",
        descricao: "",
        quantidade: "",
        medida: "",
        estoque: "",
        fabricante: "",
        valor: '',
        valorFront: '',
        porcentagemLucro: '',
        cfop: '',
        ncmsh: '',
        estoque: ''
    });

    useEffect(() => {
        Axios
          .get(`${baseUrl}/produto/ListarProdutos`)
          .then((response) => { setAPIData(response.data)})
          .then(console.log(APIData))
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);
      const pesquisa = dadoPesquisa.length > 0 ?
      APIData.filter(dados => dados.nome.includes(dadoPesquisa)) :
      []

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
            .catch(err => console.log(err))
      }, [id])  

      //editar
    const[fornecedorData, setfornecedorData] = useState([])
    const[idFornecedor,setidFornecedor] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        Axios
          .get(`${baseUrl}/fornecedor/ListarFornecedor`)
          .then((response) => { setfornecedorData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    const handleChanagePut = (e) => {
        setprodutoData(prev=>({...prev,[e.target.name]:e.target.value}));
      }
    
      const handleClickPut=async (e)=>{
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

      //Adicionar Estoque
      const AdicionarEstoque = async() =>{
        try{
            await fetch(`${baseUrl}/produto/AdicionarEstoqueProduto`, {
              method: 'PUT',
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              },    
              body: new URLSearchParams({
                  'id': id,
                  'valor': produtoData.valor,
                  'porcentagemLucro': produtoData.porcentagemLucro,
                  'estoque': produtoData.estoque
          })})
          .then(setid('') )
          .then(window.location.reload())       
          }catch (err){
            console.log("erro")
          }
    }

    //reajuste

    const [porcentagem, setporcentagem] = useState('')
    
    const ReajusteValor = async() =>{
        try{
            await fetch(`${baseUrl}/produto/ReajustePreco`, {
              method: 'PUT',
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              },    
              body: new URLSearchParams({
                  'id': id,
                  'porcentagem': porcentagem
          })})
          .then(setid('') )
          .then(window.location.reload())       
          }catch (err){
            console.log("erro")
          }
    }

    const DescontoValor = async() =>{
        try{
            await fetch(`${baseUrl}/produto/QueimaEstoque`, {
              method: 'PUT',
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              },    
              body: new URLSearchParams({
                  'id': id,
                  'porcentagem': porcentagem
          })})
          .then(setid('') )
          .then(window.location.reload())       
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
                    <div className="ndSectionInCampoPesquisaAdm">
                        
                        <label>Nome:
                        <input type="text" name="dadoPesquisa" onChange={e=> setdadoPesquisa(e.target.value)} className="inputPesquisa" placeholder="Digite o coódigo de busca" />
                        </label>

                    </div>
                    <div className="ndSectionInRetornoInfoFlexAdm">
                    
                        <div className="infoRetornoTabelaAdm">
                            <table>
                                <tr>
                                    <td>Nome</td>
                                    <td>Código</td>
                                    <td>Valor</td>
                                    <td>Estoque</td>
                                    <td>Código Estoque</td>
                                    <td>Data de Entrada</td>
                                </tr>
                            {dadoPesquisa.length >0?(<>
                            
                                {pesquisa.map((data,i)=>{return(<>
                                
                                    <tr key={i}>
                                        <td>{data.nome}</td>
                                        <td>{data.codigo}</td>
                                        <td>{data.valor}</td>
                                        <td>{data.estoque.quantidade}</td>
                                        <td>{data.estoque.codigo}</td>
                                        <td>{data.DataEntrada}</td>
                                        <td><input list="opcao" name="seletorOpcao"  placeholder="Selecione uma opção" onChange={(e)=>{setid(data.id);setseletorOpcao(e.target.value)}} />
                                                <datalist id="opcao">
                                                    <option value="info" onClick={(e)=>{setseletorOpcao(e.target.value)}}>Detalhes</option>
                                                    <option value="Editar" onClick={(e)=>{setseletorOpcao(e.target.value)}}>Editar Informações</option>
                                                    <option value="addEstoque" onClick={(e)=>{setseletorOpcao(e.target.value)}}>Adicionar Estoque</option>
                                                    <option value="reajuste" onClick={(e)=>{setseletorOpcao(e.target.value)}}>reajuste</option>
                                                    <option value="descontoGeral" onClick={(e)=>{setseletorOpcao(e.target.value)}}>Desconto geral</option>
                                                </datalist>
                                        </td>
                                    </tr>

                                </>)})}

                            </>):(<>
                            
                                {APIData.map((data,i)=>{return(<>
                                
                                    <tr key={i}>
                                        <td>{data.nome}</td>
                                        <td>{data.codigo}</td>
                                        <td>{data.valor}</td>
                                        <td>{data.estoque.quantidade}</td>
                                        <td>{data.estoque.codigo}</td>
                                        <td>{data.DataEntrada}</td>
                                        <td><input list="opcao" name="seletorOpcao"  placeholder="Selecione uma opção" onChange={(e)=>{setid(data.id);setseletorOpcao(e.target.value)}} />
                                                <datalist id="opcao">
                                                    <option value="info" onClick={(e)=>{setseletorOpcao(e.target.value)}}>Detalhes</option>
                                                    <option value="Editar" onClick={(e)=>{setseletorOpcao(e.target.value)}}>Editar Informações</option>
                                                    <option value="addEstoque" onClick={(e)=>{setseletorOpcao(e.target.value)}}>Adicionar Estoque</option>
                                                    <option value="reajuste" onClick={(e)=>{setseletorOpcao(e.target.value)}}>reajuste</option>
                                                    <option value="descontoGeral" onClick={(e)=>{setseletorOpcao(e.target.value)}}>Desconto geral</option>
                                                </datalist>
                                        </td>
                                    </tr>
                                
                                </>)})}
                            
                            </>)}
                            </table>
                        </div>
                        
                        <div className="infoRetornoVisorAdm">

                            {seletorOpcao.length === 4?(<>
                                <h3>Produto: {produtoData.nome}</h3>
                                <p>Descriçao: {produtoData.descricao}</p>
                                <p>Código: {produtoData.codigo}</p>
                                <p>Data de Entrada{produtoData.DataEntrada}</p>
                                <p>CFOP: {produtoData.cfop}</p>
                                <p>NCMSH: {produtoData.ncmsh}</p>
                                <p>Valor Unitários: {produtoData.valorFront}</p>
                                <p>Quantidade em Estoque: {produtoData.estoque}</p>
                            
                            </>):(<></>)}

                            {seletorOpcao.length === 6 ?(<>
                                <form onSubmit={handleClickPut}>
                                    <tr>
                                        <td><label>Nome:<br/>
                                        <input type="text" className="inputPut" name="nome" value={produtoData.nome} onChange={handleChanagePut} /></label></td>
                                    </tr>   
                                    <tr>
                                        <td><label>Descriçao: <br/>
                                        <input type="text" className="inputPut" name="descricao" value={produtoData.descricao} onChange={handleChanagePut} /></label></td>
                                    </tr>
                                    <tr>
                                        <td><label>CFOP:<br/>
                                        <input type="number" className="inputPut" name="cfop" value={produtoData.cfop  } onChange={handleChanagePut} /></label></td>
                                    </tr>   
                                    <tr>    
                                        <td><label>NCMSH: <br/>
                                        <input type="number" className="inputPut" name="ncmsh" value={produtoData.ncmsh  } onChange={handleChanagePut} /></label></td>
                                    </tr>
                                    <tr>
                                        <td><label>Valor Total da Compra:<br/>
                                        <input type="number" className="inputPut" name="valor" value={produtoData.valor  } onChange={handleChanagePut} /></label></td>
                                    </tr>   
                                    <tr>
                                        <td><label>porcentagem Lucro: <br/>
                                        <input type="number" className="inputPut" name="porcentagemLucro" value={produtoData.porcentagemLucro  } onChange={handleChanagePut} /></label></td>
                                    </tr>
                                    <tr>
                                    <td><label>Estoque:<br/>
                                    <input type="number" className="inputPut" name="estoque" value={produtoData.estoque  } onChange={handleChanagePut} /></label></td>
                                    </tr>
                                    {fornecedorData?(<>
                                        <tr>
                                            {fornecedorData.map((data, i) => {
                                            return (
                                            <>
                                            <td><input type="checkbox" value={data.razaoSocial} onClick={(e) => {setidFornecedor(data.id)}}/>{data.razaoSocial}</td>
                                            </>
                                            )})}
                                        </tr>
                                    </>):(<>
                                    
                                    </>)}                         
                                    <tr>
                                    <td><label>fabricante:<br/>
                                    <input type="text" className="inputPut" name="fabricante" value={produtoData.fabricante  } onChange={handleChanagePut} /></label></td>
                                    </tr>
                                    <tr>
                                        <td><input type="submit" value="Salvar" className="btn" />  </td> 
                                    </tr> 
                                </form>
                            </>):(<></>)}

                            {seletorOpcao.length === 10 ?(<>
                                <form onSubmit={AdicionarEstoque}>
                                    <table>
                                        <tr>
                                            <td><label>Valor de compra:<br/>
                                            <input type="number" className="inputPut" name="valor" onChange={handleChanagePut} /></label></td>
                                        </tr>
                                            <tr>    
                                            <td><label>porcentagem Lucro: <br/>
                                            <input type="number" className="inputPut" name="porcentagemLucro" onChange={handleChanagePut} /></label></td>
                                        </tr>
                                        <tr>
                                            <td><label>Estoque:<br/>
                                            <input type="number" className="inputPut" name="estoque" onChange={handleChanagePut} /></label></td>
                                        </tr>
                                        <tr>
                                            <td><input type="submit" value="Salvar" className="btn" />  </td> 
                                        </tr>
                                    </table>
                                </form>
                            </>):(<></>)}                        
                                
                            {seletorOpcao.length === 8 ?(<>
                                <form onSubmit={ReajusteValor}>
                                    <table>
                                        <tr>
                                            <td><label>Porcentagem:<br/>
                                            <input type="number" className="inputPut" name="porcentagem" onChange={(e)=>{setporcentagem(e.target.value)}} /></label></td>
                                        </tr>
                                        <tr>
                                            <td><input type="submit" value="Salvar" className="btn" />  </td> 
                                        </tr>
                                    </table>
                                </form>
                            </>):(<></>)}  


                            {seletorOpcao.length === 13 ?(<>
                                <form onSubmit={DescontoValor}>
                                    <table>
                                        <tr>
                                            <td><label>Porcentagem:<br/>
                                            <input type="number" className="inputPut" name="porcentagem" onChange={(e)=>{setporcentagem(e.target.value)}} /></label></td>
                                        </tr>
                                        <tr>
                                            <td><input type="submit" value="Salvar" className="btn" />  </td> 
                                        </tr>
                                    </table>
                                </form>
                            </>):(<></>)}      

                        </div>

                    </div>   

                </div>

            </div>
        </div>

        
    </>
    );
}

export default Produtogerenciaadm;