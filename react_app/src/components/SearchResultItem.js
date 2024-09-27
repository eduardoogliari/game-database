import { Link } from "react-router-dom";

function SearchResultItem({ jogoId, jogoNome, dataLancamento, jogoCapaUrl, publicadoras, desenvolvedoras, generos, plataformas } ) {
    // return <pre>{JSON.stringify(jogo, null, 2)}</pre>;

    // TODO: Exibir nomes da desenvolvedoras e publicadoras
    // TODO: Exibir plataformas
    // TODO: Exibir ano de lançamento
    // TODO:

    const devs = desenvolvedoras.map((d) => <li key={d.id}>{d.nome}</li>);
    const pubs = publicadoras.map((p) => <li key={p.id}>{p.nome}</li>);
    // const plats = plataformas.map((d) => <li key={d.id}>{d.nome}</li>);
    const plats = plataformas.map((d, index, arr) => d.nome + ((index+1 < arr.length) ? ',  ' : ''));
    const anoLancamento = new Date(dataLancamento).getFullYear();

    return (
        <li className="search-result-item">
            <img src={jogoCapaUrl} alt={jogoNome}></img>
            <article className="search-result-item-content">
                <h4><Link to={"/jogo/" + jogoId}>{jogoNome}</Link></h4>
                <span>{anoLancamento}</span>
                {/* <p>{jogoId}</p> */}
                {/* <span>Desenvolvedoras: </span><ul style={{listStyle:"none", padding:"0px"}}>{devs}</ul> */}
                {/* <span>Publicadoras: </span><ul style={{ listStyle: "none", padding: "0px" }}>{pubs}</ul> */}
                <div style={{marginTop: "5px"}}>{plats}</div>
                {/* <p>{jogo.publicadoras[0]}</p> */}
            </article>
        </li>
    );
}

export default SearchResultItem;