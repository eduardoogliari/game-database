import { Link } from "react-router-dom";
import Galeria from "./Galeria";
import NomeSecao from "./NomeSecao";

function JogoInfo({jogo}) {
    const data = new Date(jogo.dataLancamento).toLocaleDateString('pt-BR');

    const devs  = jogo.desenvolvedoras.map((d, index, arr) => <span key={d.id}><Link to={"/empresa/" + d.id}>{d.nome}</Link>{(index < arr.length - 1 ? ', ' : '')}</span> );
    const pubs = jogo.desenvolvedoras.map((p, index, arr) => <span key={p.id}><Link>{p.nome}</Link>{(index < arr.length - 1 ? ', ' : '')}</span> );
    const plats = jogo.plataformas.map((p, index, arr) => <span key={p.id}><Link to={"/plataformas/" + p.id}>{p.nome}</Link>{(index < arr.length-1 ? ', ' : '')}</span>);
    const gens = jogo.generos.map((g, index, arr) => <span key={g.id}><Link to={"/generos/" + g.id}>{g.nome}</Link>{(index < arr.length-1 ? ', ' : '')}</span>);

    return (
        <div>
            <h1 className="jogo-titulo">{jogo.jogoNome}</h1>
            <div className="jogo-container">
                <img src={jogo.jogoCapaUrl} alt={jogo.jogoNome}></img>
                <div className="jogo-info">
                    <div className="jogo-info-property">
                        <h4>Lançamento:</h4>
                        <ul><li>{data}</li></ul>
                    </div>

                    <div className="jogo-info-property">
                        <h4>Plataformas:</h4>
                        <ul><li>{plats}</li></ul>
                    </div>

                    <div className="jogo-info-property">
                        <h4>Desenvolvedora(s):</h4>
                        <ul><li>{devs}</li></ul>
                    </div>

                    <div className="jogo-info-property">
                        <h4>Publicadora(s):</h4>
                        <ul><li>{pubs}</li></ul>
                    </div>

                    <div className="jogo-info-property">
                        <h4>Genero(s):</h4>
                        <ul><li>{gens}</li></ul>
                    </div>
                </div>
            </div>

            <NomeSecao nome="Descrição:"></NomeSecao>
            <p className="texto-secao">{jogo.descricao}</p>

            <NomeSecao nome="Imagens:"></NomeSecao>
            <Galeria imagens={jogo.imagens}></Galeria>

        </div>
    );



}

export default JogoInfo;