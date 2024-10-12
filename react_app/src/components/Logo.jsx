import { Link } from "react-router-dom";


function Logo() {
    return (
        <Link to='./' style={{ color: 'inherit', textDecoration: 'inherit', width: 'fit-content' }}>
            <div className="logo">
                <img src="logo.png" alt="logo GameDB"></img>
                <span>GameDB</span>
            </div>
        </Link>
    );
};

export default Logo;