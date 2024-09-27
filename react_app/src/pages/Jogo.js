import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GAME_API_BASE_URL from "../defs";


function Jogo() {
    const { id } = useParams();
    const [jogo, setJogo] = useState(null);
    const [requestPending, setRequestPending] = useState(true);

    useEffect( () => {
        setRequestPending(true);
        fetch(`${GAME_API_BASE_URL}/jogos/${id}` )
            .then( (res) => res.json() )
            .then((data) => setJogo(data) )
            .catch( (err) => console.err(err) )
            .finally(() => setRequestPending(false) );
    },[id]);

    return (
        <main>
            {(requestPending)
                ? <></>
                : (jogo)
                    ? <h1>{jogo.jogoNome}</h1>
                    : <p>Jogo não encontrado</p>
            }
        </main>
    );
}

export default Jogo;