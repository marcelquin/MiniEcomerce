import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cliente.css';

function CLieteadm() {
    const baseUrl = "http://34.133.121.3:8080"
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
        email: "",
      });

      const handleChanage = (e) => {
        setclienteData(prev=>({...prev,[e.target.name]:e.target.value}));
      }
  

      const handleClick=async (e)=>{
        try{
          fetch(`${baseUrl}/cliente/NovoCliente`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
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
        .then(navigate("/adm"))     
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
                <div className="admBox">

                    <div className="admNav"><Navadm></Navadm></div>
                    <div className="admConteudoCad">

                        <div className="formBloco">
                        <h3>Dados Pessoais:</h3>
                        <form>
                            <table>
                                <tr>
                                <td><label> Nome:<br/> 
                                <input type="text" name="nome" id="nome" onChange={handleChanage}/></label></td>
                                <td><label>Sobreome:<br/>
                                <input type="text" name="sobrenome"  onChange={handleChanage}/></label></td>
                                <td><label>CPF:<br/>
                                <input type="number" name="cpf" placeholder="Somente numeros"  onChange={handleChanage}/></label></td>
                                </tr>
                                <tr>
                                <td><label>Data de Nascimento:<br/>
                                <input type="text" name="dataNascimento" placeholder="dd/mm/aaaa"  onChange={handleChanage}/></label></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="formBloco">
                        <h3>Endereço:</h3>
                        <form>
                            <table>
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
                            </table>
                        </form>
                    </div>
                    <div className="formBloco">
                        <h3>Contato</h3>
                        <form>
                            <table>
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

    </>
    );
}

export default CLieteadm;