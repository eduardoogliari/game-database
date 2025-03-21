import { Link } from "react-router-dom";
import { JogoDados } from "../pages/Jogo";

type EmpresaJogosTabelaProps = {
    jogosDesenvolvidos : JogoDados[];
    jogosPublicados : JogoDados[];
    // empresaId : number;
};

type JogoPapelEmpresa = {
    id : number;
    nome : string;
    papel : string;
};

// function EmpresaJogosTabela({ jogosDesenvolvidos, jogosPublicados, empresaId} ) {
function EmpresaJogosTabela({ jogosDesenvolvidos, jogosPublicados }: EmpresaJogosTabelaProps ) {
    const publicadosDesenvolvidos = jogosDesenvolvidos.filter( (e) => (jogosPublicados.find( (j) => j.jogoId === e.jogoId )) );
    const desenvolvidos = (publicadosDesenvolvidos.length > 0)
                                ? jogosDesenvolvidos.filter((e) => publicadosDesenvolvidos.find((j) => j.jogoId === e.jogoId) === undefined)
                                : jogosDesenvolvidos;
    const publicados = (publicadosDesenvolvidos.length > 0)
                                ? jogosPublicados.filter((e) => publicadosDesenvolvidos.find((j) => j.jogoId === e.jogoId) === undefined)
                                : jogosPublicados;

    // function JogoDados( id, nome, papel ) {
    //     this.id = id;
    //     this.nome = nome;
    //     this.papel = papel;
    // }

    const jogoDadosArray : JogoPapelEmpresa[] = [];
    for (const e of desenvolvidos ) {
        jogoDadosArray.push( { id: e.jogoId, nome: e.jogoNome, papel: "Desenvolvedora" } );
    }

    for (const e of publicados) {
        jogoDadosArray.push({ id: e.jogoId, nome: e.jogoNome, papel: "Publicadora" });
    }

    for (const e of publicadosDesenvolvidos) {
        jogoDadosArray.push({ id: e.jogoId, nome: e.jogoNome, papel: "Desenvolvedora e Publicadora" });
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