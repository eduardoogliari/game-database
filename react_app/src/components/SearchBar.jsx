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
        // navigate({ pathname: '/search', search: `?q=${encodeURIComponent(queryParams)}` });
        searchParams.set( 'q', queryParams );
        setSearchParams(searchParams);
        // navigate(`/search?q=${encodeURIComponent(queryParams)}`);
        navigate(`/search?${searchParams}`);
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
            <input className="search-input" onKeyUp={keyUpHandler} onChange={inputChanged} type="text" placeholder="Digite o nome de um jogo" value={queryParams}></input>
            {/* <button className="search-button" onClick={clickHandler}><img src="search-icon.png" alt="s"></img></button> */}
            <button className="search-button" onClick={clickHandler}><span>Pesquisar</span></button>
        </span>
    );
};

export default SearchBar;