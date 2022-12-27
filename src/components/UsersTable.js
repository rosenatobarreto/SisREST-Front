import React from 'react';
import '../assets/css/Style.css';

export default props => {

    const rows = props.beneficiarios.map(user => {
        return (
            <tr key={user.id}>
                
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{user.nome}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{user.matricula}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{user.tipo}</td>
                <td  className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap col-span-2">
                    <button type="button" title="Editar"
                        className="btn-edit"
                        onClick={e => props.edit(user.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                        className="btn-edit"
                        onClick={e => props.delete(user.id)}>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">E-mail</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Matrícula</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Papel</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Ações</th>
                </tr>
            </thead>
            <tbody className="bg-white dividie-y divide-gray-200">
                {rows}
            </tbody>
        </table>
    )
}