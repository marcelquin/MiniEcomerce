import '../Style/Header.css'
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <>
        <div className="blocoNav">
            
        <Link to={"/"}>
            <div className="blocoOpcao">

                <div className="iconeHome"></div>
                <label>Home</label>
            </div>
            </Link>

            <Link to={"/Cliente"}>
            <div className="blocoOpcao">

                <div className="iconeCLiente"></div>
                <label>CLIENTE</label>
            </div>
            </Link>
            <Link to={"/Produto"}>
            <div className="blocoOpcao">

                <div className="iconeProdutos"></div>
                <label>Produto</label>

            </div>
            </Link>
            <Link to={"pedido"}>
            <div className="blocoOpcao">

                <div className="iconePedido"></div>
                <label>Pedidos</label>
            </div>
            </Link>
            
        </div>
        </>
    );
}

    export default Nav;