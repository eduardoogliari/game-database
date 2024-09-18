import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import GAME_API_BASE_URL from '../defs.js';

function SearchPage(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [responseData, setResponseData] = useState([]);
    const q = searchParams.get('q');

    useEffect(() => {
        fetch(GAME_API_BASE_URL + '/jogos/?nome=' + q)
            .then((res) =>
                res.json()
            )
            .then((data) =>
                setResponseData(data)
            )
            .catch((err) => {
                console.error(err.message);
            });
    }, [q]);

    return (
        <div>
            <p>Search</p>
            <p>{q}</p>
            {responseData ? <pre>{JSON.stringify(responseData, null, 2)}</pre> : "Aguarde..." }
        </div>
    );
}

export default SearchPage;