import React from 'react';
import '../assets/css/Style.css';

export default props => {

    const rows = props.contasEstudante.map(conta => {
        return (
            <tr key={conta.id} className="hover:bg-gray-50 dark:hover:bg-emerald-100 min-w-full">
                
                {/* <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{conta.id}</td> */}
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{conta.nome}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{conta.email}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{conta.matricula}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{conta.campus}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{conta.curso}</td>                
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap col-span-2">
                    <button type="button" title="selecionar conta"
                        className="btn-edit" id="id-btn-select" onClick={e => props.selectOneContaEstudante(conta.id, conta.nome)}><i className="pi pi-check"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-[#e6e6e6]">
                <tr className="table-active">
                    {/* <th className="px-3 py-3 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Id</th> */}
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-900 tracking-wider" scope="col">Nome</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-900 tracking-wider" scope="col">E-mail</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-900 tracking-wider" scope="col">Matrícula</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 tracking-wider" scope="col">Campus</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 tracking-wider" scope="col">Curso</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-900 tracking-wider" scope="col">Ações</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
                {rows}
            </tbody>
        </table>
        </div>
    )
}