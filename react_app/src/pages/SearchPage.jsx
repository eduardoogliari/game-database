import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import GAME_API_BASE_URL from '../defs.js';
import SearchResultList from "../components/SearchResultList";

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
    const devParam = searchParams.get('dev');
    const pubParam = searchParams.get('pub');
    const generoParam = searchParams.get('genero');
    const plataformaParam = searchParams.get('plataforma');

    useEffect(() => {
        setLoadingMessage('');
        setTimeout(() => { setLoadingMessage("Aguarde...") }, 2000);

        setRequestPending(true);
        setErrorMessage('');
        setRequestStatus("pending");

        let queryString = GAME_API_BASE_URL + '/jogos/?nome=' + queryParam;

        // let filtroParamOrdem = '';
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

        // let filtroOrdem = '';
        switch (sortByParam) {
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
    }, [queryParam, sortByParam, sortOrderParam, devParam, pubParam, generoParam, plataformaParam]);

    // useEffect(() => {
    //     setTimeout( () => {setLoadingMessage("Aguarde...")}, 2000 );
    // }, []);

    // TODO: Retornar do SQL a quantidade total de linhas/items
    // TODO: Página atual e quantidade total de páginas
    // TODO: Filtro de busca (plataforma, genero)
    // TODO: Ordenação de resultados (ano, alfabética, crescente e decrescente)

    function onSortByChanged(event) {
        // setSortBy(event.target.value);

        searchParams.set('sortBy', event.target.value);
        setSearchParams(searchParams);
    }

    function onSortOrderChanged(event) {
        // setSortOrder(event.target.value);

        searchParams.set('sortOrder', event.target.value);
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
                            <p className="search-result-quantidade">{responseData.length} resultado(s) encontrados</p>
                            <SearchResultList jogosArray={responseData}></SearchResultList>
                      </div>
            }
        </main>
    );
}

export default SearchPage;