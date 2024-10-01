import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GAME_API_BASE_URL from "../defs";

function Empresa() {
    const {id} = useParams('id');
    const [empresa, setEmpresa] = useState(null);
    const [requestPending, setRequestPending] = useState(true);

    useEffect( () => {
        setRequestPending( true );

        fetch( GAME_API_BASE_URL + '/empresas/' + id )
            .then( (res) => res.json() )
            .then( (data) => setEmpresa(data) )
            .catch((err) => console.error(err))
            .finally(() => setRequestPending(false) )
    }, [id]);

    return (
        <main>
        {
        (requestPending)
            ? <p></p>
            : (empresa)
                ? (
                    <div>
                        <h1>{empresa.nome}</h1>
                        <img src={empresa.logo_url} alt={empresa.nome}></img>
                    </div>
                )
                : <p>Erro</p>
        }
        </main>
    );

}

export default Empresa;