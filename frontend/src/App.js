import Header from './Componentes/Header';
import Nav from './Componentes/Nav';
import Home from './Pagina/Home';
import CLiente from './Pagina/Cliente';
import Pedido from './Pagina/Pedido';
import Produto from './Pagina/Produto';
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
                  </Routes>
              
                
          </section>
        
        </div>

    </div>
  );
}

export default App;
