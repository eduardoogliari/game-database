
function MultiCheckbox( {checkedValues, data, onChange} ) {
    const opcoes = data.map((item, index, array) => {
        return (
            (checkedValues)
            ?
                <label key={item.id} className="checkbox-label">
                    <input id={item.id} defaultChecked={checkedValues.includes(item.id)} type="checkbox" onClick={onChange}></input>
                    {item.nome}
                </label>
            : <></>
        );
    });
    return <div className="multi-checkbox">{opcoes}</div>;
}

export default MultiCheckbox;