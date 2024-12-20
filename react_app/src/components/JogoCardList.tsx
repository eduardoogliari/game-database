import JogoCard from './JogoCard.js';
import { JogoDados } from '../pages/Jogo.js';

type JogoCardListProps = {
    jogos : JogoDados[];
};

function JogoCardList({ jogos }: JogoCardListProps ) {
    const cards = jogos.map((j) => <JogoCard key={j.jogoId} jogo={j}></JogoCard> );

    return (
        <div className="jogo-card-list">
            {cards}
        </div>
    );
}

export default JogoCardList;