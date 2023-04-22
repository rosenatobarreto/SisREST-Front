import React, { useState } from 'react';
import '../assets/css/Style.css';
import { formatDateBr } from "../util/FormatDate";

export default props => {

    const rows = props.editais.map(edital => {

        return (
            <tr key={edital.id} className="hover:bg-gray-50 dark:hover:bg-green-50">
                
                {/* <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{edital.numero}</td>
                <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{edital.ano}</td> */}
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{edital.numero+"-"+edital.ano+" "+edital.nome}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{formatDateBr(edital.vigenteInicio)}</td>
                <td className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap">{formatDateBr(edital.vigenteFinal)}</td>
                <td  className="px-3 py-2 text-sm font-medium text-gray-900 whitespace-nowrap col-span-2">
                    <button type="button" title="selectEdital"
                        className="btn-edit" id="id-btn-select" onClick={e => props.selectOneEdital(edital.id, edital.numero, edital.ano, edital.nome)}><i className="pi pi-check"></i>
                    </button>
                    {/* <button type="button" title="selectEdital"
                        className="btn-edit" onClick={() => handleSelectEdital(edital.id)}>
                        <i className={isSelected ? "pi pi-check" : ""}></i>
                    </button> */}
                </td>
            </tr>
        )
    } )


    return (        
        <table className="w-full divide-y divide-gray-300">
            <thead className="bg-[#e6e6e6]">
                <tr className="table-active">
                    {/* <th className="px-3 py-3 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Número</th>
                    <th className="px-3 py-3 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Ano</th> */}
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-900 tracking-wider" scope="col">Título</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-900 tracking-wider" scope="col">Início da vigência</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-900 tracking-wider" scope="col">Fim da vigência</th>
                    <th className="px-3 py-2 text-left text-sm font-medium text-gray-900 tracking-wider" scope="col">Ações</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
                {rows}
            </tbody>
        </table>
    )
}


// import React, { useState } from 'react';
// import '../assets/css/Style.css';
// import { formatDateBr } from "../util/FormatDate";

// export default function Tabela(props) {

//     const [selectedEdital, setSelectedEdital] = useState(null);

//     const selectOneEdital = (id) => {
//         const edital = props.editais.find(edital => edital.id === id);
//         setSelectedEdital(edital);
//     }

//     const rows = props.editais.map(edital => {
//         return (
//             <tr key={edital.id}>
                
//                 <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{edital.numero}</td>
//                 <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{edital.ano}</td>
//                 <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{edital.nome}</td>
//                 <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{formatDateBr(edital.vigenteInicio)}</td>
//                 <td className="px-3 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">{formatDateBr(edital.vigenteFinal)}</td>
//                 <td  className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap col-span-2">
//                     <button type="button" title="selecionar edital"
//                         className="btn-edit" onClick={e => selectOneEdital(edital.id)}><i className="pi pi-check"></i>
//                     </button>
//                 </td>
//             </tr>
//         )
//     } )

//     return (        
//         <table className="w-full divide-y divide-gray-200">
//             <thead className="bg-[#e6e6e6]">
//                 <tr className="table-active">
//                     <th className="px-3 py-3 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Número</th>
//                     <th className="px-3 py-3 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Ano</th>
//                     <th className="px-3 py-3 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Título</th>
//                     <th className="px-3 py-3 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Início da vigência</th>
//                     <th className="px-3 py-3 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Fim da vigência</th>
//                     <th className="px-3 py-3 text-left text-sm font-medium text-grady-500 tracking-wider" scope="col">Ações</th>
//                 </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//                 {rows}
//             </tbody>
//             {/* <Input selectedEdital={selectedEdital} /> */}
//         </table>
//     )
// }