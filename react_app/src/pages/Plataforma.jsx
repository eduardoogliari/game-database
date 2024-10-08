import { useEffect, useState } from "react";
import GAME_API_BASE_URL from "../defs";
import PlataformasTabela from "../components/PlataformasTabela";

function Plataforma() {
    const [plataformas, setPlataformas] = useState(null);
    const [requestPending, setRequestPending] = useState(true);

    useEffect(() => {
        setRequestPending(true);

        fetch(`${GAME_API_BASE_URL}/plataformas/`)
            .then((res) => res.json())
            .then((data) => setPlataformas(data))
            .catch((err) => console.error(err))
            .finally(() => setRequestPending(false))

    }, []);

    return (
        <main>
            {
                (requestPending)
                    ? <p></p>
                    : (plataformas)
                        ?   <>
                            <h1>Plataformas</h1>
                            <PlataformasTabela plataformas={plataformas}></PlataformasTabela>
                            </>
                        : <p>Erro</p>
            }
        </main>
    );

}

export default Plataforma;