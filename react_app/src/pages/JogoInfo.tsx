import { Link } from "react-router-dom";
import Galeria from "../components/Galeria";
import NomeSecao from "../components/NomeSecao";
import { JogoDados } from './Jogo';
import { ImagemPopup } from "../components/ImagemPopup";
import { useState } from "react";

type JogoInfoProps = {
    jogo : JogoDados;
};





function JogoInfo({ jogo }: JogoInfoProps ) {
    const [imagemPopupOpen, setImagePopupOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const data = new Date(jogo.dataLancamento).toLocaleDateString('pt-BR');

    const devs  = jogo.desenvolvedoras.map((d, index, arr) => <span key={d.id}><Link to={"/empresa/" + d.id}>{d.nome}</Link>{(index < arr.length - 1 ? ', ' : '')}</span> );
    const pubs = jogo.publicadoras.map((p, index, arr) => <span key={p.id}><Link to={"/empresa/" + p.id}>{p.nome}</Link>{(index < arr.length - 1 ? ', ' : '')}</span> );
    const plats = jogo.plataformas.map((p, index, arr) => <span key={p.id}><Link to={"/plataforma/" + p.id}>{p.nome}</Link>{(index < arr.length-1 ? ', ' : '')}</span>);
    const gens = jogo.generos.map((g, index, arr) => <span key={g.id}><Link to={"/search/?genero=" + g.id}>{g.nome}</Link>{(index < arr.length-1 ? ', ' : '')}</span>);

    // function onClickClose(e: React.MouseEvent<HTMLButtonElement>) {
    function onClickClose() {
        setImagePopupOpen(false);
    }

    function onClickImage( url : string ) {
        setImagePopupOpen(true);
        setImageUrl(url);
    }


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
            <p className="texto-secao">{(jogo.descricao.length > 0) ? jogo.descricao : "Nenhuma descrição fornecida"}</p>

            <NomeSecao nome="Imagens:"></NomeSecao>
            <Galeria imagens={jogo.imagens} onClickImage={onClickImage}></Galeria>

            {
                (imagemPopupOpen) ?
                <ImagemPopup url={imageUrl} onClickClose={onClickClose}></ImagemPopup>
                : <></>
            }

        </div>
    );



}

export default JogoInfo;