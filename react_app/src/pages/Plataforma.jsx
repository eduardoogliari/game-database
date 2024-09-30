import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GAME_API_BASE_URL from "../defs";

function Plataforma() {
    const { id } = useParams('id');
    const [plataforma, setPlataforma] = useState(null);
    const [requestPending, setRequestPending] = useState(true);

    useEffect(() => {
        setRequestPending(true);

        fetch(GAME_API_BASE_URL + '/plataformas/' + id)
            .then((res) => res.json())
            .then((data) => setPlataforma(data))
            .catch((err) => console.error(err))
            .finally(() => setRequestPending(false))
    }, [id]);

    return (
        <main>
            {
                (requestPending)
                    ? <p></p>
                    : (plataforma)
                        ? <h1>{plataforma.nome}</h1>
                        : <p>Erro</p>
            }
        </main>
    );

}

export default Plataforma;