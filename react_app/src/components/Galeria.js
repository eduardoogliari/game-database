function Galeria({imagens}) {
    const elementosImg = imagens.map((i) => <img className="imagem-galeria-item" src={i.url} alt={i.legenda}></img>);
    return (<div className="imagem-galeria">
        {elementosImg}
    </div>);
}

export default Galeria;