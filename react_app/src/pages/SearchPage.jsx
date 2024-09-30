import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import GAME_API_BASE_URL from '../defs.js';
import removeExtraSpaces from '../util.js';
import SearchResultList from "../components/SearchResultList";

function SearchPage(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [responseData, setResponseData] = useState([]);
    const [requestPending, setRequestPending] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState('');
    const [paramOrdenacao, setParamOrdenacao] = useState('nome');
    const [ordenacao, setOrdenacao] = useState('crescente');
    const q = searchParams.get('q');

    useEffect(() => {
        setLoadingMessage('');
        setTimeout(() => { setLoadingMessage("Aguarde...") }, 2000);

        setRequestPending(true);
        setErrorMessage('');
        setRequestStatus("pending");

        let filtroParamOrdem = '';
        switch (paramOrdenacao) {
            case "nome":
                filtroParamOrdem = '&sortBy=nome';
                break;
            case "data":
                filtroParamOrdem = '&sortBy=data_lancamento';
                break;
            default:
                break;
        }

        let filtroOrdem = '';
        switch (ordenacao) {
            case "crescente":
                filtroOrdem = '&sortOrder=asc';
                break;
            case "decrescente":
                filtroOrdem = '&sortOrder=desc';
                break;
            default:
                break;
        }

        // const t = removeExtraSpaces(q);
        // const arr = t.split(' ');
        // console.log(arr);

        fetch(GAME_API_BASE_URL + '/jogos/?nome=' + q + filtroParamOrdem + filtroOrdem)
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
    }, [q, paramOrdenacao, ordenacao]);

    // useEffect(() => {
    //     setTimeout( () => {setLoadingMessage("Aguarde...")}, 2000 );
    // }, []);

    // TODO: Retornar do SQL a quantidade total de linhas/items
    // TODO: Página atual e quantidade total de páginas
    // TODO: Filtro de busca (plataforma, genero)
    // TODO: Ordenação de resultados (ano, alfabética, crescente e decrescente)

    function onSelectParamOrdenacaoChanged(event) {
        setParamOrdenacao(event.target.value);
    }

    function onSelectOrdenacaoChanged(event) {
        setOrdenacao(event.target.value);
    }

    return (
        <main className="search-page-main">
            {
            (requestPending)
                ? <p>{loadingMessage}</p>
                : (requestStatus === "error")
                    ? <p>{errorMessage ?? "Erro desconhecido"}</p>
                    : <div>
                            <label for="filtro-busca">Ordenação:</label>
                            <select onChange={onSelectParamOrdenacaoChanged} >
                                {/* <option value="relevancia">Relevância</option> */}
                                    <option selected={(paramOrdenacao === "nome")} value="nome">Nome</option>
                                    <option selected={(paramOrdenacao === "data")} value="data">Data</option>
                            </select>
                            <select onChange={onSelectOrdenacaoChanged} >
                                <option selected={(ordenacao === "crescente")} value="crescente">Crescente</option>
                                <option selected={(ordenacao === "decrescente")} value="decrescente">Decrescente</option>
                            </select>
                            <p className="search-result-quantidade">{responseData.length} resultado(s) encontrados</p>
                            <SearchResultList jogosArray={responseData}></SearchResultList>
                      </div>
            }
        </main>
    );
}

export default SearchPage;