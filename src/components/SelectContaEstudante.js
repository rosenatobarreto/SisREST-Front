import React from "react";
import axios from "axios";

const SelectContaEstudante = (props) => {

    const [contasEstudante, setContasEstudante] = React.useState([]);

    function findEditais() {
        axios.get( "http://localhost:8080/api/contaEstudante/buscarTodos"
        ).then( Response => {
            const contas = Response.data;
            setContasEstudante(contas);
            console.log("contas", contas);
        }).catch(error => {
            console.log(error.Response)
        });
    }

    React.useEffect(() => {
        findEditais();
    },[]);

    return (
        <select  id={props.id} onChange={props.onChange} className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm">
            <option className="" value="">Selecione o estudante</option>
            {contasEstudante.map( contaEstudante => {
                const {id, nome} = contaEstudante;
                return (<option key={id} className="" value={id}>{nome}</option>)
            })}
        </select>
    )
}

export default SelectContaEstudante;