import JogoCard from '../components/JogoCard.jsx';

function JogoCardList( {jogos} ) {
    const cards = jogos.map((j) => <JogoCard key={j.jogoId} jogo={j}></JogoCard> );

    return (
        <div className="jogo-card-list">
            {cards}
        </div>
    );
}

export default JogoCardList;