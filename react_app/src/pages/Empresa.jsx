import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NomeSecao from "../components/NomeSecao";
import EmpresaJogosTabela from "../components/EmpresaJogosTabela";
import GAME_API_BASE_URL from "../defs";

function Empresa() {
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

                            <figure className="empresa-figura">
                                <img  src={empresa.logo_url} alt={empresa.nome}></img>
                                <figcaption>Logo da {empresa.nome}</figcaption>
                            </figure>

                            <div className="empresa-desc">
                                {/* <h2 className="nome-secao">Descrição:</h2> */}
                                <NomeSecao nome="Descrição:"></NomeSecao>
                                <p>{empresa.descricao}</p>
                            </div>

                            {/* <h2 className="nome-secao">Lançamentos recentes:</h2> */}
                            <NomeSecao nome="Lançamentos recentes:"></NomeSecao>
                            {
                                (jogosRequestPending)
                                    ? <p></p>
                                    : (jogosEmpresa)
                                        ?   <>
                                                <EmpresaJogosTabela jogos={jogosEmpresa} empresaId={empresa.id}></EmpresaJogosTabela>
                                                {/* TODO: Link para busca e como parametro nome da empresa (dev, pub)*/}
                                                {/* <Link to="/search/?q=">Todos os jogos</Link> */}
                                            </>
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

export default Empresa;