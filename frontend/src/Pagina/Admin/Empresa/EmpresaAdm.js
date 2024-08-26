import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, } from 'react';
import './Empresa.css';
import '../AdmGlobal.css';
import { useNavigate } from "react-router-dom";

function Empresaadm() {
  //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const navigate = useNavigate();
    const [PostData, setPostData] = useState({
      nome: "",
      razaoSocial: "",
      cnpj: "",
      areaAtuacao: "",
      logradouro: "",
      numero: "",
      bairro: "",
      referencia: "",
      cep: "",
      cidade: "",
      estado: "",
      prefixo: "",
      telefone: "",
      email: "",
});

const handleChanage = (e) => {
  setPostData(prev=>({...prev,[e.target.name]:e.target.value}));
}


  const handleClick=async (e)=>{
    try{
      fetch(`${baseUrl}/empresa/NovaEmpresa`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
            'nome': PostData.nome,
            'razaoSocial': PostData.razaoSocial,
            'cnpj': PostData.cnpj,
            'areaAtuacao': PostData.areaAtuacao,
            'logradouro':PostData.logradouro,
            'numero':PostData.numero,
            'bairro':PostData.bairro,
            'referencia':PostData.referencia,
            'cep': PostData.cep,
            'cidade': PostData.cidade,
            'estado': PostData.estado,
            'prefixo':PostData.prefixo,
            'telefone':PostData.telefone,
            'email':PostData.email
    })})
    .then(navigate("/adm"))  
    setPostData({
      nome: "",
      razaoSocial: "",
      cnpj: "",
      areaAtuacao: "",
      logradouro: "",
      numero: "",
      bairro: "",
      referencia: "",
      cep: "",
      cidade: "",
      estado: "",
      prefixo: "",
      telefone: "",
      email: "",
    })
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
                  <div className="ndSectionInRetornoInfo">
                      
                    <form>
                      <h1>Cadastre Os Dados de Sua Empresa</h1>
                      <table>
                        <tr>
                            <td><label>Nome: <br/>
                            <input type="text" name="nome" id="" onChange={handleChanage}/></label></td>
                            <td><label>Razão Social: <br/>
                            <input type="text" name="razaoSocial"  onChange={handleChanage}/></label></td>                                    
                        </tr>
                        <tr>    
                            <td><label>CNPJ: <br/>
                            <input type="text" name="cnpj" placeholder="Digite o CNPJ da empresa"  onChange={handleChanage}/></label></td>                       
                            <td><label>Área de Atuação: <br/>
                            <input type="text" name="areaAtuacao" id="" onChange={handleChanage}/> </label></td>
                        </tr>
                        <tr>
                          <td><label>Logradouro: <br/>
                          <input type="text" name="logradouro" placeholder="Digite o Nome da rua"  onChange={handleChanage}/></label></td>
                          <td><label>Numero:<br/> 
                          <input type="text" name="numero" placeholder="Digite o numero da casa"  onChange={handleChanage}/></label></td>
                          <td><label>Bairro:<br/> 
                          <input type="text" name="bairro" placeholder="Digite O Bairro"  onChange={handleChanage}/></label></td>
                        </tr>
                        <tr>
                          <td><label>Referência:<br/>
                          <input type="text" name="referencia" placeholder="Digite um Ponto de referência"  onChange={handleChanage}/></label></td>
                          <td><label>CEP: <br/>
                          <input type="number" name="cep" placeholder="Digite O Cep da cidade"  onChange={handleChanage}/></label></td>
                          <td><label>Cidade: <br/>
                          <input type="text" name="cidade" placeholder="Digite a cidade"  onChange={handleChanage}/></label></td>
                        </tr>
                        <tr>
                          <td><label>Estado: <br/> 
                          <input type="text" name="estado" placeholder="Digite a sigla do estado"  onChange={handleChanage}/></label></td>
                        </tr> 
                        <tr>
                          <td><label>Prefixo: <br/><input type="number" name="prefixo" id="" onChange={handleChanage}/></label></td>
                          <td><label>Telefone: <br/><input type="number" name="telefone" id="" onChange={handleChanage}/></label></td>
                          <td><label>E-mail: <br/><input type="email" name="email" id="" onChange={handleChanage}/></label></td>
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
    )
}
export default Empresaadm;