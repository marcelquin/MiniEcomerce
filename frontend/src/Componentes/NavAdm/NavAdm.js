import './NavAdm.css';
import { Link } from 'react-router-dom';

function Navadm() {
    return (
        <>

<div className="navAdmBlock">
        <span className="title">Cliente</span>    
        <table>
            <tr>
                <td><Link to={"/admcliente"}><span>Cadastrar</span></Link></td>
            </tr>
            <tr>
                <td><Link to={"/admclientegerencia"}><span>Gerenciar</span></Link></td>
            </tr>
            <br/>
            <span className="title">Fornecedor</span> 
            <tr>
                <td><Link to={"/admfornecedor"}><span>Cadastrar</span></Link></td>
            </tr>
            <tr>
                <td> <Link to={"/admfornecedorgerencia"}><span>Gerenciar</span></Link>  </td>
            </tr>
            <br/>
            <span className="title">Produtos</span> 
            <tr>
                <td><Link to={"/admproduto"}><span>Cadastrar</span></Link></td>
            </tr>
            <tr>
                <td> <Link to={"/admprodutogerencia"}><span>Gerenciar</span></Link>  </td>
            </tr>
            <br/>
            <span className="title">Compras</span> 
            <tr>
                <td><Link to={"/admpedidogerencia"}><span>Gerenciar Compras</span></Link></td>
            </tr>
            <tr>
                <td> <Link to={"/admentregagerencia"}><span>Gerenciar Entregas</span></Link></td>
            </tr>
            <tr>
                <td> <Link to={"/admrelatoriogerencia"}><span>Gerneciar Relatórios</span></Link></td>
            </tr>
        </table>
        </div>
        </>
    )
}

export default Navadm;