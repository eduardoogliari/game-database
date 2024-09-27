import SearchResultItem from "./SearchResultItem";

function SearchResultList( {jogosArray} ) {
    const jogosItems = jogosArray.map(
        (jogo) =>
            <SearchResultItem
                key={jogo.jogoId}
                jogoId={jogo.jogoId}
                jogoNome={jogo.jogoNome}
                dataLancamento={jogo.dataLancamento}
                jogoCapaUrl={jogo.jogoCapaUrl}
                publicadoras={jogo.publicadoras}
                desenvolvedoras={jogo.desenvolvedoras}
                generos={jogo.generos}
                plataformas={jogo.plataformas}
            />
    );

    return <ul className="search-result-list">{jogosItems}</ul>
}

export default SearchResultList;