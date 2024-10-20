
function FigCaption( {imgUrl, imgAlt, caption} ) {
    return  (
        // <figure className="figure-caption">
        <img className="img-logo" src={imgUrl} alt={imgAlt}></img>
            // {/* <figcaption>{caption}</figcaption> */}
        // </figure>
    );
}

export default FigCaption;