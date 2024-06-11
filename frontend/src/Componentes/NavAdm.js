import '../Style/Conteudo.css';
import { Link } from 'react-router-dom';

function Navadm() {
    return (
        <>
        <div className="navAdmBlock">
            <Link to={"/admcliente"}><p>Cadastrar Cliente</p></Link>
            <Link to={"/admclientegerencia"}><p>Gerenciar Informações</p></Link>
        </div>
        <div className="navAdmBlock">
            <Link to={"/admproduto"}><p>Cadastrar Produtos</p></Link>
            <Link to={"/admprodutogerencia"}><p>Gerenciar Informações</p></Link>   
        </div>
        <div className="navAdmBlock">
            <Link to={"/admpedidogerencia"}><p>Gerenciar Informações</p></Link>  
        </div>
        </>
    )
}

export default Navadm;