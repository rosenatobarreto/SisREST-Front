import React from 'react';
import '../assets/css/Style.css';

export default props => {

    const rows = props.contasServidor.map(conta => {
        return (
            <tr key={conta.id} className="hover:bg-gray-50 dark:hover:bg-emerald-100 min-w-full">
                
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{conta.nome}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{conta.email}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{conta.matriculaSIAPE}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{conta.isAdmin===false?'Não':'Sim'}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{conta.campus}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap col-span-2">
                    <button type="button" title="Editar"
                        className="btn-edit"
                        onClick={e => props.edit(conta.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir"
                        className="btn-edit"
                        onClick={e => props.delete(conta.id)}>
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    } )

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#e6e6e6]">
                <tr className="table-active">
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 tracking-wider" scope="col">Nome</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 tracking-wider" scope="col">E-mail</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 tracking-wider" scope="col">Matrícula</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 tracking-wider" scope="col">Administrador</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 tracking-wider" scope="col">Campus</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-500 tracking-wider" scope="col">Ações</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {rows}
            </tbody>
        </table>
        </div>
    )
}