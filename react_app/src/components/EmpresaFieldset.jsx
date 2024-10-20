

function EmpresaFieldset({ legend, empresasArray, onChange, onBlur, value } ) {
    return (
        <fieldset className="search-filter-fieldset">
            <legend>{legend}</legend>
            <input list="empresa-data" className="search-filter-empresa-input" type="input" onChange={onChange} onBlur={onBlur} value={value}></input>
            <datalist id="empresa-data">
                {
                    (empresasArray)
                        ? empresasArray.map((item) => <option key={item.id} value={item.nome}>{item.nome}</option>)
                        : ''
                }
            </datalist>
        </fieldset>
    );
}

export default EmpresaFieldset;