import { Link } from "react-router-dom";

function SearchResultItem({ jogoId, jogoNome, dataLancamento, jogoCapaUrl, publicadoras, desenvolvedoras, generos, plataformas } ) {
    const plats = plataformas.map((d, index, arr) => d.nome + ((index+1 < arr.length) ? ',  ' : ''));
    const anoLancamento = new Date(dataLancamento).getFullYear();

    return (
        <li className="search-result-item">
            <img src={jogoCapaUrl} alt={jogoNome}></img>
            <article className="search-result-item-content">
                <h4><Link to={"/jogo/" + jogoId}>{jogoNome}</Link></h4>
                <span>{anoLancamento}</span>
                <div style={{marginTop: "5px"}}>{plats}</div>
            </article>
        </li>
    );
}

export default SearchResultItem;