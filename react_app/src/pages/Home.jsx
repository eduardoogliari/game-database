import { useState, useEffect } from 'react';
import GAME_API_BASE_URL from '../defs.js';

function Home() {
    const [jogos, setJogos] = useState([]);
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [requestPending, setRequestPending] = useState(true);

    useEffect(() => {
        setRequestPending(true);

        fetch(GAME_API_BASE_URL + '/jogos')
            .then((res) => {
                setTotalItemCount(res.headers.get('Total-Item-Count') ?? 0 );
                return res.json();
            })
            .then((data) =>
                setJogos(data)
            )
        .catch((err) => {
            console.error(err.message);

        }).finally(() => {
            setRequestPending(false);
        });
    }, []);

    return (
        (requestPending)
            ?   <></>
            :   <main>
                <h1>Home</h1>
                {/* {jogos ? <pre>{JSON.stringify(jogos, null, 2)}</pre> : "Aguarde..."} */}
                <p>{totalItemCount} jogos cadastrados</p>
                </main>
    );
};

export default Home;