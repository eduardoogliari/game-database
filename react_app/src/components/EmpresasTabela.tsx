import { Link } from "react-router-dom";
import { EmpresaDados } from "../pages/Empresa";

export type EmpresasTabelaProps = {
    empresas: EmpresaDados[];
};

function EmpresasTabela({ empresas } : EmpresasTabelaProps ) {
    const empresasRows = empresas.map((e) =>
        <tr key={e.id}><td><Link to={`/empresa/${e.id}`}>{e.nome}</Link></td></tr>
    );

    return <>
        <table className="tabela-padrao">
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
                {empresasRows}
            </tbody>
        </table>
    </>
}

export default EmpresasTabela;