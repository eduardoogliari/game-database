
export type Imagem = {
    url: string;
    legenda: string;
};

type GaleriaProps = {
    imagens: Imagem[];
    onClickImage : (url : string) => void;
};

function Galeria({ imagens, onClickImage }: GaleriaProps) {
    const elementosImg = imagens.map((i) =>
        // <a className="imagem-galeria-item" href={i.url} key={i.url}><img src={i.url} alt={i.legenda}></img></a>
        <div onClick={() => onClickImage(i.url)} className="imagem-galeria-item" key={i.url}><img src={i.url} alt={i.legenda}></img></div>
    );

    return (<div className="imagem-galeria">
        {elementosImg}
    </div>);
}

export default Galeria;