// import React, { useState, useEffect } from 'react';
// import { AutoComplete } from 'primereact/autocomplete';
// import axios from 'axios';
// // import { Column } from 'primereact/column';
// // import { CustomerService } from "./CustomerService";
// // import EditalApiService from "../../services/EditalApiService";

// export default function PaginatorBasicDemo() {
//     const [editais, setEditais] = useState([]);
//     const [editalMatch, setEditalMatch] = useState([]);
//     const [selectedEdital, setSelectedEdital] = useState(null);
//     console.log(editalMatch);


//     const searchEditais = (text) => {
//         if (!text) {
//             setEditalMatch([])
//         } else {
//             let matches = editais.filter((edital) => {
//                 const regex = new RegExp(`${text}`, "gi");
//                 return edital.nome.match(regex) || edital.numero.match(regex);
//             });
//             setEditalMatch(matches);
//         }
//     }

//     useEffect(() => {
//         const loadEditais = async () => {
//             const response = await axios.get('http://localhost:8080/api/edital/buscarTodos');
//             setEditais(response.data);

//             console.log('response ',response)
//             console.log('response data ', response.data)
//         };
//         loadEditais();    
        
//     }, []);

//     // useEffect(() => {
//     //     CustomerService.getCustomersMedium().then((data) => setCustomers(data));
//     //     // this. service.get("/buscarTodos").then((data) => setCustomers(data));
        
//     // }, []);

//     return (
//         // <div className="card">
//         //     <AutoComplete value={""} >
//         //     </AutoComplete>
//         // </div>

//         <div className="card flex justify-content-center">
//             {/* //className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" */}
//             <input  
//             value={searchEditais}
//                       // suggestions={this.state.edital} 
//                       // completeMethod={this.searchEditais} 
//                 onChange={(e) => searchEditais(e.target.value)} />
                    
//             {editalMatch && editalMatch.map((item, index) => (
//                 <div className="col-span-10" key={index}>
//                     <p>nome= {`Edital: ${item.nome}`}</p>
//                     <p>numero={item.numero}</p>
//                 </div>
//             ))}

//             {/* <AutoComplete 
//                 field="name" 
//                 value={searchEditais} 
//                 // suggestions={filteredCountries} ete
//                 completeMethod={searchEditais} 
//                 onChange={(e) => searchEditais(e.value)} /> */}

//         </div>

//     );
// }

import React, { useEffect, useState } from 'react';
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
// import { CountryService } from './service/CountryService';
import axios from 'axios';

export default function AutoCompleteEdital(childToParent) {
    const [editais, setEditais] = useState([]);
    const [selectedEditais, setSelectedEditais] = useState(null);
    const [filteredEditais, setFilteredEditais] = useState(null);

    const search = (event) => {
        // Timeout to emulate a network connection
        setTimeout(() => {
            let _filteredEditais;

            if (!event.query.trim().length) {
                _filteredEditais = [...editais];
            }
            else {
                _filteredEditais = editais.filter((edital) => {
                    return edital.nome.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredEditais(_filteredEditais);
        }, 250);
    }

    // useEffect(() => {
    //     // CountryService.getCountries().then((data) => setCountries(data));
    //     const response = axios.get('http://localhost:8080/api/edital/buscarTodos').then((data) => setEditais(data));
    // }, []);


    useEffect(() => {
        const loadEditais = async () => {
            const response = await axios.get('http://localhost:8080/api/edital/buscarTodos');//.then((data) => setEditais(data));
            setEditais(response.data);

            // console.log('response data ', response.data)
        };
        loadEditais();    
        
    }, []);

    return (
        <div className="card flex justify-content-center w-screen">
            <AutoComplete 
            field="nome" multiple value={selectedEditais} suggestions={filteredEditais} completeMethod={search} onChange={(e) => setSelectedEditais(e.value) }             
            />
            <Button onClick={() => childToParent(selectedEditais)}>Selecione</Button>
        </div>
        
    )
}