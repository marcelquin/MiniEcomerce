import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cliente.css';
import '../AdmGlobal.css';
import { useParams } from 'react-router-dom';

function CLieteEditar() {

    const {id} = useParams()
    //const baseUrl = "http://34.133.121.3:8080"
    const baseUrl = "http://localhost:8080"
    const navigate = useNavigate();
    const [clienteData, setclienteData] = useState({
        nome: "",
        sobrenome: "",
        cpf: "",
        dataNascimento: "",
        logradouro: "",
        numero: "",
        bairro: "",
        referencia: "",
        cep: "",
        cidade: "",
        estado: "",
        prefixo: "",
        telefone: "",
        email: ""
      });

      useEffect(()=>{
        fetch(`${baseUrl}/cliente/BuscarClienteporid?id=${id}`, 
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setclienteData(data)
            })
            .catch(err => console.log(err))
    }, [id])

      const handleChanage = (e) => {
        setclienteData(prev=>({...prev,[e.target.name]:e.target.value}));
      }
  

      const handleClick=async (e)=>{
        try{
          fetch(`${baseUrl}/cliente/EdiarCliente`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'id': id,
                'nome':clienteData.nome,
                'sobrenome': clienteData.sobrenome,
                'cpf': clienteData.cpf,
                'dataNascimento':clienteData.dataNascimento,
                'logradouro':clienteData.logradouro,
                'numero':clienteData.numero,
                'bairro':clienteData.bairro,
                'referencia':clienteData.referencia,
                'cep': clienteData.cep,
                'cidade': clienteData.cidade,
                'estado': clienteData.estado,
                'prefixo':clienteData.prefixo,
                'telefone':clienteData.telefone,
                'email':clienteData.email
        })})
        .then(navigate("/admclientegerencia"))  
        setclienteData({
            nome: "",
            sobrenome: "",
            cpf: "",
            dataNascimento: "",
            logradouro: "",
            numero: "",
            bairro: "",
            referencia: "",
            cep: "",
            cidade: "",
            estado: "",
            prefixo: "",
            telefone: "",
            email: ""
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
            <div className="admConteudoCad">

<div className="formBloco">
<h3>Dados Pessoais:</h3>
<form>
    <table>
        <tr>
            <td><label>Nome: <br/>
            <input type="text" name="nome" id="nome" value={clienteData.nome} onChange={handleChanage}/></label></td>
            <td><label>Sobreome: <br/>
            <input type="text" name="sobrenome" value={clienteData.sobrenome} onChange={handleChanage}/></label></td>
            <td><label>CPF: <br/>
            <input type="number" name="cpf" placeholder="Somente numeros" value={clienteData.cpf} onChange={handleChanage}/></label></td>
        </tr>
        <tr>
            <td><label>Data de Nascimento: <br/>
            <input type="text" name="dataNascimento" value={clienteData.dataNascimento} placeholder="dd/mm/aaaa"  onChange={handleChanage}/></label></td>
        </tr>
    </table>
</form>
</div>
<div className="formBloco">
<h3>Endereço:</h3>
<form>
    <table>
        <tr>
        <td><label> Logradouro: <br/>
            <input type="text" name="logradouro" placeholder="Digite o Nome da rua" value={clienteData.logradouro}  onChange={handleChanage}/></label></td>
        <td><label>Numero: <br/>
        <input type="text" name="numero" placeholder="Digite o numero da casa" value={clienteData.numero}  onChange={handleChanage}/></label></td>
        <td><label>Bairro: <br/>
        <input type="text" name="bairro" placeholder="Digite O Bairro" value={clienteData.bairro}  onChange={handleChanage}/></label></td>
        </tr>
        <tr>
        <td><label>Referência: <br/>
        <input type="text" name="referencia" placeholder="Digite um Ponto de referência" value={clienteData.referencia} onChange={handleChanage}/></label></td>
        <td><label>CEP: <br/>
        <input type="number" name="cep" placeholder="Digite O Cep da cidade" value={clienteData.cep} onChange={handleChanage}/></label></td>
        <td><label>Cidade: <br/>
        <input type="text" name="cidade" placeholder="Digite a cidade" value={clienteData.cidade} onChange={handleChanage}/></label></td>
        </tr>
        <tr>
        <td><label>Estado: <br/>
        <input type="text" name="estado" placeholder="Digite a sigla do estado" value={clienteData.estado}  onChange={handleChanage}/></label></td>
        </tr>
    </table>
</form>
</div>
<div className="formBloco">
<h3>Contato</h3>
<form>
    <table>
        <tr>
        <td><label>Prefixo: <br/>
        <input type="number" name="prefixo" placeholder="Digite um email válido" value={clienteData.prefixo} onChange={handleChanage}/></label></td>
        <td><label>telefone:<br/> 
        <input type="number" name="telefone" placeholder="Digite um Telefone válido" value={clienteData.telefone} onChange={handleChanage}/></label></td>
        <td><label>E-Mail: <br/>
        <input type="email" name="email" placeholder="Digite um email válido" value={clienteData.email} onChange={handleChanage}/></label></td>
        </tr>
        <tr>
        <td><input type="submit" value="Salvar" className="btn" onClick={handleClick}/>  </td>
        </tr>
    </table>
</form>
</div>
            </div>
        </div>        
                
</div>

    </>
    );
}

export default CLieteEditar;