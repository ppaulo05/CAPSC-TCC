import './Header.css';
import { ReactComponent as Logo } from '../../assets/images/logo-cimol.svg';


export function Header() {

    return (
        <div className="App">
            <div className="header-container">
                <Logo className="logo-cimol" />
                <h1>CAPSC - Correção Automática das Provas de Seleção do Cimol</h1>
            </div>
        </div>
    )
}

export default Header;