import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import './Fornecedor.css';


function Fornecedoradm() {
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
                            <td>Nome: <input type="text" name="nome" id="" onChange={handleChanage}/></td>
                            <td>Razão Social: <input type="text" name="razaoSocial"  onChange={handleChanage}/></td>                                    
                            <td>CNPJ: <input type="text" name="cnpj" placeholder="Digite o CNPJ da empresa"  onChange={handleChanage}/></td>
                         </tr>
                         <tr>
                            <td>Inicio de Contrato: <input type="date" name="dataContrato" placeholder="Selecione a data"  onChange={handleChanage}/></td>                         
                            <td>Área de Atuação<input type="text" name="areaAtuacao" id="" onChange={handleChanage}/> </td>
                        </tr>
                         
                        </table>
                </div>
                <div className="formBloco">
                    <h3>Endereço</h3>
                        <table>
                            <tr>
                                <td>CEP: <input type="text" name="cep" id="" onChange={handleChanage}/></td>
                                <td>Cidade: <input type="text" name="cidade" id="" onChange={handleChanage}/></td>
                                <td>Estado: <input type="text" name="estado" id="" onChange={handleChanage}/></td>
                            </tr>
                        </table>
                </div>
                <div className="formBloco">
                <h3>Contato</h3>
                        <table>
                            <tr>
                                <td>Prefixo: <input type="number" name="prefixo" id="" onChange={handleChanage}/></td>
                                <td>Telefone: <input type="number" name="telefone" id="" onChange={handleChanage}/></td>
                                <td>E-mail: <input type="email" name="email" id="" onChange={handleChanage}/></td>
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