import { ChangeEventHandler } from "react";

export type MultiSelectData = {
    id : number;
    nome : string;
};

type MultiSelectProps = {
    value : string;
    data: MultiSelectData[];
    onChange : ChangeEventHandler<HTMLSelectElement>;
};

function MultiSelect({ value, data, onChange }: MultiSelectProps ) {
    // const opcoes : JSX.Element[] = [ <option value=''></option> ];
    // opcoes.push( data.map( (item) => <option value={item.id}>{item.nome}</option> ) );
    const opcoes = [<option value=''></option>, ...data.map((item) => <option value={item.id}>{item.nome}</option>)];

    return <select value={value} onChange={onChange}>{opcoes}</select>;
}

export default MultiSelect;