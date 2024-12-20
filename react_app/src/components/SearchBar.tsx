import {useNavigate, useSearchParams} from 'react-router-dom';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { removeExtraSpaces } from '../util';

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
        searchParams.set( 'q', queryParams );
        setSearchParams(searchParams);
        navigate(`/search?${searchParams}`);
    }

    function keyUpHandler( event : KeyboardEvent<HTMLInputElement> ) {
        if( event.key === 'Enter') {
            (event.target as HTMLElement).blur();
            submitQuery();
        }
    }

    function clickHandler() {
        submitQuery();
    }

    function inputChanged(event : ChangeEvent<HTMLInputElement>) {
        setQueryParams( event.target.value );
    }

    return (
        <span className="search-bar">
            <input className="search-input" name="search-bar" onKeyUp={keyUpHandler} onChange={inputChanged} type="text" placeholder="Digite o nome de um jogo" value={queryParams}></input>
            <button className="search-button" onClick={clickHandler}>
                <span>Pesquisar</span>
                <img src="/search-icon.png" alt=""></img>
            </button>
        </span>
    );
};

export default SearchBar;