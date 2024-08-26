import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cliente.css';
import '../AdmGlobal.css';
import { useParams } from 'react-router-dom';

function CLieteEditar() {

    const {id} = useParams()
    const baseUrl = "http://34.67.211.119:8080"
    //const baseUrl = "http://localhost:8080"
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
        <div className="ndBackground">
            <div className="ndBoxSection">

                <div className="ndBoxNavAdm"><Navadm></Navadm></div>

                <div className="ndBoxSectionIn">
                    <div className="ndSectionInRetornoInfo">

                        <h2>Edite as Informações do Cliente</h2>
                        <form>
                                <table>
                                    <tr>
                                    <td><label> Nome:<br/> 
                                    <input type="text" name="nome" id="nome" onChange={handleChanage}/></label></td>
                                    <td><label>Sobreome:<br/>
                                    <input type="text" name="sobrenome"  onChange={handleChanage}/></label></td>
                                    <td><label>CPF:<br/>
                                    <input type="text" name="cpf" placeholder="Somente numeros"  onChange={handleChanage}/></label></td>
                                    </tr>
                                    <tr>
                                    <td><label>Data de Nascimento:<br/>
                                    <input type="text" name="dataNascimento" placeholder="dd/mm/aaaa"  onChange={handleChanage}/></label></td>
                                    </tr>
                                    <br/>
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
                                    <br/>
                                    <tr>
                                    <td><label> Prefixo: <br/>
                                    <input type="number" name="prefixo" placeholder="Digite um email válido"  onChange={handleChanage}/></label></td>
                                    <td><label>Telefone: <br/>
                                    <input type="number" name="telefone" placeholder="Digite um Telefone válido"  onChange={handleChanage}/></label></td>
                                    <td><label>E-Mail: <br/>
                                    <input type="email" name="email" placeholder="Digite um email válido"  onChange={handleChanage}/></label></td>
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