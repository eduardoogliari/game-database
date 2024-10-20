import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NomeSecao from "../components/NomeSecao";
import EmpresaJogosTabela from "../components/EmpresaJogosTabela";
import GAME_API_BASE_URL from "../defs";
// import FigCaption from "../components/FigCaption";

function EmpresaInfo() {
    const {id}                                          = useParams('id');
    const [empresa, setEmpresa]                         = useState(null);
    const [jogosDesenvolvidos, setJogosDesenvolvidos]   = useState(null);
    const [jogosPublicados, setJogosPublicados]   = useState(null);
    // const [jogosEmpresa, setJogosEmpresa]               = useState(null);
    const [requestPending, setRequestPending]           = useState(true);
    const [jogosDesenvolvidosRequestPending, setJogosDesenvolvidosRequestPending] = useState(true);
    const [jogosPublicadosRequestPending, setJogosPublicadosRequestPending] = useState(true);

    useEffect( () => {
        setRequestPending( true );
        setJogosDesenvolvidosRequestPending(true);
        setJogosPublicadosRequestPending(true);

        fetch( GAME_API_BASE_URL + '/empresas/' + id )
            .then( (res) => res.json() )
            .then( (data) => setEmpresa(data) )
            .catch((err) => console.error(err))
            .finally(() => setRequestPending(false) );

        fetch(GAME_API_BASE_URL + `/jogos/?desenvolvedora=${id}`)
            .then((res) => res.json())
            .then((data) => setJogosDesenvolvidos(data))
            .catch((err) => console.error(err))
            .finally(() => setJogosDesenvolvidosRequestPending(false));


        fetch(GAME_API_BASE_URL + `/jogos/?publicadora=${id}`)
            .then((res) => res.json())
            .then((data) => setJogosPublicados(data))
            .catch((err) => console.error(err))
            .finally(() => setJogosPublicadosRequestPending(false));
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
                            {/* <FigCaption imgUrl={empresa.logo_url} imgAlt={empresa.nome} caption={`Logo do ${empresa.nome}`}></FigCaption> */}
                            <img className="img-logo" src={empresa.logo_url} alt={empresa.nome}></img>

                            <div className="empresa-desc">
                                <NomeSecao nome="Descrição:"></NomeSecao>
                                {(empresa.descricao.length > 0)
                                    ? <div dangerouslySetInnerHTML={{ __html: empresa.descricao }}></div>
                                    : <p>Nenhuma descrição fornecida.</p>
                                }

                            </div>


                            {
                                (jogosDesenvolvidosRequestPending && jogosPublicadosRequestPending)
                                    ? <p></p>
                                        : (jogosDesenvolvidos && jogosPublicados) && ((jogosDesenvolvidos.length > 0) || (jogosPublicados?.length > 0))
                                        ?   <>
                                                <NomeSecao nome="Jogos:"></NomeSecao>
                                                <div className="empresa-jogos-container">
                                                    <EmpresaJogosTabela jogosDesenvolvidos={jogosDesenvolvidos} jogosPublicados={jogosPublicados} empresaId={empresa.id}></EmpresaJogosTabela>
                                                    {/* <Link style={{width: "fit-content"}} to={`/search/?empresa=${empresa.nome}&sortBy=data&sortOrder=desc`}>[Todos os jogos]</Link> */}
                                                </div>
                                            </>
                                        : <></>
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