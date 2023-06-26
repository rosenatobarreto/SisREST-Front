import React, {  useEffect, useState, useRef, memo } from "react";
// import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import EditalApiService from "../../services/EditalApiService";
import EditaisTable from "../../components/EditaisTable";
import MenuAdministrador from "../../components/MenuAdministrador";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

const ListarEditais = (props) => {

 const service = new EditalApiService();

  const [id, setId] = useState(0);
  // const [numero, setNumero] = useState(0);
  // const [ano, setAno] = useState(0);
  // const [nome, setNome] = useState('');
  // const [link, setLink] = useState('');
  // const [vigenteInicio, setVigenteInicio] = useState('');
  // const [vigenteFinal, setVigenteFinal] = useState('');
  const [editais, setEditais] = useState([]);
  const [editaisList, setEditaisList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
  });
  
  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters['global'] ? filters['global'].value : '';

    return (
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
          <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Pesquise na tabela" />
      </span>
    );
  };

  const header = renderHeader();

  const actionBodyTemplate = (rowData) => {
    
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editEdital(rowData.id)} />
        <Button icon="pi pi-trash" rounded outlined style={{ marginLeft: '6px' }} severity="danger" onClick={() => deleteEdital(rowData.id)} />
      </React.Fragment>
    );
  };
  
  useEffect(() => {
    
    const loadEditais = async () => {
      const response = await service.getAll('/buscarTodos')
      setEditaisList(response.data);
    };
    loadEditais(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []
  );


  const deleteEdital = (editalId) => {
    service
      .delete(editalId)
      .then((response) => {
        props.history.push(`/listarEditais`);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const editEdital = (editalId) => {
    props.history.push(`/atualizarEdital/${editalId}`);
  };

  const createEdital = () => {
    props.history.push(`/cadastrarEdital`);
  };

  const find = (id) => {
        
    service
      .get(`/buscarPorID/${id}`)
      .then((response) => {
        const edital = response.data;
        const id = edital.id;
 
        setId(id);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const findAll = () => {
    service
      .get("/buscarTodos")
      .then((response) => {
        const editais = response.data;
        setEditais({ editais: editais });
        console.log(editais);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    };

  const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    };


    return (
      <div className="container-fluid h-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
        {/*Col left  */}
        <div className="w-[220px] flex-shrink flex-grow-0 px-0">
          {/* Side Menu */}
          <MenuAdministrador /> 
        </div>
        {/* Col right */}
        <div className="w-full">
          {/* Header */}
          <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
            <div className="flex flex-row-reverse pr-6">
                <p className="text-xs">{props.currentUser.email}</p>
            </div>
            <div className="flex flex-row-reverse pr-6">
              <p className="text-lg font-semibold">Administrador</p>
            </div>
            <div className="flex flex-row pl-6">
              <p className="text-xl font-semibold">Gerenciar Editais</p>
            </div>
          </div>

          {/* Content two */}
          <div className="pt-4 pl-8 pr-8 mb-4">
            <div className="mt-0 sm:mt-0">
              <div className="md:grid md:grid-cols-1 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    {/* <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3> */}
                    {/* <p className="mt-1 text-sm text-gray-600">Use a perm</p> */}
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <form action="#" method="POST">
                    {/* Begin Card */}
                    {/* <div className="overflow-hidden shadow sm:rounded-md"> */}
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">


                      </div>
                    </div>
                    <div className="row flex flex-row-reverse align-middle px-4 mt-1">
                      <div className="col mr-2">
                        <Button id="btnNew" label="NOVO EDITAL" severity="sucess" raised onClick={createEdital} />
                      </div>
                    </div>

                    <div className="">
                      
                    </div>
                    {/* </div> */}
                    {/* End Card */}
                  </form>
                  <br />
                  <div className="row">
                    <div className="">
                      <div className="pt-4 pl-8 pr-8 mb-4">
                        <div className="card">
                            <DataTable value={editaisList} paginator rows={10} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
                              selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
                              stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="Edital não encontrado!" tableStyle={{ minWidth: '50rem' }}>
                              <Column className="text-sm" field="numero" header="Número" sortable style={{ width: '25%' }}></Column>
                              <Column className="text-sm" field="ano" header="Ano" sortable sortField="ano" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                              <Column className="text-sm" field="nome" header="Título" sortable sortField="nome" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                              <Column className="text-sm" field="vigenteInicio" 
                              // dataType="date" body={dateBodyTemplate} 
                              header="Início da Vigência" sortable sortField="vigenteInicio" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                              <Column className="text-sm" field="vigenteFinal" header="Fim da Vigência" sortable sortField="vigenteFinal" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                              <Column header="Ações" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                            </DataTable>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  
}

export default memo(ListarEditais);