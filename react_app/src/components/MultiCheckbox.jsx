
function MultiCheckbox( {checkedValues, data, onChange} ) {
    const opcoes = data.map((item, index, array) => {

        // const isChecked = checkedValues.find((id) => item.id === id ) !== undefined;
        const isChecked = checkedValues.includes(item.id);
        // console.log('item.id: ' + item.id );
        // console.log('isChecked: ' + isChecked );
        // console.log('checkedValues: ' + checkedValues );
        return (
            <div key={item.id}>
                <label>
                <input id={item.id} defaultChecked={isChecked}  onClick={onChange} type="checkbox"></input>
                {item.nome}
                </label>
            </div>
        );
    });
    return <div>{opcoes}</div>;
}

export default MultiCheckbox;