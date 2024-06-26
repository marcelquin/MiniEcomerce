import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Fornecedor.css';
import { useParams } from 'react-router-dom';

function FornecedorEditar() {
    const {id} = useParams()
    const baseUrl = "http://34.136.115.180:8080"
    //const baseUrl = "http://localhost:8080"
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
    .then(navigate("/adm")) 
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
        <div className="admBox">

            <div className="admNav"><Navadm></Navadm></div>
            <div className="admConteudo">
                <div className="formBloco">

                    <h3>Dados da Empresa:</h3>
                        <table>
                        <tr>
                            <td>Nome: <input type="text" name="nome" id="" value={fornecedorData.nome} onChange={handleChanage}/></td>
                            <td>Razão Social: <input type="text" name="razaoSocial" value={fornecedorData.razaoSocial}  onChange={handleChanage}/></td>                                    
                            <td>CNPJ: <input type="text" name="cnpj" placeholder="Digite o CNPJ da empresa" value={fornecedorData.cnpj}  onChange={handleChanage}/></td>
                         </tr>
                         <tr>
                            <td>Inicio de Contrato: <input type="date" name="dataContrato" placeholder="Selecione a data" value={fornecedorData.dataContrato}  onChange={handleChanage}/></td>                         
                            <td>Área de Atuação<input type="text" name="areaAtuacao" id="" value={fornecedorData.areaAtuacao} onChange={handleChanage}/> </td>
                        </tr>
                         
                        </table>
                </div>
                <div className="formBloco">
                    <h3>Endereço</h3>
                        <table>
                            <tr>
                                <td>CEP: <input type="text" name="cep" id="" value={fornecedorData.cep} onChange={handleChanage}/></td>
                                <td>Cidade: <input type="text" name="cidade" id="" value={fornecedorData.cidade} onChange={handleChanage}/></td>
                                <td>Estado: <input type="text" name="estado" id="" value={fornecedorData.estado} onChange={handleChanage}/></td>
                            </tr>
                        </table>
                </div>
                <div className="formBloco">
                <h3>Contato</h3>
                        <table>
                            <tr>
                                <td>Prefixo: <input type="number" name="prefixo" value={fornecedorData.prefixo}id="" onChange={handleChanage}/></td>
                                <td>Telefone: <input type="number" name="telefone" id="" value={fornecedorData.telefone} onChange={handleChanage}/></td>
                                <td>E-mail: <input type="email" name="email" id="" value={fornecedorData.email}onChange={handleChanage}/></td>
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