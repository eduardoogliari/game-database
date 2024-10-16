import { Link } from "react-router-dom";

function JogoCard( {jogo} ) {
    return (
        <span className="jogo-card">
            <Link to={`/jogo/${jogo.jogoId}`}>
                <span>{jogo.jogoNome}</span>
                <img src={jogo.jogoCapaUrl} alt={jogo.jogoNome}></img>
            </Link>
        </span>
    );
}

export default JogoCard;