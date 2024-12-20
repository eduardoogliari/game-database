import { Link } from "react-router-dom";
import { PlataformaDados } from "../pages/Plataforma";

type PlataformasTabelaProps = {
    plataformas : PlataformaDados[];
};

function PlataformasTabela( {plataformas} : PlataformasTabelaProps ) {
    const plataformasRows = plataformas.map( (p) =>
        <tr key={p.id}><td><Link to={`/plataforma/${p.id}`}>{p.nome}</Link></td></tr>
    );

    return <>
        <table className="tabela-padrao">
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                {plataformasRows}
            </tbody>
        </table>
    </>
}

export default PlataformasTabela;