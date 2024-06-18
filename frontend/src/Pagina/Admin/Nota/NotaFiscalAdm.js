import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nota.css';


function Notafiscaladm() {

    const baseUrl = "http://34.171.157.122:8080"

    const navigate = useNavigate();
    const [notaData, setnotaData] = useState({
            xml: "",
            valor: "",
            cnpj: ""
      });

      const handleChanage = (e) => {
        setnotaData(prev=>({...prev,[e.target.name]:e.target.value}));
      }
  

      const handleClick=async (e)=>{
        try{
          fetch(`${baseUrl}/notafiscal/NovaNotaFiscal`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'xml': notaData.xml,
                'valor': notaData.valor,
                'cnpj': notaData.cnpj
        })})
        setnotaData({
            xml: "",
            valor: "",
            cnpj: ""
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

                    <h3>Dados da nota:</h3>

                    <form>

                        <table>
                                <tr>
                                    <td>Xml: <input type="text" name="xml" id="" onChange={handleChanage}/></td>
                                    <td>Valor da Nota: <input type="number" name="valor"  onChange={handleChanage}/></td>                                    
                                    <td>CNPJ da empresa: <input type="text" name="cnpj" placeholder="Somente numeros"  onChange={handleChanage}/></td>
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
export default Notafiscaladm;