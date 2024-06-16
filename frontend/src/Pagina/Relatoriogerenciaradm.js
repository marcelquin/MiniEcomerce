import Navadm from "../Componentes/NavAdm";
import '../Style/Conteudo.css';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Relaroriogerenciaadm() {

    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get("http://34.171.157.122:8080/entrega/ListarEntregas")
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
                    relatorios
                </div>
            </div>
            
    </>
    );
}

export default Relaroriogerenciaadm;