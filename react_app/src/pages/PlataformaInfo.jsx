import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NomeSecao from "../components/NomeSecao";
import GAME_API_BASE_URL from "../defs";
import FigCaption from "../components/FigCaption";

function PlataformaInfo() {
    const { id } = useParams();
    const [plataforma, setPlataforma] = useState(null);
    const [requestPending, setRequestPending] = useState(true);

    useEffect(() => {
        setRequestPending(true);

        fetch( `${GAME_API_BASE_URL}/plataformas/${id}` )
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
                        ? <>
                            <h1>{plataforma.nome}</h1>
                            <div className="plataforma-container">
                                <FigCaption imgUrl={plataforma.foto_url} imgAlt={plataforma.nome} caption={`Logo do ${plataforma.nome}`}></FigCaption>

                                <div className="plataforma-desc">
                                    <NomeSecao nome="Descrição:"></NomeSecao>
                                    <p>{plataforma.descricao}</p>
                                </div>
                            </div>
                        </>
                        : <p>Erro</p>
            }
        </main>
    );

}

export default PlataformaInfo;