
function Galeria({imagens}) {
    const elementosImg = imagens.map((i) =>
        <a className="imagem-galeria-item" href={i.url} key={i.url}><img src={i.url} alt={i.legenda}></img></a>
    );

    return (<div className="imagem-galeria">
        {elementosImg}
    </div>);
}

export default Galeria;