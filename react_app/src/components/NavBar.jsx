import SearchBar from './SearchBar';
import QuickAccess from './QuickAccess';
import Logo from './Logo';

function NavBar() {
    return (
        <div className="navbar-container">
            <div className="navbar-top">
                <Logo />
                <SearchBar />
            </div>
            <QuickAccess />
        </div>
    );
};

export default NavBar;