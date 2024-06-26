import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, } from 'react';
import './Fornecedor.css';
import { useNavigate } from "react-router-dom";

function Fornecedoradm() {
    const baseUrl = "http://34.133.121.3:8080"
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

  const handleChanage = (e) => {
    setfornecedorData(prev=>({...prev,[e.target.name]:e.target.value}));
  }


  const handleClick=async (e)=>{
    try{
      fetch(`${baseUrl}/fornecedor/NovoFornecedor`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
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
                            <td><label>Nome: <br/>
                            <input type="text" name="nome" id="" onChange={handleChanage}/></label></td>
                            <td><label>Razão Social: <br/>
                            <input type="text" name="razaoSocial"  onChange={handleChanage}/></label></td>                                    
                            <td><label>CNPJ: <br/>
                            <input type="text" name="cnpj" placeholder="Digite o CNPJ da empresa"  onChange={handleChanage}/></label></td>
                         </tr>
                         <tr>
                            <td><label>Inicio de Contrato: <br/>
                            <input type="date" name="dataContrato" placeholder="Selecione a data"  onChange={handleChanage}/></label></td>                         
                            <td><label>Área de Atuação: <br/>
                            <input type="text" name="areaAtuacao" id="" onChange={handleChanage}/> </label></td>
                        </tr>
                         
                        </table>
                </div>
                <div className="formBloco">
                    <h3>Endereço</h3>
                        <table>
                            <tr>
                                <td><label>CEP: <br/>
                                <input type="text" name="cep" id="" onChange={handleChanage}/></label></td>
                                <td><label>Cidade: <br/>
                                <input type="text" name="cidade" id="" onChange={handleChanage}/></label></td>
                                <td><label>Estado: <br/>
                                <input type="text" name="estado" id="" onChange={handleChanage}/></label></td>                            </tr>
                        </table>
                </div>
                <div className="formBloco">
                <h3>Contato</h3>
                        <table>
                            <tr>
                                <td><label>Prefixo: <br/><input type="number" name="prefixo" id="" onChange={handleChanage}/></label></td>
                                <td><label>Telefone: <br/><input type="number" name="telefone" id="" onChange={handleChanage}/></label></td>
                                <td><label>E-mail: <br/><input type="email" name="email" id="" onChange={handleChanage}/></label></td>
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
export default Fornecedoradm;