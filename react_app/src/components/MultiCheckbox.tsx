import { MouseEventHandler } from "react";

export type MultiCheckboxData = {
    id : number;
    nome : string;
};

type MultiCheckboxProps = {
    checkedValues   : number[];
    data            : MultiCheckboxData[];
    onChange        : MouseEventHandler<HTMLInputElement>;
};

function MultiCheckbox({ checkedValues, data, onChange }: MultiCheckboxProps ) {
    const opcoes = data.map((item) => {
        return (
            (checkedValues)
            ?
                <label key={item.id} className="checkbox-label">
                    <input value={item.id} name={item.nome} defaultChecked={checkedValues.includes(item.id)} type="checkbox" onClick={onChange}></input>
                    {item.nome}
                </label>
            : <></>
        );
    });
    return <div className="multi-checkbox">{opcoes}</div>;
}

export default MultiCheckbox;