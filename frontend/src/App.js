import Header from './Componentes/Header';
import Nav from './Componentes/Nav';
import Home from './Pagina/Home';
import CLiente from './Pagina/Cliente';
import Pedido from './Pagina/Pedido';
import Produto from './Pagina/Produto';
import HomeAdm from './Pagina/HomeAdm';
import ProdutoAdm from './Pagina/ProdutoAdm';
import ClienteAdm from './Pagina/ClienteAdm';
import CLientegerenciaadm from './Pagina/Clientegerenciaadm';
import Produtogerenciaadm from './Pagina/Produtogerenciaadm';
import Pedidogerenciaadm from './Pagina/Pedidogerenciaradm';
import Notafiscaladm from './Pagina/NotaFiscalAdm';
import Notafiscalgerenciaadm from './Pagina/NotaFiscalgeremciaAdm';
import Fonecedoradm from './Pagina/FornecedorAdm';
import FornecedorgrenciaAdm from './Pagina/FornecedorgeremciaAdm';
import './Style/Global.css';
import {Routes, Route} from 'react-router-dom'
import Fornecedorgerenciaadm from './Pagina/FornecedorgeremciaAdm';

function App() {
  return (
    <div className="background">

        <div className="boxGeral">
          <Header></Header>
          <section>
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
                  </Routes>        
          </section>
        
        </div>


    </div>
  );
}

export default App;
