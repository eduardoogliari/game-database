import { MouseEventHandler } from "react";

export type ImagemPopupProps = {
    url : string;
    onClickClose : MouseEventHandler<HTMLButtonElement>;
    // onClickClose : () => void;
};

export function ImagemPopup({ url, onClickClose }: ImagemPopupProps ) {
    return(
    <div className="imagem-popup">
        <div className="imagem-popup-content">
            <button className="imagem-popup-close" onClick={onClickClose}>Fechar [X]</button>
            <div className="imagem-popup-inner-content">
                {/* <button>&lt;</button> */}
                <img src={url}></img>
                {/* <button>&gt;</button> */}
            </div>
        </div>
    </div>);
}