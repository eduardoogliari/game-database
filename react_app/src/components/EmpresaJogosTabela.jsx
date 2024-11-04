import { Link } from "react-router-dom";

function EmpresaJogosTabela({ jogosDesenvolvidos, jogosPublicados, empresaId} ) {
    const publicadosDesenvolvidos = jogosDesenvolvidos.filter( (e) => (jogosPublicados.find( (j) => j.id === e.id )) );
    const desenvolvidos = (publicadosDesenvolvidos.length > 0)
                                ? jogosDesenvolvidos.filter((e) => publicadosDesenvolvidos.find((j) => j.id === e.id) === undefined)
                                : jogosDesenvolvidos;
    const publicados = (publicadosDesenvolvidos.length > 0)
                                ? jogosPublicados.filter((e) => publicadosDesenvolvidos.find((j) => j.id === e.id) === undefined)
                                : jogosPublicados;

    function JogoDados( id, nome, papel ) {
        this.id = id;
        this.nome = nome;
        this.papel = papel;
    }

    let jogoDadosArray = [];
    for (const e of desenvolvidos ) {
        jogoDadosArray.push( new JogoDados( e.jogoId, e.jogoNome, "Desenvolvedora" ) );
    }

    for (const e of publicados) {
        jogoDadosArray.push( new JogoDados(e.jogoId, e.jogoNome, "Publicadora"));
    }

    for (const e of publicadosDesenvolvidos) {
        jogoDadosArray.push( new JogoDados(e.jogoId, e.jogoNome, "Desenvolvedora e Publicadora"));
    }

    const itemsTabela = jogoDadosArray.map( (item) => {
        return (
            <tr key={item.id}>
                <td><Link to={"/jogo/" + item.id}>{item.nome}</Link></td>
                <td>{item.papel}</td>
            </tr>
        );
    });

    return (itemsTabela.length > 0)
        ?
            <table className="tabela-padrao">
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>Papel da empresa</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsTabela}
                </tbody>
            </table>
        : <></>;
}

export default EmpresaJogosTabela;