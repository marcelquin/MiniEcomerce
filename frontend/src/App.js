import Header from './Componentes/Header/Header';
import Nav from './Componentes/Nav/Nav';
import Home from './Pagina/Home/Home';
import CLiente from './Pagina/Cliente/Cliente';
import Pedido from './Pagina/Caixa/Pedido';
import Produto from './Pagina/Estoque/Produto';
import HomeAdm from './Pagina/Admin/Home/HomeAdm';
import ProdutoAdm from './Pagina/Admin/Produto/ProdutoAdm';
import ClienteAdm from './Pagina/Admin/Cliente/ClienteAdm';
import CLientegerenciaadm from './Pagina/Admin/Cliente/Clientegerenciaadm';
import Produtogerenciaadm from './Pagina/Admin/Produto/Produtogerenciaadm';
import Pedidogerenciaadm from './Pagina/Admin/Compras/Pedidogerenciaradm';
import Notafiscaladm from './Pagina/Admin/Nota/NotaFiscalAdm';
import Notafiscalgerenciaadm from './Pagina/Admin/Nota/NotaFiscalgeremciaAdm';
import Fonecedoradm from './Pagina/Admin/Fornecedor/FornecedorAdm';
import FornecedorgrenciaAdm from './Pagina/Admin/Fornecedor/FornecedorgeremciaAdm';
import Entregagerenciaadm from './Pagina/Admin/Entrega/Entregagerenciaradm';
import './Style/Global.css';
import {Routes, Route} from 'react-router-dom'
import Fornecedorgerenciaadm from './Pagina/Admin/Fornecedor/FornecedorgeremciaAdm';
import Relaroriogerenciaadm from './Pagina/Admin/Relatorio/Relatoriogerenciaradm';

function App() {
  return (

        <div className="boxGeral">
          <Header></Header>

                  <Routes>
                            <Route path='/' element={<Home />}/>
                            <Route path='/Cliente' element={<CLiente/>} />
                            <Route path='/caixa' element={<Pedido/>} />
                            <Route path='/estoque' element={<Produto/>} />
                            <Route path='/adm' element={<HomeAdm/>} />
                            <Route path='/admproduto' element={<ProdutoAdm/>} />
                            <Route path='/admcliente' element={<ClienteAdm/>} />
                            <Route path='/admnotafiscal' element={<Notafiscaladm/>} />
                            <Route path='/admfornecedor' element={<Fonecedoradm/>} />
                            <Route path='/admclientegerencia' element={<CLientegerenciaadm/>} />
                            <Route path='/admprodutogerencia' element={<Produtogerenciaadm/>} />
                            <Route path='/admpedidogerencia' element={<Pedidogerenciaadm/>} />
                            <Route path='/admfornecedorgerencia' element={<Fornecedorgerenciaadm/>} />
                            <Route path='/admnotagerencia' element={<Notafiscalgerenciaadm/>} />
                            <Route path='/admentregagerencia' element={<Entregagerenciaadm/>} />
                            <Route path='/admrelatoriogerencia' element={<Relaroriogerenciaadm/>} />
                          
                  </Routes>        

        </div>
  );
}

export default App;
