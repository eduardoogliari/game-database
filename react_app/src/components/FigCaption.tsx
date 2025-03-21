type FigCaptionProps = {
    imgUrl : string;
    imgAlt : string;
    caption : string;
};

function FigCaption({ imgUrl, imgAlt }: FigCaptionProps ) {
    return  (
        // <figure className="figure-caption">
        <img className="img-logo" src={imgUrl} alt={imgAlt}></img>
            // {/* <figcaption>{caption}</figcaption> */}
        // </figure>
    );
}

export default FigCaption;