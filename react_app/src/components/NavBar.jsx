import SearchBar from './SearchBar';
import QuickAccess from './QuickAccess';
import Logo from './Logo';

function NavBar() {
    return (
        <div className="navbar-container">
            <div className="navbar-row-top">
                <div></div>
                <div className="navbar-top">
                    <Logo />
                    <SearchBar />
                </div>
                <div></div>
            </div>
            <div className="navbar-row-bottom">
                <div></div>
                <QuickAccess />
                <div></div>
            </div>
        </div>
    );
};

export default NavBar;