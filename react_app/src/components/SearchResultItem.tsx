import { Link } from "react-router-dom";
import { JogoDados } from "../pages/Jogo";

export type SearchResultItemProps = {
    jogo : JogoDados;
};

function SearchResultItem({ jogo }: SearchResultItemProps ) {
    const plats = jogo.plataformas.map((d, index, arr) => d.nome + ((index+1 < arr.length) ? ',  ' : ''));
    const anoLancamento = new Date(jogo.dataLancamento).getFullYear();

    return (
        <li className="search-result-item">
            <img src={jogo.jogoCapaUrl} alt={jogo.jogoNome}></img>
            <article className="search-result-item-content">
                <h4><Link to={"/jogo/" + jogo.jogoId}>{jogo.jogoNome}</Link></h4>
                <span>{anoLancamento}</span>
                <div style={{marginTop: "5px"}}>{plats}</div>
            </article>
        </li>
    );
}

export default SearchResultItem;