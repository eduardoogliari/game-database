import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

function SearchBar() {
    const [searchParams, setSearchParams] = useState('');
    const navigate = useNavigate();

    function clickHandler( event ) {
        navigate({ pathname: '/search', search: `?q=${searchParams}` } );
    }

    function inputChanged(event) {
        setSearchParams( event.target.value );
    }

    return (
        <span className="search-bar">
            <input className="search-input" onChange={inputChanged} type="text" placeholder="Busque por um jogo"></input>
            <button className="search-button" onClick={clickHandler}>🔎</button>
        </span>
    );
};

export default SearchBar;