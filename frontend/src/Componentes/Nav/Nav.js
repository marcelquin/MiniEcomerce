import '../../Style/Global.css'
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <>
        <Link to={"/"}>
        <div className='ndNavOption'>
            <h1>Home</h1>
        </div>
        </Link>
        <Link to={"/novavenda"}>
        <div className='ndNavOption'>
            <h1>Nova Venda</h1>
        </div>
        </Link>
        <Link to={"/caixa"}>
        <div className='ndNavOption'>
            <h1>Caixa</h1>
        </div>
        </Link>
        <Link to={"/Cliente"}>
        <div className='ndNavOption'>
            <h1>Clientes</h1>
        </div>
        </Link>
        <Link to={"/estoque"}>
        <div className='ndNavOption'>
            <h1>Estoque</h1>
        </div>
        </Link>
        <Link to={"/logistica"}>
        <div className='ndNavOption'>
            <h1>Logistica</h1>
        </div>
        </Link>
        </>
    );
}

    export default Nav;