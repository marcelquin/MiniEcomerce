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
            

            <Link to={"adm"}>
            <div className="blocoOpcao">

                <div className="iconeadm"></div>
                <label>Adm</label>
            </div>
            </Link>
            
        </div>
        </>
    );
}

    export default Nav;