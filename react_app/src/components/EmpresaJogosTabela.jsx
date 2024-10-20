import { Link } from "react-router-dom";

function EmpresaJogosTabela({ jogosDesenvolvidos, jogosPublicados, empresaId} ) {
    // console.log('jogosDesenvolvidos: ', jogosDesenvolvidos );

    const publicadosDesenvolvidos = jogosDesenvolvidos.filter( (e) => (jogosPublicados.find( (j) => j.id === e.id )) );
    const desenvolvidos = (publicadosDesenvolvidos.length > 0)
                                ? jogosDesenvolvidos.filter((e) => publicadosDesenvolvidos.find((j) => j.id === e.id) === undefined)
                                : jogosDesenvolvidos;
    const publicados = (publicadosDesenvolvidos.length > 0)
                                ? jogosPublicados.filter((e) => publicadosDesenvolvidos.find((j) => j.id === e.id) === undefined)
                                : jogosPublicados;
    // const publicados = jogosPublicados.filter((e) => (publicadosDesenvolvidos.find((j) => j.id !== e.id)) ? e : false );

    // console.log('publicadosDesenvolvidos: ', publicadosDesenvolvidos);
    // console.log('desenvolvidos:', desenvolvidos);
    // console.log('publicados:', publicados);

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

    // const itemsTabela = jogoDadosArray.map( (item, index, array) => {
    //     const dev = item.desenvolvedoras.find((e) => e.id === empresaId );
    //     const pub = item.publicadoras.find((e) => e.id === empresaId);

    //     let papel = '';
    //     if(dev !== undefined) { papel += 'Desenvolvedora'; }
    //     if (pub !== undefined) { papel += ((papel.length > 0) ? ' e ' : '') + 'Publicadora'; }

    //     return (<tr key={item.jogoId}>
    //         <td><Link to={"/jogo/" + item.jogoId}>{item.jogoNome}</Link></td>
    //         <td>{papel}</td>
    //     </tr>
    // )});

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