import React from 'react';
import '../assets/css/Style.css';

export default props => {

    const rows = props.editais.map(edital => {
        return (
            <tr key={edital.id}>
                
                <td className="px-6 py-4 text-md font-medium text-gray-900 whitespace-nowrap">{edital.numero}</td>
                <td className="px-6 py-4 text-md font-medium text-gray-900 whitespace-nowrap">{edital.ano}</td>
                <td className="px-6 py-4 text-md font-medium text-gray-900 whitespace-nowrap">{edital.nome}</td>
                <td className="px-6 py-4 text-md font-medium text-gray-900 whitespace-nowrap">{edital.vigenteInicio}</td>
                <td className="px-6 py-4 text-md font-medium text-gray-900 whitespace-nowrap">{edital.vigenteFinal}</td>
                {/* <td className="px-6 py-4 text-md font-medium text-gray-900 whitespace-nowrap">{edital.link}</td> */}
                <td  className="px-6 py-4 text-md font-medium text-gray-900 whitespace-nowrap col-span-2">
                    <button type="button" title="Editar"
                        className="btn-edit"
                        onClick={e => props.edit(edital.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                        className="btn-edit"
                        onClick={e => props.delete(edital.id)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (

        <table className="w-full divide-y divide-gray-200">
            <thead className="bg-[#e6e6e6]">
                <tr className="table-active">
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Número</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Ano</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Título</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Início da vigência</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Fim da vigência</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Link do Edital</th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Ações</th>
                </tr>
            </thead>
            <tbody className="bg-white dividie-y divide-gray-200">
                {rows}
            </tbody>
        </table>
    )
}