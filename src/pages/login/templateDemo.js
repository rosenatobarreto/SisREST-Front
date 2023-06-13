// // import React, { useState } from 'react';
// // import { Sidebar } from 'primereact/sidebar';
// // import { Button } from 'primereact/button';

// // export default function TemplateDemo() {
// //     const [visible, setVisible] = useState(false);

// //     const customIcons = (
// //         <React.Fragment>
// //             <button className="p-sidebar-icon p-link mr-2">
// //                 <span className="pi pi-print" />
// //             </button>
// //             <button className="p-sidebar-icon p-link mr-2">
// //                 <span className="pi pi-search" />
// //             </button>
// //         </React.Fragment>
// //     );
    
// //     return (
// //         <div className="card flex justify-content-center">
// //             <Sidebar visible={visible} onHide={() => setVisible(false)} icons={customIcons}>
// //                 <h2>Sidebar</h2>
// //                 <p>
// //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
// //                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
// //                 </p>
// //             </Sidebar>
// //             <Button icon="pi pi-plus" onClick={() => setVisible(true)} />
// //         </div>
// //     )
// // }
// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';

// import EditalApiService from "../../services/EditalApiService";

// export default function PaginatorBasicDemo() {
//     const [editais, setEditais] = useState([]);
//     const serviceEdital = new EditalApiService();

//     const actionBodyTemplate = (rowData) => {
//         return (
//             <React.Fragment>
//                 <Button icon="pi pi-pencil" rounded outlined className="mr-3" onClick={() => editProduct(rowData)} />
//                 <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
//             </React.Fragment>
//         );
//     };

//     const editProduct = (product) => {
//         // setProduct({ ...product });
//         // setProductDialog(true);
//     };

//     const confirmDeleteProduct = (product) => {
//         // setProduct(product);
//         // setDeleteProductDialog(true);
//     };

//     useEffect(() => {

//         const loadEditais = async () => {
//             const response = await serviceEdital.get('/buscarTodos');//.then((data) => setEditais(data));
//             setEditais(response.data);
//         };
//         loadEditais(); 
        
        
//     }, []);

//     return (
//         <div className="card">
//             <DataTable value={editais} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
//                 <Column field="numero" header="Número" ></Column>
//                 <Column field="ano" header="Ano" ></Column>
//                 <Column field="nome" header="Título" ></Column>
//                 <Column field="vigenteInicio" header="Início da vigência" ></Column>
//                 <Column field="vigenteFinal" header="Fim da vigência" ></Column>
//                 <Column header="Ações" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
//             </DataTable>
            
//         </div>
//     );
// }

//         // <div className="card">
//         //     <DataTable value={editais} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
//         //         <Column field="numero" header="Número" style={{ width: '5%' }}></Column>
//         //         <Column field="ano" header="Ano" style={{ width: '10%' }}></Column>
//         //         <Column field="nome" header="Título" style={{ width: '20%' }}></Column>
//         //         <Column field="vigenteInicio" header="Início da vigência" style={{ width: '20%' }}></Column>
//         //         <Column field="vigenteFinal" header="Fim da vigência" style={{ width: '20%' }}></Column>
//         //     </DataTable>
//         // </div>



// import React, { useState, reduce } from "react";

// // Um componente que representa um checkbox com o dia da semana e o tipo de refeição
// const Checkbox = ({ diaDaSemana, tipoDeRefeicao, checked, onChange }) => {
//   return (
//     <div>
//       <input
//         type="checkbox"
//         id={`${diaDaSemana}-${tipoDeRefeicao}`}
//         checked={checked}
//         onChange={onChange}
//       />
//       <label htmlFor={`${diaDaSemana}-${tipoDeRefeicao}`}>
//         {diaDaSemana} - {tipoDeRefeicao}
//       </label>
//     </div>
//   );
// };

// // Um componente que renderiza uma lista de checkboxes baseada nos dados de acesso à refeição
// const CheckboxList = ({ diasAcessoRefeicao }) => {
//   // Um estado que armazena os valores booleanos dos checkboxes
//   const [checkedValues, setCheckedValues] = useState(
//     // Inicializa o estado com um objeto que tem as chaves como o dia da semana e o tipo de refeição
//     // e os valores como false
//     diasAcessoRefeicao.reduce((obj, item) => {
//       obj[`${item.diaDaSemana}-${item.tipoDeRefeicao}`] = false;
//       return obj;
//     }, {})
//   );

//   // Uma função que atualiza o estado quando um checkbox é alterado
//   const handleChange = (e) => {
//     // Obtém o id e o valor do checkbox
//     const { id, checked } = e.target;
//     // Atualiza o estado com o novo valor do checkbox
//     setCheckedValues({ ...checkedValues, [id]: checked });
//   };

//   return (
//     <div>
//       {/* Mapeia os dados de acesso à refeição para renderizar os checkboxes */}
//       {diasAcessoRefeicao.map((item) => (
//         <Checkbox
//           key={`${item.diaDaSemana}-${item.tipoDeRefeicao}`}
//           diaDaSemana={item.diaDaSemana}
//           tipoDeRefeicao={item.tipoDeRefeicao}
//           checked={checkedValues[`${item.diaDaSemana}-${item.tipoDeRefeicao}`]}
//           onChange={handleChange}
//         />
//       ))}
//     </div>
//   );
// };

// export default CheckboxList;
