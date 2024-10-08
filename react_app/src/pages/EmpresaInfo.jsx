import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NomeSecao from "../components/NomeSecao";
import EmpresaJogosTabela from "../components/EmpresaJogosTabela";
import GAME_API_BASE_URL from "../defs";
import FigCaption from "../components/FigCaption";

function EmpresaInfo() {
    const {id}                                          = useParams('id');
    const [empresa, setEmpresa]                         = useState(null);
    const [jogosEmpresa, setJogosEmpresa]               = useState(null);
    const [requestPending, setRequestPending]           = useState(true);
    const [jogosRequestPending, setJogosRequestPending] = useState(true);

    useEffect( () => {
        setRequestPending( true );
        setJogosRequestPending( true );

        fetch( GAME_API_BASE_URL + '/empresas/' + id )
            .then( (res) => res.json() )
            .then( (data) => setEmpresa(data) )
            .catch((err) => console.error(err))
            .finally(() => setRequestPending(false) );

        fetch(GAME_API_BASE_URL + `/jogos/?publicadora=${id}&desenvolvedora=${id}&sortBy=data_lancamento&sortOrder=desc` )
            .then( (res) => res.json() )
            .then((data) => setJogosEmpresa(data) )
            .catch( (err) => console.error(err) )
            .finally(() => setJogosRequestPending(false) );

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
                        <div className="empresa-container">
                            <FigCaption imgUrl={empresa.logo_url} imgAlt={empresa.nome} caption={`Logo do ${empresa.nome}`}></FigCaption>

                            <div className="empresa-desc">
                                <NomeSecao nome="Descrição:"></NomeSecao>
                                <p>{empresa.descricao}</p>
                            </div>

                            <NomeSecao nome="Lançamentos recentes:"></NomeSecao>
                            {
                                (jogosRequestPending)
                                    ? <p></p>
                                    : (jogosEmpresa)
                                        ? <div className="empresa-jogos-container">
                                                <EmpresaJogosTabela jogos={jogosEmpresa} empresaId={empresa.id}></EmpresaJogosTabela>
                                                <Link to={`/search/?empresa=${empresa.nome}&sortBy=data&sortOrder=desc`}>[Todos os jogos]</Link>
                                            </div>
                                        : <p>Erro</p>
                            }

                        </div>
                    </div>
                )
                : <p>Erro</p>
        }
        </main>
    );

}

export default EmpresaInfo;