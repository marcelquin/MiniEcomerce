import '../Style/Header.css';
import Nav from './Nav'; 

function Header() {
    return (
        <div className="boxHeader">

            <div className="logo"></div>

            <Nav></Nav>
        </div>
    );
}

    export default Header;