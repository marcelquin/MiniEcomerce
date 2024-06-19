import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cliente.css';


function CLieteadm() {
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
                'email':clienteData.email,
                'profissao': clienteData.profissao,
                'salarioBruto': clienteData.salarioBruto,
                'salarioLiquido': clienteData.salarioLiquido
        })})
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
                    <div className="admConteudo">

                        <div className="formBloco">
                        <h3>Dados Pessoais:</h3>
                        <form>
                            <table>
                                <tr>
                                <td>Nome: <input type="text" name="nome" id="nome" onChange={handleChanage}/></td>
                                <td>Sobreome: <input type="text" name="sobrenome"  onChange={handleChanage}/></td>
                                <td>CPF: <input type="number" name="cpf" placeholder="Somente numeros"  onChange={handleChanage}/></td>
                                </tr>
                                <tr>
                                <td>Data de Nascimento: <input type="text" name="dataNascimento" placeholder="dd/mm/aaaa"  onChange={handleChanage}/></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="formBloco">
                        <h3>Endereço:</h3>
                        <form>
                            <table>
                                <tr>
                                <td>Logradouro: <input type="text" name="logradouro" placeholder="Digite o Nome da rua"  onChange={handleChanage}/></td>
                                <td>Numero: <input type="text" name="numero" placeholder="Digite o numero da casa"  onChange={handleChanage}/></td>
                                <td>Bairro: <input type="text" name="bairro" placeholder="Digite O Bairro"  onChange={handleChanage}/></td>
                                </tr>
                                <tr>
                                <td>Referência: <input type="text" name="referencia" placeholder="Digite um Ponto de referência"  onChange={handleChanage}/></td>
                                <td>CEP: <input type="number" name="cep" placeholder="Digite O Cep da cidade"  onChange={handleChanage}/></td>
                                <td>Cidade: <input type="text" name="cidade" placeholder="Digite a cidade"  onChange={handleChanage}/></td>
                                </tr>
                                <tr>
                                <td>Estado: <input type="text" name="estado" placeholder="Digite a sigla do estado"  onChange={handleChanage}/></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="formBloco">
                    <h3>Dados Profissionais</h3>
                        <form>
                            <table>
                                <tr>
                                <td>Profissão: <input type="text" name="profissao" placeholder="Digite a Profissão do cliente"  onChange={handleChanage}/></td>
                                <td>Salário Bruto: <input type="number" name="salarioBruto" placeholder="Digite o valor do salario bruto"  onChange={handleChanage}/></td>
                                <td>Salário Líquido: <input type="email" name="salarioLiquido" placeholder="Digite o valor do salario líquido"  onChange={handleChanage}/></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="formBloco">
                        <h3>Contato</h3>
                        <form>
                            <table>
                                <tr>
                                <td>Prefixo: <input type="number" name="prefixo" placeholder="Digite um email válido"  onChange={handleChanage}/></td>
                                <td>telefone: <input type="number" name="telefone" placeholder="Digite um Telefone válido"  onChange={handleChanage}/></td>
                                <td>E-Mail: <input type="email" name="email" placeholder="Digite um email válido"  onChange={handleChanage}/></td>
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