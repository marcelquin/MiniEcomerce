import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Fornecedor.css';
import '../AdmGlobal.css';
import { useParams } from 'react-router-dom';

function FornecedorEditar() {
    const {id} = useParams()
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const navigate = useNavigate();
    const [fornecedorData, setfornecedorData] = useState({
        nome: "",
        razaoSocial: "",
        cnpj: "",
        areaAtuacao: "",
        dataContrato: "",
        cep: "",
        cidade: "",
        estado: "",
        prefixo: "",
        telefone: "",
        email: ""
  });

  useEffect(()=>{
    fetch(`${baseUrl}/fornecedor/BuscarFornecedorPorId?id=${id}`,
        {
            method:'GET',
            headers:{
                'content-type': 'application/json',
            },
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setfornecedorData(data)
        })
        .then(console.log(fornecedorData))  
        .catch(err => console.log(err))
}, [id])

  const handleChanage = (e) => {
    setfornecedorData(prev=>({...prev,[e.target.name]:e.target.value}));
  }


  const handleClick=async (e)=>{
    try{
      fetch(`${baseUrl}/fornecedor/EditarFornecedor`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
            'id': id,
            'nome': fornecedorData.nome,
            'razaoSocial': fornecedorData.razaoSocial,
            'cnpj': fornecedorData.cnpj,
            'areaAtuacao': fornecedorData.areaAtuacao,
            'dataInicioContrato': fornecedorData.dataContrato,
            'cep': fornecedorData.cep,
            'cidade': fornecedorData.cidade,
            'estado': fornecedorData.estado,
            'prefixo': fornecedorData.prefixo,
            'telefone': fornecedorData.telefone,
            'email': fornecedorData.email
    })})
    .then(navigate("/admfornecedorgerencia"))
    setfornecedorData({
        nome: "",
        razaoSocial: "",
        cnpj: "",
        areaAtuacao: "",
        dataContrato: "",
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
            <div className="formBloco">

<h3>Dados da Empresa:</h3>
    <table>
    <tr>
        <td><label> Nome: <br/>
        <input type="text" name="nome" value={fornecedorData.nome} onChange={handleChanage}/></label></td>
        <td><label>Razão Social: <br/>
        <input type="text" name="razaoSocial" value={fornecedorData.razaoSocial} onChange={handleChanage}/></label></td>                                    
        <td><label>CNPJ: <br/>
        <input type="text" name="cnpj" placeholder="Digite o CNPJ da empresa" value={fornecedorData.cnpj}  onChange={handleChanage}/></label></td>
     </tr>
     <tr>
        <td><label>Inicio de Contrato: <br/>
        <input type="date" name="dataContrato" value={fornecedorData.dataContrato} placeholder="Selecione a data"  onChange={handleChanage}/></label></td>                         
        <td><label>Área de Atuação: <br/>
        <input type="text" name="areaAtuacao" value={fornecedorData.areaAtuacao} onChange={handleChanage}/></label> </td>
    </tr>
     
    </table>
</div>
<div className="formBloco">
<h3>Endereço</h3>
    <table>
        <tr>
            <td><label>CEP: <br/>
            <input type="text" name="cep" value={fornecedorData.cep} onChange={handleChanage}/></label></td>
            <td><label>Cidade: <br/>
            <input type="text" name="cidade" value={fornecedorData.cidade} onChange={handleChanage}/></label></td>
            <td><label>Estado: <br/>
            <input type="text" name="estado" value={fornecedorData.estado} onChange={handleChanage}/></label></td>
        </tr>
    </table>
</div>
<div className="formBloco">
<h3>Contato</h3>
    <table>
        <tr>
            <td><label>Prefixo: <br/>
            <input type="number" name="prefixo" value={fornecedorData.prefixo} onChange={handleChanage}/></label></td>
            <td><label>Telefone: <br/>
            <input type="number" name="telefone" value={fornecedorData.telefone} onChange={handleChanage}/></label></td>
            <td><label>E-mail: <br/>
            <input type="email" name="email" value={fornecedorData.email} onChange={handleChanage}/></label></td>
        </tr>
        <tr>
        <td><input type="submit" value="Salvar" className="btn" onClick={handleClick}/>  </td>
    </tr> 
    </table>
</div>

            </div>
        </div>
        </>
    )
}
export default FornecedorEditar;