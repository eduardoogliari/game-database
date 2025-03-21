import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GAME_API_BASE_URL from "../defs";
import JogoInfo from "./JogoInfo";
import { EmpresaDados } from "./Empresa";
import { Imagem } from "../components/Galeria";
import { PlataformaDados } from "./Plataforma";

export type GeneroDados = {
    id : number;
    nome : string;
};

export type JogoDados = {
    jogoId : number;
    jogoNome : string;
    descricao : string;
    jogoCapaUrl : string;
    desenvolvedoras: EmpresaDados[];
    publicadoras: EmpresaDados[];
    dataLancamento : Date;
    plataformas: PlataformaDados[];
    generos: GeneroDados[];
    imagens : Imagem[];
};

function Jogo() {
    const { id } = useParams();
    const [jogo, setJogo] = useState<JogoDados | null>(null);
    const [requestPending, setRequestPending] = useState(true);

    useEffect( () => {
        setRequestPending(true);
        fetch(`${GAME_API_BASE_URL}/jogos/${id}` )
            .then( (res) => {
                return res.json();
            } )
            .then((data) => setJogo(data) )
            .catch( (err) => console.error(err) )
            .finally(() => setRequestPending(false) );
    },[id]);

    return (
        <main id='main-content'>
            {(requestPending)
                ? <></>
                : (jogo)
                    ? <JogoInfo jogo={jogo}></JogoInfo>
                    : <p>Jogo não encontrado</p>
            }
        </main>
    );
}

export default Jogo;