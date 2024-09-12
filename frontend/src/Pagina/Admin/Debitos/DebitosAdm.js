import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useEffect, useState, } from 'react';
import '../AdmGlobal.css';
import './Debitos.css';
import { Link, useNavigate } from 'react-router-dom';

function DebitosAdm() {

    //const baseUrl = "http://34.67.211.119:8080"
    const baseUrl = "http://localhost:8080"
    const navigate = useNavigate();
    const[dadoPesquisa, setdadoPesquisa] = useState('')
    const[postData, setpostData]=useState({
        'empresa': "",
        'cnpj': "",
        'valorBoleto': "",
        'parcelas': 1,
        'diaVencimento': '',
        'carenciaPagamento': 0
    });
    const [boletos, setboletos] = useState([]);
    const [ListaFornecedor, setListaFornecedor] = useState([]);

    const pesquisa = dadoPesquisa.length > 0 ?
    boletos.filter(dados => dados.empresa.includes(dadoPesquisa)) :
    []

    useEffect(()=>{
        fetch(`${baseUrl}/debito/BuscarBoletosMensais`, 
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setboletos(data)
            })
            .catch(err => console.log(err))
    }, [])


    useEffect(()=>{
        fetch(`${baseUrl}/fornecedor/ListarFornecedor`, 
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setListaFornecedor(data)
            })
            .catch(err => console.log(err))
    }, [])
    //POST

    const handleChanage = (e) => {
        setpostData(prev=>({...prev,[e.target.name]:e.target.value}));
      }
        
      const handleClick=async (e)=>{
        try{
          fetch(`${baseUrl}/debito/NovoLancamentoDebito`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'empresa': postData.empresa,
                'cnpj': postData.cnpj,
                'valorBoleto': postData.valorBoleto,
                'parcelas': postData.parcelas,
                'diaVencimento': postData.diaVencimento,
                'carenciaPagamento': postData.carenciaPagamento
        })})
        .then(navigate("/admdebitos"))     
        setpostData({
            'empresa': "",
            'cnpj': "",
            'valorBoleto': "",
            'parcelas': 1,
            'diaVencimento': "",
            'carenciaPagamento': 0
        })
        }catch (err){
          console.log("erro")
        }
      }

      
    return(<>

        <div className="ndBackground">
            <div className="ndBoxSection">

                <div className="ndBoxNavAdm"><Navadm></Navadm></div>

                <div className="ndBoxSectionIn">
                      
                    <form>
                            <table>
                                <tr>
                                    <td>Empresa:<br/>
                                    <input type="text" name="empresa" placeholder="Razão Social da empresa" onChange={handleChanage} />
                                    </td>
                                    <td>CNPJ:<br/>
                                    <input type="text" name="cnpj" placeholder="cnpj da empresa" onChange={handleChanage}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dia Vencimento:<br/>
                                    <input type="number" name='diaVencimento' placeholder="Valor total do boleto" onChange={handleChanage}/>
                                    </td>
                                    <td>Valor Total:<br/>
                                    <input type="number" name="valorBoleto" placeholder="Valor total do boleto" onChange={handleChanage}/>
                                    </td>
                                    <td>Parcelas:<br/>
                                    <input type="number" name="parcelas" placeholder="Numero de parcelas do boleto" onChange={handleChanage}/>
                                    </td>
                                    <td>Carencia de Pagamento:<br/>
                                    <input type="number" name="carenciaPagamento" placeholder="Inicio de Pagamento em" onChange={handleChanage}/>
                                    </td>      
                                </tr>
                                <tr>
                                    <td><input type="submit" value="Salvar" onClick={handleClick}/></td>
                                </tr>
                            </table>
                        </form>    

                </div>
            </div>
        </div> 
    </>)
}

export default DebitosAdm;