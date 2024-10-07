
function FigCaption( {imgUrl, imgAlt, caption} ) {
    return  (
        <figure className="figcaption">
            <img src={imgUrl} alt={imgAlt}></img>
            <figcaption>{caption}</figcaption>
        </figure>
    );
}

export default FigCaption;