import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import GAME_API_BASE_URL from '../defs.js';
import removeExtraSpaces from '../util.js';
import SearchResultList from "../components/SearchResultList.js";

function SearchPage(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [responseData, setResponseData] = useState([]);
    const [requestPending, setRequestPending] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingMessage, setLoadingMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState('');
    const q = searchParams.get('q');

    useEffect(() => {
        setRequestPending(true);
        setErrorMessage('');
        setRequestStatus("pending");

        const t = removeExtraSpaces(q);
        const arr = t.split(' ');
        console.log(arr);

        fetch(GAME_API_BASE_URL + '/jogos/?nome=' + q)
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
    }, [q]);

    useEffect(() => {
        setTimeout( () => {setLoadingMessage("Aguarde...")}, 2000 );
    }, []);

    // TODO: Retornar do SQL a quantidade total de linhas/items
    // TODO: Página atual e quantidade total de páginas
    // TODO: Filtro de busca (plataforma, genero)
    // TODO: Ordenação de resultados (ano, alfabética, crescente e decrescente)

    return (
        <main className="search-page-main">
            {
            (requestPending)
                ? <p>{loadingMessage}</p>
                : (requestStatus === "error")
                    ? <p>{errorMessage ?? "Erro desconhecido"}</p>
                    : <div>
                        <p>{responseData.length} resultado(s) encontrados</p>
                        <SearchResultList jogosArray={responseData}></SearchResultList>
                      </div>
            }
        </main>
    );
}

export default SearchPage;