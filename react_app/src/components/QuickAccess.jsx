import { Link } from "react-router-dom";

function QuickAccess() {
    return (
        <div className="quick-access">
            <div></div>
            <ul>
                {/* <li><a href="#">Plataformas</a></li> */}
                <li><Link to="plataforma/">Plataformas</Link></li>
                <li><Link to="search/">Jogos</Link></li>
                <li><Link to="empresa/">Empresas</Link></li>
            </ul>
            <div></div>
        </div>
    );
};

export default QuickAccess;