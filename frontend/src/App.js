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
import Fonecedoradm from './Pagina/Admin/Fornecedor/FornecedorAdm';
import FornecedorgrenciaAdm from './Pagina/Admin/Fornecedor/FornecedorgeremciaAdm';
import Entregagerenciaadm from './Pagina/Admin/Entrega/Entregagerenciaradm';
import './Style/Global.css';
import {Routes, Route} from 'react-router-dom'
import Fornecedorgerenciaadm from './Pagina/Admin/Fornecedor/FornecedorgeremciaAdm';
import Relaroriogerenciaadm from './Pagina/Admin/Relatorio/Relatoriogerenciaradm';
import ClienteEditar from './Pagina/Admin/Cliente/ClienteEditar'
import FornecedorEditar from './Pagina/Admin/Fornecedor/FornecedorEditar';
import ClienteEmpresaEditar from './Pagina/Admin/Cliente/ClienteEmpresaEditar'
import ProdutoEditar from './Pagina/Admin/Produto/ProdutoEditar';
import EmpresaAdm from './Pagina/Admin/Empresa/EmpresaAdm';
import EmpresagerenciaAdm from './Pagina/Admin/Empresa/EmpresageremciaAdm'
import EmpresaEditar from './Pagina/Admin/Empresa/EmpresaEditar'
import NovaVenda from './Pagina/Venda/NovaVenda';
import AdicionarItem from './Pagina/Venda/AdicionarItem';
import Logistica from './Pagina/Logistica/Logistica';
function App() {
  return (

        <div className="boxGeral">
          <Header></Header>

                  <Routes>
                            <Route path='/' element={<Home />}/>
                            <Route path='/Cliente' element={<CLiente/>} />
                            <Route path='/caixa' element={<Pedido/>} />
                            <Route path='/estoque' element={<Produto/>} />
                            <Route path='/novavenda' element={<NovaVenda/>} />
                            <Route path='/logistica' element={<Logistica/>} />

                            <Route path='/adm' element={<HomeAdm/>} />
                            <Route path='/admproduto' element={<ProdutoAdm/>} />
                            <Route path='/admcliente' element={<ClienteAdm/>} />                      
                            <Route path='/admfornecedor' element={<Fonecedoradm/>} />
                            <Route path='/admenpresa' element={<EmpresaAdm/>} />


                            <Route path='/admclientegerencia' element={<CLientegerenciaadm/>} />
                            <Route path='/admprodutogerencia' element={<Produtogerenciaadm/>} />
                            <Route path='/admpedidogerencia' element={<Pedidogerenciaadm/>} />
                            <Route path='/admfornecedorgerencia' element={<Fornecedorgerenciaadm/>} />
                            <Route path='/admentregagerencia' element={<Entregagerenciaadm/>} />
                            <Route path='/admrelatoriogerencia' element={<Relaroriogerenciaadm/>} />
                            <Route path='/admempresagerencia' element={<EmpresagerenciaAdm/>} />

                            <Route path='/clienteeditar/:id' element={<ClienteEditar/>} />
                            <Route path='/fornecedoreditar/:id' element={<FornecedorEditar/>} />
                            <Route path='/produtoeditar/:id' element={<ProdutoEditar/>} />
                            <Route path='/clienteempresa/:id' element={<ClienteEmpresaEditar/>} />
                            <Route path='/empresaeditar/:id' element={<EmpresaEditar/>} />
                            <Route path='/adicionaritem/:id' element={<AdicionarItem/>} />
                  </Routes>        

        </div>
  );
}

export default App;
