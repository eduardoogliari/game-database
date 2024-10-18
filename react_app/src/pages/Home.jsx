import { useState, useEffect } from 'react';
import GAME_API_BASE_URL from '../defs.js';
import Logo from '../components/Logo.jsx';
import JogoCardList from '../components/JogoCardList.jsx';
import NomeSecao from '../components/NomeSecao.jsx';

function Home() {
    const [jogos, setJogos] = useState([]);
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [requestPending, setRequestPending] = useState(true);

    useEffect(() => {
        setRequestPending(true);

        fetch(GAME_API_BASE_URL + '/jogos/?sortBy=id&sortOrder=desc&limit=6')
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
                <div className="home-logo">
                    <img src="logo.svg" alt="logo do GameDB"></img>
                    <h1>GameDB</h1>
                    <p>Aqui você encontra informações sobre os seus jogos favoritos</p>
                </div>

                {/* <p>{totalItemCount} jogos cadastrados</p> */}

                {/* <NomeSecao nome={"Jogos recentemente adicionados"}></NomeSecao> */}
                <h2>Jogos recentemente adicionados</h2>
                <JogoCardList jogos={jogos}></JogoCardList>

                </main>
    );
};

export default Home;