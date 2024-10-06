import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GAME_API_BASE_URL from '../defs.js';
import SearchResultList from "../components/SearchResultList";
// import MultiSelect from "../components/MultiSelect";
import MultiCheckbox from "../components/MultiCheckbox";

function SearchPage(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [responseData, setResponseData] = useState([]);
    const [requestPending, setRequestPending] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState('');
    // const [sortBy, setSortBy] = useState('nome');
    // const [sortOrder, setSortOrder] = useState('asc');
    const queryParam = searchParams.get('q');
    const sortByParam = searchParams.get('sortBy');
    const sortOrderParam = searchParams.get('sortOrder');

    const empresaParam = searchParams.get('empresa');
    // const devParam = searchParams.get('desenvolvedora');
    // const pubParam = searchParams.get('publicadora');
    const generoParam = searchParams.get('genero');
    const plataformaParam = searchParams.get('plataforma');

    const [plataformasArray, setPlataformasArray] = useState([]);
    const [plataformasEscolhidas, setPlataformasEscolhidas] = useState([]);

    const [empresasArray, setEmpresasArray] = useState([]);
    const [empresaEscolhida, setEmpresaEscolhida] = useState('');

    const [generosArray, setGenerosArray] = useState([]);
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

        setPlataformasEscolhidas( plataformaParam ?? [] );
        setGenerosEscolhidos( generoParam ?? [] );
        setEmpresaEscolhida( empresaParam ?? '' );


        setHideFilterOptions( areSearchParamsEmpty() );


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

            // queryString += (devParam) ? `&desenvolvedora=${devParam}` : '';
            // queryString += (pubParam) ? `&publicadora=${pubParam}` : '';
            queryString += (empresaId) ? `&desenvolvedora=${empresaId}&publicadora=${empresaId}` : '';
            queryString += (generoParam) ? `&genero=${generoParam}` : '';
            queryString += (plataformaParam) ? `&plataforma=${plataformaParam}` : '';
        }

        fetch(queryString)
            .then((res) =>
                res.json()
            )
            .then((data) => {
                setResponseData(data);
                setRequestStatus("success");
            })
            .catch((err) => {
                console.error(err.message);
                setRequestStatus( "error");
                setErrorMessage(`Algo deu errado. Recarregue a página para tentar novamente.`);

            }).finally( () =>
                setRequestPending(false)
            );
    // }, [queryParam, sortByParam, sortOrderParam, searchParams, devParam, pubParam, generoParam, plataformaParam]);
    }, [queryParam, sortByParam, sortOrderParam, searchParams, empresasArray, empresaParam, generoParam, plataformaParam, areSearchParamsEmpty]);


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
        // searchParams.set( 'plataforma', arr );
        // setSearchParams(searchParams);
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
        // searchParams.set('genero', arr);
        // setSearchParams(searchParams);
    }

    function onAdvancedFilterButtonClicked() {
        setHideFilterOptions(!hideFilterOptions );
    }

    function onSearchFilterFormSubmit(event) {
        event.preventDefault();

        searchParams.set('genero', generosEscolhidos);
        searchParams.set('empresa', empresaEscolhida);
        searchParams.set( 'plataforma', plataformasEscolhidas );

        setSearchParams(searchParams);
    }

    function onLimparFiltroClicked(event) {
        searchParams.delete('genero');
        searchParams.delete('empresa');
        searchParams.delete('plataforma');

        setGenerosEscolhidos([]);
        setPlataformasEscolhidas([]);
        setEmpresaEscolhida('');

        setSearchParams(searchParams);
    }

    // function areSearchParamsEmpty() {
    //     console.log('--------------------------');
    //     console.log('genero: ' + searchParams.get('genero'));
    //     console.log('empresa: ' + searchParams.get('empresa'));
    //     console.log('plataforma: ' + searchParams.get('plataforma'));
    //     console.log('result: ' + (searchParams.get('genero') === null &&
    //         searchParams.get('empresa') === null &&
    //         searchParams.get('plataforma') === null));

    //     return (
    //         searchParams.get('genero') === null &&
    //         searchParams.get('empresa') === null &&
    //         searchParams.get('plataforma') === null
    //     );
    // }

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
                                            <input list="empresa-data" className="search-filter-empresa-input" type="input" onChange={onEmpresasChanged} value={empresaEscolhida}></input>
                                            <datalist id="empresa-data">
                                                {
                                                    (empresasArray)
                                                        ? empresasArray.map((item) => <option key={item.id} value={item.nome}>{item.nome}</option>)
                                                        : ''
                                                }
                                            </datalist>
                                        </fieldset>
                                        {/* <fieldset className="search-filter-fieldset">
                                            <legend>Publicadora:</legend>
                                            <input list="empresa-data" className="search-filter-empresa-input" type="input"></input>
                                        </fieldset>                                         */}

                                        <fieldset className="search-filter-fieldset">
                                            <legend>Plataformas:</legend>
                                            {/* <MultiSelect value={plataformaEscolhida} data={plataformasArray} onChange={onPlataformaChanged}></MultiSelect> */}
                                            <MultiCheckbox checkedValues={plataformasEscolhidas} data={plataformasArray} onChange={onPlataformaChanged}></MultiCheckbox>
                                        </fieldset>
                                        {/* <fieldset className="search-filter-fieldset">
                                            <legend>Empresas:</legend>
                                            <MultiCheckbox checkedValues={empresaEscolhida} data={empresasArray} onChange={onEmpresasChanged}></MultiCheckbox>
                                        </fieldset> */}
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
                                    <span className="search-result-quantidade">{responseData.length} resultado(s) encontrados</span>
                                </span>
                                <span className="search-info-right">
                                    {/* <label htmlFor="filtro-busca">Ordenação: </label> */}
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
                      </div>
            }
        </main>
    );
}

export default SearchPage;