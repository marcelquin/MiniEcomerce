import Navadm from "../../../Componentes/NavAdm/NavAdm";
import React, { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Empresa.css';
import '../AdmGlobal.css';
import Axios from 'axios';

function Empresagerenciaadm() {
    const baseUrl = "http://34.67.211.119:8080"
    //const baseUrl = "http://localhost:8080"
    const[APIData, setAPIData]= useState([]);

    useEffect(() => {
      Axios
        .get(`${baseUrl}/empresa/ListarEmpresas`)
        .then((response) => { setAPIData(response.data)}) 
        .catch((err) => {
          console.error("ops! ocorreu um erro" + err);
        });
    }, []);


    
    return(
        <>

          <div className="ndBackground">
            <div className="ndBoxSection">

                <div className="ndBoxNavAdm"><Navadm></Navadm></div>

                <div className="ndBoxSectionIn">


                {APIData.map((data, i)=>{
                      return(<>
                        <div className='cartaoProprietario'>
                
                        <div className='info'>
                          <div className='nome'>
                              <h4>{data.nome}</h4>
                              {data.cnpj}
                          </div>
                          <div className='infoGeral'>
                            <div className='blocoInfo'> 
                                <div className='topico topicoTelefone'></div>
                                <div className='texto'><span>({data.contato.prefixo}) {data.contato.telefone}</span></div>
                            </div> 
                            <div className='blocoInfo'>
                                <div className='topico topicoLocalizacao'></div>
                                <div className='texto'><span>{data.endereco.logradouro}, {data.endereco.numero}, {data.endereco.bairro}, {data.endereco.referencia}, {data.endereco.cep}, {data.endereco.cidade}, {data.endereco.estado}</span></div>
                            </div> 
                            <div className='blocoInfo'>
                                <div className='topico topicoEmail'></div>
                                <div className='texto'><span>{data.contato.email}</span></div>
                            </div> 
                                                 
                          </div>
                        </div>
                        <div className='destaque'>
                          <h2>{data.razaoSocial}</h2> 
                          <span>{data.areaAtuacao}</span>
                        </div>
                        <span className='btnEditar'><Link to={`/empresaeditar/${data.id}`}>Editar Informações</Link></span>
                        </div>
                      
                      </>)
                    })}


                </div>
            </div>
          </div>
        </>
    )
}
export default Empresagerenciaadm;