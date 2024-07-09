import '../Header.css'
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

            <Link to={"/novavenda"}>
            <div className="blocoOpcao">

                <div className="iconeVenda"></div>
                <label>Nova Venda</label>
            </div>
            </Link>

            <Link to={"/caixa"}>
            <div className="blocoOpcao">
        
                <div className="iconecaixa"></div>
                <label>Caixa</label>
            </div>
            </Link>

            <Link  to={"/Cliente"}>
            <div className="blocoOpcao">

                <div className="iconeCLiente"></div>
                <label>CLIENTE</label>
            </div>
            </Link>
            <Link to={"/estoque"}>
            <div className="blocoOpcao">

                <div className="iconeProdutos"></div>
                <label>Estoque</label>

            </div>
            </Link>
            <Link to={"/logistica"}>
            <div className="blocoOpcao">

                <div className="iconeLogistica"></div>
                <label>Logistica</label>

            </div>
            </Link>
            
        </div>
        </>
    );
}

    export default Nav;