import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState,useEffect } from 'react';
import './Empresa.css';
import '../AdmGlobal.css';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
function EmpresEditar() {
    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const navigate = useNavigate();
    const {id} = useParams()
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
useEffect(()=>{
  fetch(`${baseUrl}/empresa/BuscarEmpresaPorId?id=${id}`,
      {
          method:'GET',
          headers:{
              'content-type': 'application/json',
          },
      })
      .then((resp)=> resp.json())
      .then((data)=> {
          setPostData(data)
      })
      .then(console.log(PostData))
      .catch(err => console.log(err))
}, [id])
  const handleChanage = (e) => {
    setPostData(prev=>({...prev,[e.target.name]:e.target.value}));
  }


  const handleClick=async (e)=>{
    try{
      fetch(`${baseUrl}/empresa/EditarEmpresa`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },    
        body: new URLSearchParams({
            'id': id,
            'nome': PostData.nome,
            'razaoSocial': PostData.razaoSocial,
            'cnpj': PostData.cnpj,
            'areaAtuacao': PostData.areaAtuacao,
            'dataInicioContrato': PostData.dataContrato,
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

        <div className="ndBackground">
            <div className="ndBoxSection">

                <div className="ndBoxNavAdm"><Navadm></Navadm></div>

                <div className="ndBoxSectionIn">
                    <form>
                        <table>
                            <tr>
                                <td><label>Nome: <br/>
                                <input type="text" name="nome" value={PostData.nome} onChange={handleChanage}/></label></td>
                                <td><label>Razão Social: <br/>
                                <input type="text" name="razaoSocial" value={PostData.razaoSocial}  onChange={handleChanage}/></label></td>                                    
                            </tr>
                            <tr>    
                                <td><label>CNPJ: <br/>
                                <input type="text" name="cnpj" value={PostData.cnpj} placeholder="Digite o CNPJ da empresa"  onChange={handleChanage}/></label></td>                       
                                <td><label>Área de Atuação: <br/>
                                <input type="text" name="areaAtuacao" value={PostData.areaAtuacao} onChange={handleChanage}/> </label></td>
                            </tr>
                            <tr>
                                <td><label>Logradouro: <br/>
                                <input type="text" name="logradouro" value={PostData.logradouro} placeholder="Digite o Nome da rua"  onChange={handleChanage}/></label></td>
                                <td><label>Numero:<br/> 
                                <input type="text" name="numero" value={PostData.numero} placeholder="Digite o numero da casa"  onChange={handleChanage}/></label></td>
                                <td><label>Bairro:<br/> 
                                <input type="text" name="bairro" value={PostData.bairro} placeholder="Digite O Bairro"  onChange={handleChanage}/></label></td>
                                </tr>
                                <tr>
                                <td><label>Referência:<br/>
                                <input type="text" name="referencia" value={PostData.referencia} placeholder="Digite um Ponto de referência"  onChange={handleChanage}/></label></td>
                                <td><label>CEP: <br/>
                                <input type="number" name="cep" value={PostData.cep} placeholder="Digite O Cep da cidade"  onChange={handleChanage}/></label></td>
                                <td><label>Cidade: <br/>
                                <input type="text" name="cidade" value={PostData.cidade} placeholder="Digite a cidade"  onChange={handleChanage}/></label></td>
                                </tr>
                                <tr>
                                <td><label>Estado: <br/> 
                                <input type="text" name="estado" value={PostData.estado} placeholder="Digite a sigla do estado"  onChange={handleChanage}/></label></td>
                            </tr>
                            <tr>
                                <td><label>Prefixo: <br/><input type="number" value={PostData.prefixo} name="prefixo" id="" onChange={handleChanage}/></label></td>
                                <td><label>Telefone: <br/><input type="number" value={PostData.telefone} name="telefone" id="" onChange={handleChanage}/></label></td>
                                <td><label>E-mail: <br/><input type="email" name="email" value={PostData.email} onChange={handleChanage}/></label></td>
                            </tr>
                            <tr>
                                <td><input type="submit" value="Salvar" className="btn" onClick={handleClick}/>  </td>
                            </tr> 
                        </table>
                    </form>

                </div>
            </div>
        </div>   
        </>
    )
}
export default EmpresEditar;