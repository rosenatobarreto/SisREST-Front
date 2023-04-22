import React from 'react';
import '../assets/css/Style.css';

export default props => {

    const rows = props.beneficiarios.map(user => {
        return (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-green-50">
                
                <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{user.ativo===true?'Sim':'Não'}</td>
                {/* <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{user.edital.numero}</td> */}
                {/* <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{user.edital.ano}</td> */}
                {/* <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{user.edital.link}</td> */}
                {/* <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{user.edital.vigenteInicio}</td> */}
                {/* <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{user.edital.vigenteFinal}</td> */}
                <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{user.contaEstudante.nome}</td>
                <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{user.contaEstudante.email}</td>
                <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{user.contaEstudante.matricula}</td>
                <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{user.edital.numero+'-'+user.edital.ano+" "+user.edital.nome}</td>
                {/* <td className="px-6 py-4 text-md font-medium text-gray-900 whitespace-nowrap">{user.tipo}</td> */}
                <td  className="px-3 py-4 text-md font-medium text-gray-900 whitespace-nowrap col-span-2">

                    <button type="button" title="Detalhar" className="btn-edit" onClick={e => props.view(
                        user.id,
                        user.ativo,
                        user.edital.numero,
                        user.edital.ano,
                        user.edital.nome,
                        user.edital.link,
                        user.edital.vigenteInicio,
                        user.edital.vigenteFinal,
                        user.contaEstudante.nome,
                        user.contaEstudante.email,
                        user.contaEstudante.matricula

                        )}>
                        <i className="pi pi-eye"></i>
                    </button>
                    <button type="button" title="Editar" className="btn-edit" onClick={e => props.edit(user.id)}>
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" title="Excluir" className="btn-edit" onClick={e => props.delete(user.id)}>
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
                    <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Ativo</th>
                    {/* <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Número do Edital</th> */}
                    {/* <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Ano do Edital</th> */}
                    {/* <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Link do Edital</th> */}
                    {/* <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Início da vigência</th> */}
                    {/* <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Final da vigência</th> */}
                    <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Aluno</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">E-mail</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Matrícula</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Edital</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-grady-500 tracking-wider" scope="col">Ações</th>
                </tr>
            </thead>
            <tbody className="bg-white dividie-y divide-gray-200">
                {rows}
            </tbody>
        </table>
    )
}