import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import GAME_API_BASE_URL from '../defs.js';
import SearchResultList from "../components/SearchResultList";
import MultiCheckbox from "../components/MultiCheckbox";
// import PaginationControl from "../components/PaginationControl";

function SearchPage(props) {
    const [searchParams, setSearchParams]     = useSearchParams();
    const [responseData, setResponseData]     = useState([]);
    const [requestPending, setRequestPending] = useState(true);
    const [errorMessage, setErrorMessage]     = useState('');
    const [loadingMessage, setLoadingMessage] = useState('');
    const [requestStatus, setRequestStatus]   = useState('');
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [totalPages, setTotalPages]         = useState(0);
    const [pageSize, setPageSize]             = useState(0);
    const [pageIndex, setPageIndex]           = useState(0);

    const queryParam                          = searchParams.get('q');
    const sortByParam                         = searchParams.get('sortBy');
    const sortOrderParam                      = searchParams.get('sortOrder');
    const paginaIndexParam                    = searchParams.get('paginaIndex');

    const empresaParam    = searchParams.get('empresa');
    const generoParam     = searchParams.get('genero');
    const plataformaParam = searchParams.get('plataforma');

    const [plataformasArray, setPlataformasArray]           = useState([]);
    const [plataformasEscolhidas, setPlataformasEscolhidas] = useState([]);

    const [empresasArray, setEmpresasArray]       = useState([]);
    const [empresaEscolhida, setEmpresaEscolhida] = useState('');

    const [generosArray, setGenerosArray]           = useState([]);
    const [generosEscolhidos, setGenerosEscolhidos] = useState([]);

    const [hideFilterOptions, setHideFilterOptions] = useState(true);

    const areSearchParamsEmpty = useCallback(() => {
        return (
            searchParams.get('genero') === null &&
            searchParams.get('empresa') === null &&
            searchParams.get('plataforma') === null
        );
    }, [searchParams]);


    useEffect(() => {
        setLoadingMessage('');
        setTimeout(() => { setLoadingMessage("Aguarde...") }, 2000);

        setRequestPending(true);
        setErrorMessage('');
        setRequestStatus("pending");

        setPlataformasEscolhidas( plataformaParam ? plataformaParam.split(',').map(Number) : [] );
        setGenerosEscolhidos(generoParam ? generoParam.split(',').map(Number) : [] );
        setEmpresaEscolhida( empresaParam ?? '' );

        let queryString = GAME_API_BASE_URL + '/jogos/';

        if ( searchParams.size > 0 ) {
            queryString += '?';

            queryString += queryParam ? `nome=${queryParam}` : '';

            switch (sortByParam) {
                case "nome":
                    queryString += '&sortBy=nome';
                    break;
                case "data":
                    queryString += '&sortBy=data_lancamento';
                    break;
                default:
                    break;
            }

            switch (sortOrderParam) {
                case "asc":
                    queryString += '&sortOrder=asc';
                    break;
                case "desc":
                    queryString += '&sortOrder=desc';
                    break;
                default:
                    break;
            }

            const empresaId = empresasArray.find((e) => e.nome === empresaParam)?.id;
            queryString += (empresaId) ? `&desenvolvedora=${empresaId}&publicadora=${empresaId}` : '';
            queryString += (generoParam) ? `&genero=${generoParam}` : '';
            queryString += (plataformaParam) ? `&plataforma=${plataformaParam}` : '';
            queryString += (paginaIndexParam) ? `&pagina=${paginaIndexParam}` : '';
        }


        fetch(queryString)
            .then((res) => {
                const totalItemCount = res.headers.get('Total-Item-Count');
                const pageCount      = res.headers.get('Total-Pages');
                const pageSize       = res.headers.get('Page-Size');
                const pageIndex      = res.headers.get('Page-Index');

                setTotalItemCount( parseInt(totalItemCount) ?? 0);
                setTotalPages(parseInt(pageCount) ?? 1);
                setPageSize(parseInt(pageSize) ?? 0);
                setPageIndex(parseInt(pageIndex) ?? 1);

                // searchParams.set('paginaIndex', parseInt(pageIndex) ?? 1);
                // setSearchParams(searchParams);

                return res.json();
            })
            .then((data) => {
                setResponseData(data);
                setRequestStatus("success");
            })
            .catch((err) => {
                console.error(err);
                setRequestStatus( "error");
                setErrorMessage(`Algo deu errado. Recarregue a página para tentar novamente.`);

            }).finally( () =>
                setRequestPending(false)
            );
    }, [queryParam, sortByParam, sortOrderParam, searchParams, paginaIndexParam, empresasArray, empresaParam, generoParam, plataformaParam, areSearchParamsEmpty]);


    useEffect(() => {
        fetch( GAME_API_BASE_URL + '/plataformas' )
            .then( (res) => res.json() )
            .then((data) => {
                const arr = data.map( (item) => { return {"id" : item.id, "nome": item.nome_popular} } );
                setPlataformasArray(arr);
            })
            .catch( (err) => console.error(err) )
    }, []);

    useEffect(() => {
        fetch(GAME_API_BASE_URL + '/empresas')
            .then((res) => res.json())
            .then((data) => {
                const arr = data.map((item) => { return { "id": item.id, "nome": item.nome } });
                setEmpresasArray(arr);
            })
            .catch((err) => console.error(err))
    }, []);

    useEffect(() => {
        fetch(GAME_API_BASE_URL + '/generos')
            .then((res) => res.json())
            .then((data) => {
                const arr = data.map((item) => { return { "id": item.id, "nome": item.nome } });
                setGenerosArray(arr);
            })
            .catch((err) => console.error(err))
    }, []);

    // TODO: Retornar do SQL a quantidade total de linhas/items
    // TODO: Página atual e quantidade total de páginas

    function onSortByChanged(event) {
        searchParams.set('sortBy', event.target.value);
        setSearchParams(searchParams);
    }

    function onSortOrderChanged(event) {
        searchParams.set('sortOrder', event.target.value);
        setSearchParams(searchParams);
    }

    function onPlataformaChanged(event) {
        const plataformaId = parseInt(event.target.id);
        const selected = plataformasEscolhidas.includes(plataformaId);
        let arr = [...plataformasEscolhidas];

        if (selected) {
            arr = arr.filter((c) => c !== plataformaId);
        } else {
            arr.push(plataformaId);
        }
        setPlataformasEscolhidas(arr);
    }

    function onEmpresasChanged(event) {
        setEmpresaEscolhida( event.target.value );
    }

    function onGenerosChanged(event) {
        const id = parseInt(event.target.id);
        const selected = generosEscolhidos.includes(id);
        let arr = [...generosEscolhidos];

        if (selected) {
            arr = arr.filter((c) => c !== id);
        } else {
            arr.push(id);
        }
        setGenerosEscolhidos(arr);
    }

    function onAdvancedFilterButtonClicked() {
        setHideFilterOptions(!hideFilterOptions );
    }

    function onSearchFilterFormSubmit(event) {
        event.preventDefault();

        searchParams.set('genero', generosEscolhidos);
        searchParams.set('empresa', empresaEscolhida);
        searchParams.set( 'plataforma', plataformasEscolhidas );

        setHideFilterOptions(true);
        setSearchParams(searchParams);
    }

    function onLimparFiltroClicked(event) {
        searchParams.delete('genero');
        searchParams.delete('empresa');
        searchParams.delete('plataforma');

        setGenerosEscolhidos([]);
        setPlataformasEscolhidas([]);
        setEmpresaEscolhida('');
        setHideFilterOptions(true);

        setSearchParams(searchParams);
    }

    function onNomeEmpresaBlur( event ) {
        const empresaNome = event.target.value;
        if( !empresasArray.some( (e) => e.nome === empresaNome ) ) {
            event.target.value = '';
        }
    }

    function onPaginationPrevButtonClick(event) {
        const page = Math.max( 1, pageIndex-1 );
        searchParams.set('paginaIndex', page )
        setSearchParams(searchParams);
    }

    function onPaginationNextButtonClick(event) {
        const page = Math.min( totalPages, pageIndex + 1);
        searchParams.set('paginaIndex', page)
        setSearchParams(searchParams);
    }

    return (
        <main className="search-page-main">
            {
            (requestPending)
                ? <p>{loadingMessage}</p>
                : (requestStatus === "error")
                    ? <p>{errorMessage ?? "Erro desconhecido"}</p>
                    : <div>
                            <div className="search-filter-div">
                                <div className="search-filter-display-buttons">
                                    <button className="botao-exibir-filtro" onClick={onAdvancedFilterButtonClicked}>[ {(hideFilterOptions) ? '+' : '-'} ] Opções avançadas de busca</button>
                                    {(!areSearchParamsEmpty())
                                        ? <button className='botao-limpar-filtro' onClick={onLimparFiltroClicked}>[x] Limpar filtros</button>
                                        : <></>
                                    }
                                </div>
                                <div className="search-filter-container" hidden={hideFilterOptions}>
                                    <form className="search-filter-form" onSubmit={onSearchFilterFormSubmit}>
                                        <fieldset className="search-filter-fieldset">
                                            <legend>Empresa:</legend>
                                            <input list="empresa-data" className="search-filter-empresa-input" type="input" onChange={onEmpresasChanged} onBlur={onNomeEmpresaBlur} value={empresaEscolhida}></input>
                                            <datalist id="empresa-data">
                                                {
                                                    (empresasArray)
                                                        ? empresasArray.map((item) => <option key={item.id} value={item.nome}>{item.nome}</option>)
                                                        : ''
                                                }
                                            </datalist>
                                        </fieldset>

                                        <fieldset className="search-filter-fieldset">
                                            <legend>Plataformas:</legend>
                                            <MultiCheckbox checkedValues={plataformasEscolhidas} data={plataformasArray} onChange={onPlataformaChanged}></MultiCheckbox>
                                        </fieldset>

                                        <fieldset className="search-filter-fieldset">
                                            <MultiCheckbox checkedValues={generosEscolhidos} data={generosArray} onChange={onGenerosChanged}></MultiCheckbox>
                                            <legend>Gêneros:</legend>
                                        </fieldset>
                                        <input className="search-filter-submit-button" type="submit" value="Aplicar filtros"></input>
                                    </form>
                                </div>
                            </div>

                            <div className="search-info">
                                <span className="search-info-left">
                                    <span className="search-result-quantidade">{totalItemCount} resultado(s) encontrados</span>
                                </span>
                                <span className="search-info-right">
                                    {/* <label>Ordenação:</label> */}
                                    <select value={sortByParam ?? 'nome'} onChange={onSortByChanged} >
                                        {/* <option value="relevancia">Relevância</option> */}
                                        <option value="nome">Nome</option>
                                        <option value="data">Data</option>
                                    </select>
                                    <select value={sortOrderParam ?? 'asc'} onChange={onSortOrderChanged} >
                                        <option value="asc">Crescente</option>
                                        <option value="desc">Decrescente</option>
                                    </select>
                                </span>
                            </div>

                            <SearchResultList jogosArray={responseData}></SearchResultList>

                            <div className="pagination-control">
                                <button onClick={onPaginationPrevButtonClick} disabled={pageIndex <= 1} >Anterior</button>
                                <span>[Página {pageIndex} de {totalPages}]</span>
                                <button onClick={onPaginationNextButtonClick} disabled={pageIndex >= totalPages}>Próxima</button>
                            </div>
                      </div>
            }
        </main>
    );
}

export default SearchPage;