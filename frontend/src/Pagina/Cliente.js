import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Style/Conteudo.css';

function Cliente() {
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://34.69.39.159:8080/cliente/ListarClientes")
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

      const [nome, setNome] = useState('');
      const [endereco, setEndereco] = useState('');
      const [telefone, setTelefone] = useState('');
      const [prefixo, setPrefixo] = useState('');
    
      async function savedata(e){
        try{
          fetch('http://34.69.39.159:8080/cliente/NovoCliente', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'nome': nome,
                'endereco': endereco,
                'prefixo': prefixo,
                'telefone': telefone
        })})
        setNome('');
        setEndereco('');
        setPrefixo('');
        setTelefone('');
        }catch (err){
          console.log("erro")
        }
      }

      async function Editardata(e){
        try{
          fetch('http://34.69.39.159:8082/cliente/EdiarCliente', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'nome': nome,
                'endereco': endereco,
                'prefixo': prefixo,
                'telefone': telefone
        })})
        setNome('');
        setEndereco('');
        setPrefixo('');
        setTelefone('');
        }catch (err){
          console.log("erro")
        }
      }

      async function Excluidata(e){
        try{
          fetch('http://34.69.39.159:8082/cliente/DeletarCliente', {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'nome': nome,
        })})
        setNome('');
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
                            <td>Endereço:</td>
                            <td><input type="text" name="endereco" value={endereco} onChange={(e)=> setEndereco(e.target.value)}/>  </td>
                        </tr>
                        <tr>
                            <td>Prefixo:</td>
                            <td><input type="number" name="prefixo" value={prefixo}  onChange={(e)=> setPrefixo(e.target.value)}/>  </td>
                            <td>Telefone:</td>
                            <td><input type="number" name="telefone" value={telefone} onChange={(e)=> setTelefone(e.target.value)}/>  </td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="Salvar" className="btn" onClick={savedata}/>  </td>
                            <td><input type="submit" value="Editar" className="btn" onClick={Editardata}/>  </td>
                            <td><input type="submit" value="Excluir" className="btn" onClick={Excluidata}/>  </td>
                        </tr>
                    </table>            
                
                </form>    
                
                    
            </div>
            <div className="boxtabela">
                    <table>
                         <tr>
                            <td>Nome</td>
                            <td>Endereço</td>
                            <td>telefone</td>
                        </tr>            
                    
                {APIData.map((data, i) => {
                            return (
                            <>
                                <tr>
                                    <td><label>{data.nome}</label> </td>
                                    <td><label>{data.endereco}</label></td>
                                    <td><label>({data.prefixo}) {data.telefone}</label></td>
                                </tr>
                            </>
                            )})}
                </table>
            </div>    
        </div>
        </>      
    );
}

    export default Cliente;