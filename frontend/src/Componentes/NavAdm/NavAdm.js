import './NavAdm.css';
import '../../Style/Global.css'
import '../../Pagina/Admin/AdmGlobal.css'
import { Link } from 'react-router-dom';

function Navadm() {
    return (
        <>
        <div className='opcaoNavAdm'>    
        <Link to={"/"}><h1 className='title'>Home</h1></Link>
        </div>
        <div className='opcaoNavAdm'>        
            <h1 className='title'>Proprietário</h1>
                <Link to={"/admenpresa"}>
                <h1 className='subTitle'>Cadastrar</h1>
                </Link>
                <Link to={"/admempresagerencia"}>
                <h1 className='subTitle'>Gerenciar</h1>
                </Link>
         </div>
         <div className='opcaoNavAdm'>        
            <h1 className='title'>Cliente</h1>
                <Link to={"/admcliente"}>
                <h1 className='subTitle'>Cadastrar</h1>
                </Link>
                <Link to={"/admclientegerencia"}>
                <h1 className='subTitle'>Gerenciar</h1>
                </Link>
         </div>
         <div className='opcaoNavAdm'>        
            <h1 className='title'>Fornecedor</h1>
                <Link to={"/admfornecedor"}>
                <h1 className='subTitle'>Cadastrar</h1>
                </Link>
                <Link to={"/admfornecedorgerencia"}>
                <h1 className='subTitle'>Gerenciar</h1>
                </Link>
         </div>
         <div className='opcaoNavAdm'>        
            <h1 className='title'>Produtos</h1>
                <Link to={"/admproduto"}>
                <h1 className='subTitle'>Cadastrar</h1>
                </Link>
                <Link to={"/admprodutogerencia"}>
                <h1 className='subTitle'>Gerenciar</h1>
                </Link>
         </div>
         <div className='opcaoNavAdm'>        
            <h1 className='title'>Financeiro</h1>
                <Link to={"/admpedidogerencia"}>
                <h1 className='subTitle'>Gerenciar Vendas</h1>
                </Link>
                <Link to={"/admdebitos"}>
                <h1 className='subTitle'>Cadastrar Boletos</h1>
                </Link>
                <Link to={"/admentregagerencia"}>
                <h1 className='subTitle'>Gerenciar Logóstica</h1>
                </Link>
                <Link to={"/admrelatoriogerencia"}>
                <h1 className='subTitle'>Gerenciar Relatórios</h1>
                </Link>
         </div>
        </>
    )
}

export default Navadm;