import { Link } from "react-router-dom";


function Logo() {
    return (
        <Link to='./' style={{ color: 'inherit', textDecoration: 'inherit', width: 'fit-content' }}>
            <div className="logo">
                <img src="logo.svg" alt="logo GameDB"></img>
                <p>GameDB</p>
            </div>
        </Link>
    );
};

export default Logo;