import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Nota.css';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function NotafiscalEditar() {
  const {id} = useParams()
  const baseUrl = "http://34.136.115.180:8080"
  //const baseUrl = "http://localhost:8080"
  const[idFornecedor,setidFornecedor] = ('')
  const[APIData, setAPIData] = useState([])
    const navigate = useNavigate();
    const [notaData, setnotaData] = useState({
            xml: "",
            valor: ""
      });

      useEffect(()=>{
        fetch(`${baseUrl}/notafiscal/BuscaNotaPorId?id=${id}`,
            {
                method:'GET',
                headers:{
                    'content-type': 'application/json',
                },
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setnotaData(data)
            })
            .catch(err => console.log(err))
    }, [id])

      const handleChanage = (e) => {
        setnotaData(prev=>({...prev,[e.target.name]:e.target.value}));
      }
  

      const handleClick=async (e)=>{
        try{
          fetch(`${baseUrl}/notafiscal/EditarNotaFiscal`, {
            method: 'PUT',
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            },    
            body: new URLSearchParams({
                'id': id,
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
                                    <td>Xml: <input type="text" name="xml" id="" value={notaData.xml} onChange={handleChanage}/></td>
                                    <td>Valor da Nota: <input type="number" name="valor" value={notaData.valor} onChange={handleChanage}/></td>                                    
                                </tr>
                                <tr>
                                {APIData.map((data, i) =>{
                                    return(
                                      <>
                                      <label><input type="checkbox" value={data.razaoSocial} onClick={(e) => {setidFornecedor(data.id)}}/>{data.razaoSocial}</label>
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
export default NotafiscalEditar;