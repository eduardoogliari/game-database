import {useNavigate, useSearchParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import removeExtraSpaces from '../util';

function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [queryParams, setQueryParams] = useState('');
    const navigate = useNavigate();
    const q = searchParams.get('q');

    useEffect( () => {
        setQueryParams( q ?? '' );
    }, [q]);

    function submitQuery() {
        setQueryParams(removeExtraSpaces(queryParams));
        navigate({ pathname: '/search', search: `?q=${encodeURIComponent(queryParams)}` });
    }

    function keyUpHandler( event ) {
        if( event.key === 'Enter') {
            event.target.blur();
            submitQuery();
        }
    }

    function clickHandler( event ) {
        submitQuery();
    }

    function inputChanged(event) {
        setQueryParams( event.target.value );
    }

    return (
        <span className="search-bar">
            <input className="search-input" onKeyUp={keyUpHandler} onChange={inputChanged} type="text" placeholder="Busque por um jogo" value={queryParams}></input>
            <button className="search-button" onClick={clickHandler}>🔎</button>
        </span>
    );
};

export default SearchBar;