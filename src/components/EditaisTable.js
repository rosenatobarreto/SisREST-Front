import React from 'react';
import '../assets/css/Style.css';
import { formatDateBr } from "../util/FormatDate";

export default props => {

    const rows = props.editais.map(edital => {


        return (
            <tr key={edital.id} className="hover:bg-gray-50 dark:hover:bg-emerald-100 min-w-full">
                
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{edital.numero}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{edital.ano}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{edital.nome}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{formatDateBr(edital.vigenteInicio)}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{formatDateBr(edital.vigenteFinal)}</td>
                {/* <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{edital.link}</td> */}
                <td  className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap col-span-2">
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
       <div class="overflow-x-auto"> 
        <table className="min-w-full divide-y divide-gray-200 lg:rounded-sm">
            <thead className="bg-[#e6e6e6]">
                <tr className="table-active">
                    <th className="px-3 py-2 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Número</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Ano</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Título</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Início da vigência</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Fim da vigência</th>
                    {/* <th className="px-3 py-2 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Link do Edital</th> */}
                    <th className="px-3 py-2 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Ações</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {rows}
            </tbody>
        </table>
        </div>
    )
}