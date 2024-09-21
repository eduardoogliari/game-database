import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import GAME_API_BASE_URL from '../defs.js';
import removeExtraSpaces from '../util.js';

function SearchPage(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [responseData, setResponseData] = useState([]);
    const [requestPending, setRequestPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const q = searchParams.get('q');

    useEffect(() => {
        setRequestPending(true);
        setErrorMessage('');

        const t = removeExtraSpaces(q);
        const arr = t.split(' ');
        console.log(arr);

        fetch(GAME_API_BASE_URL + '/jogos/?nome=' + q)
            .then((res) =>
                res.json()
            )
            .then((data) =>
                setResponseData(data)
            )
            .catch((err) => {
                console.error(err.message);
                setErrorMessage(`Algo deu errado. Recarregue a página para tentar novamente.`);

            }).finally( () =>
                setRequestPending(false)
            );
    }, [q]);

    return (
        <div>
            {(requestPending)
                ? <p>Aguarde...</p>
                : (errorMessage)
                    ? <p>{errorMessage}</p>
                    : <pre>{JSON.stringify(responseData, null, 2)}</pre>
            }
            {/* {responseData ? <pre>{JSON.stringify(responseData, null, 2)}</pre> : "Aguarde..." } */}
        </div>
    );
}

export default SearchPage;