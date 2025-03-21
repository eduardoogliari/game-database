import { ChangeEventHandler, FocusEventHandler } from "react";
// import { EmpresaDados } from "../pages/Empresa";

export type FieldsetData = {
    id : number;
    nome : string;
};

type FieldsetProps = {
    legend       : string;
    // empresasArray: EmpresaDados[];
    data: FieldsetData[];
    onChange     : ChangeEventHandler<HTMLInputElement>;
    onBlur       : FocusEventHandler<HTMLInputElement>;
    value        : string;
};

// function EmpresaFieldset({ legend, empresasArray, onChange, onBlur, value } ) {
function Fieldset({ legend, data, onChange, onBlur, value }: FieldsetProps ) {
    return (
        <fieldset className="search-filter-fieldset">
            <legend>{legend}</legend>
            <input list="empresa-data" name="empresa-input" className="search-filter-empresa-input" type="text" onChange={onChange} onBlur={onBlur} value={value}></input>
            <datalist id="empresa-data">
                {
                    (data)
                        ? data.map((item) => <option key={item.id} value={item.nome}>{item.nome}</option>)
                        : ''
                }
            </datalist>
        </fieldset>
    );
}

export default Fieldset;