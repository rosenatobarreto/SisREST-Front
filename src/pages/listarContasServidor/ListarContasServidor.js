import React, { useEffect, useState, memo } from "react";
import ContaServidorApiService from "../../services/ContaServidorApiService";
import MenuAdministrador from "../../components/MenuAdministrador";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';

const ListarContasServidor = (props) => {

  const service = new ContaServidorApiService();

  const [contasServidorList, setContasServidorList] = useState([]);
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
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => edit(rowData.id)} />
        <Button icon="pi pi-trash" rounded outlined style={{ marginLeft: '6px' }} severity="danger" onClick={() => deleteConta(rowData.id)} />
      </React.Fragment>
    );
  };

  useEffect(() => {

    const loadContasServidor = async () => {
      const response = await service.get('/buscarTodos')
      setContasServidorList(response.data);
    };
    loadContasServidor();
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []
  );


  const deleteConta = (contaId) => {
    service
      .delete(contaId)
      .then((response) => {
        props.history.push(`/listarContasServidor`);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const edit = (id) => {
    props.history.push(`/atualizarContaServidor/${id}`);
  };

  const create = () => {
    props.history.push(`/cadastrarContaServidor`);
  };


  const findAll = () => {
    service
      .get("/buscarTodos")
      .then((response) => {
        const contasServidor = response.data;
        contasServidor({ contasServidor: contasServidor });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const dateBodyIsAdminFalseTrue = (rowData) => {
    
    if (rowData.admin === false) {
      const isAdministrador = 'Não';
      return isAdministrador;
    } 
    else if (rowData.admin === true) {
      const isAdministrador = 'Sim';
      return isAdministrador;
    }
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
        <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4">
          <div className="flex flex-row-reverse pr-6">
            <p className="text-xs">{props.currentUser.email}</p>
          </div>
          <div className="flex flex-row-reverse pr-6">
            <p className="text-lg font-semibold">Administrador</p>
          </div>
          <div className="flex flex-row pl-6">
            <p className="text-xl font-semibold">Gerenciar Cadastro de Servidores</p>
          </div>
        </div>

        {/* Content two */}
        <div className="pt-4 pl-8 pr-8 mb-4">
          <div className="mt-0 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="" method="POST">
                  {/* Begin Card */}

                  <div className="bg-white px-4 py-5 sm:p-6">

                  </div>

                  <div className="row flex flex-row-reverse align-middle px-4 mt-1">

                    <div className="col mr-2">
                      <div className="col mr-2">
                        <Button id="btnNew" label="NOVO SERVIDOR" severity="sucess" raised onClick={create} />
                      </div>
                    </div>
                  </div>

                  <div className="">

                  </div>
                  {/* </div> */}
                  {/* End Card */}
                </form>

                <div className="row">

                </div>
                <br />
                <div className="row">
                  <div className="">
                    <div className="pt-4 pl-8 pr-8 mb-4">
                      <div className="card">
                        <DataTable value={contasServidorList} paginator rows={10} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
                          selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
                          stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="Conta servidor não encontrada!" tableStyle={{ minWidth: '50rem' }}>
                          <Column className="text-sm" field="nome" header="Nome" sortable style={{ width: '25%' }}></Column>
                          <Column className="text-sm" field="email" header="E-mail" sortable sortField="email" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                          <Column className="text-sm" field="matriculaSIAPE" header="Matrícula" sortable sortField="matriculaSIAPE" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                          <Column className="text-sm" field="campus" header="Campus" sortable sortField="campus" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                          <Column className="text-sm" field="role" header="Cargo" sortable sortField="cargo" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                          <Column className="text-sm" field="admin" header="Administrador" body={dateBodyIsAdminFalseTrue} sortable sortField="isAdmin" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
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

export default memo(ListarContasServidor);

