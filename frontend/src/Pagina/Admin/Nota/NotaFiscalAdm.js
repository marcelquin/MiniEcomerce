import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Nota.css';
import Axios from 'axios';

function Notafiscaladm() {

  const baseUrl = "http://34.136.115.180:8080"
  //const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData] = useState([])
    const[idFornecedor,setidFornecedor] = useState('')
    const navigate = useNavigate();
    const [notaData, setnotaData] = useState({
            xml: "",
            valor: ""
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
                'fornecedorId': idFornecedor
        })})
        .then(navigate("/adm")) 
        setnotaData({
            xml: "",
            valor: "",
            cnpj: ""
        })
        }catch (err){
          console.log("erro")
        }
      }

      useEffect(() => {
        Axios
          .get(`${baseUrl}/fornecedor/ListarFornecedor`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);

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
                                </tr>
                                <tr>
                                  <h3>Selecione a Empresa</h3>
                                  {APIData.map((data, i) =>{
                                    return(
                                      <>
                                      <label><input type="checkbox" value={data.id} onClick={(e) => {setidFornecedor(data.id)}}/>{data.razaoSocial}</label>
                                      </>
                                    )
                                  })}
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