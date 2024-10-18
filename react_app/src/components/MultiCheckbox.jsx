
function MultiCheckbox( {checkedValues, data, onChange} ) {
    const opcoes = data.map((item, index, array) => {

        // const isChecked = checkedValues.find((id) => item.id === id ) !== undefined;
        // const isChecked = checkedValues.includes(item.id);
        // console.log('item.id: ' + item.id );
        // console.log('isChecked: ' + isChecked );
        // console.log('checkedValues: ' + checkedValues );
        return (
            (checkedValues)
            ?
                // <div  >
                <label key={item.id} className="checkbox-label">
                        <input id={item.id} defaultChecked={checkedValues.includes(item.id)} type="checkbox" onClick={onChange}></input>
                        {item.nome}
                    </label>
                // </div>

            : <></>
        );
    });
    return <div>{opcoes}</div>;
}

export default MultiCheckbox;