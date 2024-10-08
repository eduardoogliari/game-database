import { Link } from "react-router-dom";

function EmpresaJogosTabela( {jogos, empresaId} ) {
    const itemsTabela = jogos.map( (item, index, array) => {
        const dev = item.desenvolvedoras.find((e) => e.id === empresaId );
        const pub = item.publicadoras.find((e) => e.id === empresaId);

        let papel = '';
        if(dev !== undefined) { papel += 'Desenvolvedora'; }
        if (pub !== undefined) { papel += ((papel.length > 0) ? ' e ' : '') + 'Publicadora'; }

        return (<tr key={item.jogoId}>
            <td><Link to={"/jogo/" + item.jogoId}>{item.jogoNome}</Link></td>
            <td>{papel}</td>
        </tr>
    )});

    return <table className="tabela-padrao">
        <thead>
            <tr>
            <th>Jogo</th>
            <th>Papel da empresa</th>
            </tr>
        </thead>
        <tbody>
            {itemsTabela}
        </tbody>
    </table>
}

export default EmpresaJogosTabela;