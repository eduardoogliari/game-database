import { useState, useEffect } from 'react';
// const basePath = 'http://' + process.env.REACT_APP_WEB_HOST + ':' + process.env.REACT_APP_WEB_PORT;
import GAME_API_BASE_URL from '../defs.js';

function Home() {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        fetch(GAME_API_BASE_URL + '/jogos')
            .then((res) =>
                res.json()
            )
            .then((data) =>
                setEmpresas(data)
            )
        .catch((err) => {
            console.error(err.message);
        });
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {/* <pre>{process.env.REACT_APP_WEB_HOST + ':' + process.env.REACT_APP_WEB_PORT}</pre> */}
            {empresas ? <pre>{JSON.stringify(empresas, null, 2)}</pre> : "Aguarde..."}
        </div>
    );
};

export default Home;