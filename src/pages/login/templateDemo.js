// import React, { useState } from 'react';
// import { Sidebar } from 'primereact/sidebar';
// import { Button } from 'primereact/button';

// export default function TemplateDemo() {
//     const [visible, setVisible] = useState(false);

//     const customIcons = (
//         <React.Fragment>
//             <button className="p-sidebar-icon p-link mr-2">
//                 <span className="pi pi-print" />
//             </button>
//             <button className="p-sidebar-icon p-link mr-2">
//                 <span className="pi pi-search" />
//             </button>
//         </React.Fragment>
//     );
    
//     return (
//         <div className="card flex justify-content-center">
//             <Sidebar visible={visible} onHide={() => setVisible(false)} icons={customIcons}>
//                 <h2>Sidebar</h2>
//                 <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                 </p>
//             </Sidebar>
//             <Button icon="pi pi-plus" onClick={() => setVisible(true)} />
//         </div>
//     )
// }
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerService } from "./CustomerService";
// import EditalApiService from "../../services/EditalApiService";

export default function PaginatorBasicDemo() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => setCustomers(data));
        // this. service.get("/buscarTodos").then((data) => setCustomers(data));
        
    }, []);

    return (
        <div className="card">
            <DataTable value={customers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
                <Column field="company" header="Company" style={{ width: '25%' }}></Column>
                <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
}