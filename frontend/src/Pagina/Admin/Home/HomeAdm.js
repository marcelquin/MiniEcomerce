import '../Adm.css';
import Navadm from '../../../Componentes/NavAdm/NavAdm';

function HomeAdm() {

    return(
    <>

        <div className="admBox">

        <div className="admNav"><Navadm></Navadm></div>
        <div className="admConteudo">
             <h3>total de vendas</h3>
             <h3> total de vendas do dia</h3> 
             <h3> notificações de estoque</h3>  
        </div>
        </div>
        

    </>
    );
}

export default HomeAdm;