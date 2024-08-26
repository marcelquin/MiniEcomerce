import { Link } from 'react-router-dom';
import '../Header.css';
import Nav from '../Nav/Nav'; 

function Header() {
    return (
        <div className="boxHeader">

            <div className="logo"></div>

            <div className='boxicone'>
                <div className='boxAdmLogin'><Link to={"/adm"}>Login</Link></div>
               
            </div>
            
        </div>
    );
}

    export default Header;