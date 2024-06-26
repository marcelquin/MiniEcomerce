import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cliente.css';
import { useParams } from 'react-router-dom';

function CLieteEditar() {

    const {id} = useParams()
    const baseUrl = "http://34.136.115.180:8080"
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
        profissao: "",
        salarioBruto: "",
        salarioLiquido: ""
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
            .then(console.log(clienteData))
            
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
                'email':clienteData.email,
                'profissao': clienteData.profissao,
                'salarioBruto': clienteData.salarioBruto,
                'salarioLiquido': clienteData.salarioLiquido
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
            email: "",
            profissao: "",
            salarioBruto: "",
            salarioLiquido: ""
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
                                <td>Nome: <input type="text" name="nome" id="nome" value={clienteData.nome} onChange={handleChanage}/></td>
                                <td>Sobreome: <input type="text" name="sobrenome" value={clienteData.sobrenome} onChange={handleChanage}/></td>
                                <td>CPF: <input type="number" name="cpf" placeholder="Somente numeros" value={clienteData.cpf} onChange={handleChanage}/></td>
                                </tr>
                                <tr>
                                <td>Data de Nascimento: <input type="text" name="dataNascimento" value={clienteData.dataNascimento} placeholder="dd/mm/aaaa"  onChange={handleChanage}/></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="formBloco">
                        <h3>Endereço:</h3>
                        <form>
                            <table>
                                <tr>
                                <td>Logradouro: <input type="text" name="logradouro" placeholder="Digite o Nome da rua" value={clienteData.logradouro}  onChange={handleChanage}/></td>
                                <td>Numero: <input type="text" name="numero" placeholder="Digite o numero da casa" value={clienteData.numero}  onChange={handleChanage}/></td>
                                <td>Bairro: <input type="text" name="bairro" placeholder="Digite O Bairro" value={clienteData.bairro}  onChange={handleChanage}/></td>
                                </tr>
                                <tr>
                                <td>Referência: <input type="text" name="referencia" placeholder="Digite um Ponto de referência" value={clienteData.referencia} onChange={handleChanage}/></td>
                                <td>CEP: <input type="number" name="cep" placeholder="Digite O Cep da cidade" value={clienteData.cep} onChange={handleChanage}/></td>
                                <td>Cidade: <input type="text" name="cidade" placeholder="Digite a cidade" value={clienteData.cidade} onChange={handleChanage}/></td>
                                </tr>
                                <tr>
                                <td>Estado: <input type="text" name="estado" placeholder="Digite a sigla do estado" value={clienteData.estado}  onChange={handleChanage}/></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="formBloco">
                    <h3>Dados Profissionais</h3>
                        <form>
                            <table>
                                <tr>
                                <td>Profissão: <input type="text" name="profissao" placeholder="Digite a Profissão do cliente" value={clienteData.profissao} onChange={handleChanage}/></td>
                                <td>Salário Bruto: <input type="number" name="salarioBruto" placeholder="Digite o valor do salario bruto" value={clienteData.salarioBruto}  onChange={handleChanage}/></td>
                                <td>Salário Líquido: <input type="email" name="salarioLiquido" placeholder="Digite o valor do salario líquido" value={clienteData.salarioLiquido}  onChange={handleChanage}/></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="formBloco">
                        <h3>Contato</h3>
                        <form>
                            <table>
                                <tr>
                                <td>Prefixo: <input type="number" name="prefixo" placeholder="Digite um email válido" value={clienteData.prefixo} onChange={handleChanage}/></td>
                                <td>telefone: <input type="number" name="telefone" placeholder="Digite um Telefone válido" value={clienteData.telefone} onChange={handleChanage}/></td>
                                <td>E-Mail: <input type="email" name="email" placeholder="Digite um email válido" value={clienteData.email} onChange={handleChanage}/></td>
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

export default CLieteEditar;