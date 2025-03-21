import SearchResultItem from "./SearchResultItem";
import { JogoDados } from "../pages/Jogo";

type SearchResultListProps = {
    jogos: JogoDados[];
};

function SearchResultList({ jogos }: SearchResultListProps ) {
    console.log("JOGOS: ", jogos);

    const jogosItems = jogos.map(
        (jogo) =>
            <SearchResultItem
                key={jogo.jogoId}
                jogo={jogo}
                // id={jogo.id}
                // nome={jogo.nome}
                // dataLancamento={jogo.dataLancamento}
                // capaUrl={jogo.capaUrl}
                // publicadoras={jogo.publicadoras}
                // desenvolvedoras={jogo.desenvolvedoras}
                // generos={jogo.generos}
                // plataformas={jogo.plataformas}
            />
    );

    return <ul className="search-result-list">{jogosItems}</ul>
}

export default SearchResultList;