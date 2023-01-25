import React from "react";
import axios from "axios";

const SelectEdital = (props) => {

    const [editais, setEditais] = React.useState([]);

    function findEditais() {
        axios.get( "http://localhost:8080/api/edital"
        ).then( Response => {
            const editais = Response.data;
            setEditais(editais);
            console.log("editais", editais);
        }).catch(error => {
            console.log(error.Response)
        });
    }

    React.useEffect(() => {
        findEditais();
    },[]);

    return (
        <select  id={props.id} onChange={props.onChange} className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm">
            <option className="form-control" value="">Selecione o edital</option>
            {editais.map( edital => {
                const {id, name} = edital;
                return (<option key={id} className="form-control" value={id}>{name}</option>)
            })}
        </select>
    )
}

export default SelectEdital;