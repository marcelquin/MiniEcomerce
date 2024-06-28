import Navadm from "../../../Componentes/NavAdm/NavAdm";
import './Relatorio.css';


function Relaroriogerenciaadm() {
  /*
  const baseUrl = "http://34.136.115.180:8080"
  //const baseUrl = "http://localhost:8080"
    const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        Axios
          .get(`${baseUrl}/entrega/ListarEntregas`)
          .then((response) => { setAPIData(response.data)})
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      }, []);
    */
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