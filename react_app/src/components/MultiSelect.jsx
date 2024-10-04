
function MultiSelect({ value, data, onChange } ) {
    let opcoes = [ <option value=''></option> ];
    opcoes.push( data.map( (item, index, array) => <option value={item.id}>{item.nome}</option> ) );

    return <select value={value} onChange={onChange}>{opcoes}</select>;
}

export default MultiSelect;