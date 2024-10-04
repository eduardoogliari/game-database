import { useEffect, useState } from "react";
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
    const devParam = searchParams.get('desenvolvedora');
    const pubParam = searchParams.get('publicadora');
    const generoParam = searchParams.get('genero');
    const plataformaParam = searchParams.get('plataforma');

    const [plataformasArray, setPlataformasArray] = useState([]);
    const [plataformasEscolhidas, setPlataformasEscolhidas] = useState([]);

    const [empresasArray, setEmpresasArray] = useState([]);
    const [empresasEscolhidas, setEmpresasEscolhidas] = useState([]);

    const [generosArray, setGenerosArray] = useState([]);
    const [generosEscolhidos, setGenerosEscolhidos] = useState([]);

    const [hideFilterOptions, setHideFilterOptions] = useState(true);

    useEffect(() => {
        setLoadingMessage('');
        setTimeout(() => { setLoadingMessage("Aguarde...") }, 2000);

        setRequestPending(true);
        setErrorMessage('');
        setRequestStatus("pending");

        // let queryString = GAME_API_BASE_URL + '/jogos/?nome=' + queryParam;
        let queryString = GAME_API_BASE_URL + '/jogos/';

        // console.log(searchParams);
        // console.log(devParam);
        // console.log(pubParam);

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

            queryString += (devParam) ? `&desenvolvedora=${devParam}` : '';
            queryString += (pubParam) ? `&publicadora=${pubParam}` : '';
            queryString += (generoParam) ? `&generoParam=${generoParam}` : '';
            queryString += (plataformaParam) ? `&plataforma=${plataformaParam}` : '';
        }

        console.log('queryString: ' + queryString);

        // fetch(GAME_API_BASE_URL + '/jogos/?nome=' + queryParam + filtroParamOrdem + filtroOrdem + filtroDev + filtroPub)
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
    }, [queryParam, sortByParam, sortOrderParam, searchParams, devParam, pubParam, generoParam, plataformaParam]);


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

    // useEffect(() => {
    //     fetch(GAME_API_BASE_URL + '/generos')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const arr = data.map((item) => { return { "id": item.id, "nome": item.nome } });
    //             setGenerosArray(arr);
    //         })
    //         .catch((err) => console.error(err))
    // }, []);

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
        searchParams.set( 'plataforma', arr );
        setSearchParams(searchParams);
    }

    function onEmpresasChanged(event) {
        const id = parseInt(event.target.id);
        const selected = empresasEscolhidas.includes(id);
        let arr = [...empresasEscolhidas];

        if (selected) {
            arr = arr.filter((c) => c !== id);
        } else {
            arr.push(id);
        }
        setEmpresasEscolhidas(arr);
        searchParams.set('desenvolvedora', arr);
        searchParams.set('publicadora', arr);
        setSearchParams(searchParams);
    }

    function onAdvancedFilterButtonClicked() {
        setHideFilterOptions(!hideFilterOptions );
    }

    return (
        <main className="search-page-main">
            {
            (requestPending)
                ? <p>{loadingMessage}</p>
                : (requestStatus === "error")
                    ? <p>{errorMessage ?? "Erro desconhecido"}</p>
                    : <div>
                            <label  htmlFor="filtro-busca">Ordenação:</label>
                            <select value={sortByParam ?? 'nome'} onChange={onSortByChanged} >
                                {/* <option value="relevancia">Relevância</option> */}
                                <option value="nome">Nome</option>
                                <option value="data">Data</option>
                            </select>
                            <select value={sortOrderParam ?? 'asc'} onChange={onSortOrderChanged} >
                                <option value="asc">Crescente</option>
                                <option value="desc">Decrescente</option>
                            </select>

                            {/* <MultiSelect value={plataformaEscolhida} data={plataformasArray} onChange={onPlataformaChanged}></MultiSelect> */}

                            <div>
                                <button onClick={onAdvancedFilterButtonClicked}>[+ Opções de busca]</button>
                                <div hidden={hideFilterOptions}>
                                    <form className="search-filter-form">
                                        <fieldset>
                                            <legend>Plataformas:</legend>
                                            {/* <MultiSelect value={plataformaEscolhida} data={plataformasArray} onChange={onPlataformaChanged}></MultiSelect> */}
                                            <MultiCheckbox checkedValues={plataformasEscolhidas} data={plataformasArray} onChange={onPlataformaChanged}></MultiCheckbox>
                                        </fieldset>
                                        <fieldset>
                                            <legend>Empresas:</legend>
                                            <MultiCheckbox checkedValues={empresasEscolhidas} data={empresasArray} onChange={onEmpresasChanged}></MultiCheckbox>
                                        </fieldset>
                                        <fieldset>
                                            <legend>Gêneros:</legend>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>

                            <p className="search-result-quantidade">{responseData.length} resultado(s) encontrados</p>
                            <SearchResultList jogosArray={responseData}></SearchResultList>
                      </div>
            }
        </main>
    );
}

export default SearchPage;