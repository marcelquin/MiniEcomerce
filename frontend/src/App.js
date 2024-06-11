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
import './Style/Global.css';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="background">

        <div className="boxGeral">
          <Header></Header>
          <section>
                  <Routes>
                            <Route path='/' element={<Home />}/>
                            <Route path='/Cliente' element={<CLiente/>} />
                            <Route path='/pedido' element={<Pedido/>} />
                            <Route path='/Produto' element={<Produto/>} />
                            <Route path='/adm' element={<HomeAdm/>} />
                            <Route path='/admproduto' element={<ProdutoAdm/>} />
                            <Route path='/admcliente' element={<ClienteAdm/>} />
                            <Route path='/admclientegerencia' element={<CLientegerenciaadm/>} />
                            <Route path='/admprodutogerencia' element={<Produtogerenciaadm/>} />
                            <Route path='/admpedidogerencia' element={<Pedidogerenciaadm/>} />
                  </Routes>        
          </section>
        
        </div>


    </div>
  );
}

export default App;
