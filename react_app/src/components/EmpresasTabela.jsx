import { Link } from "react-router-dom";

function EmpresasTabela({ empresas }) {
    const empresasRows = empresas.map((e) =>
        <tr key={e.id}><td><Link to={`/empresa/${e.id}`}>{e.nome}</Link></td></tr>
    );

    return <>
        <table className="tabela-padrao">
            <thead>
                <tr>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                {empresasRows}
            </tbody>
        </table>
    </>
}

export default EmpresasTabela;