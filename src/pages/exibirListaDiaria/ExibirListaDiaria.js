import React, {  useEffect, useState, useRef, memo } from "react";
// import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import MenuAdministrador from "../../components/MenuAdministrador";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { ProgressBar } from 'primereact/progressbar';
import { Slider } from 'primereact/slider';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const ListarBeneficiarios = (props) => {
  
  const service = new BeneficiarioApiService();
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [id, setId] = useState(0);
  const [deleteBeneficiarioDialog, setDeleteBeneficiarioDialog] = useState(false);
  const toast = useRef(null);
  
  const [beneficiariosList, setBeneficiariosList] = useState(null);
  const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });

    const [selectedCustomer, setSelectedCustomer] = useState(null);

  //   const accept = () => {
  //       toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Confirma a exclusão?', life: 3000 });
  //   }

  //   const reject = () => {
  //       toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Exclusão rejeitada!', life: 3000 });
  //   }
  
  // const confirm1 = () => {
  //     confirmDialog({
  //       message: 'Confirma a exclusão?',
  //       header: 'Confirmation',
  //       icon: 'pi pi-exclamation-triangle',
  //       accept,
  //       reject
  //     });
  // };
    

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
        <Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => detailsBeneficiario(rowData.id)} />
        <Button icon="pi pi-pencil" rounded outlined style={{ marginLeft: '6px' }} className="mr-2" onClick={() => editBeneficiario(rowData.id)} />
        <Button icon="pi pi-trash" rounded outlined  style={{ marginLeft: '6px' }} className="" severity="danger" onClick={() => deleteBeneficiario(rowData.id)} />
      </React.Fragment>
    );
  };

  // const editBeneficiario = (beneficiario) => {
  //   console.log(beneficiario.contaEstudante.nome)
  //   // setProduct({ ...product });
  //   // setProductDialog(true);
  // };

  useEffect(() => {
    
            const loadBeneficiarios = async () => {
            const response = await service.get('/buscarTodos')
            setBeneficiariosList(response.data);
        };
        loadBeneficiarios(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []
  );
  
  // const confirmDeleteBeneficiario = (rowData) => {
  //   // setProduct(product);
    
  //   if (deleteBeneficiarioDialog === true){
  //     deleteBeneficiario(rowData.id);


  // };
  
  const deleteBeneficiario = (id) => {
    service
      .delete(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
      props.history.push('/listarBeneficiarios')
  };

  const editBeneficiario = (id) => {
    props.history.push(`/atualizarBeneficiario/${id}`);
  };

  const detailsBeneficiario = (id) => {
    props.history.push(`/detalharBeneficiario/${id}`);
  };

  const createBeneficiario = () => {
    props.history.push(`/cadastrarBeneficiario`);
  };
  


  const find = (id) => {
        
    service
      .get(`/buscarPorID/${id}`)
      .then((response) => {
        const beneficiario = response.data;
        const id = beneficiario.id;
 
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
        const beneficiarios = response.data;
        setBeneficiarios({ beneficiarios });
        console.log(beneficiarios);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  
  const importarDadosEdital = () => {
    props.history.push("/importarBeneficiarios");
  };


  // carregarDados = () => {
  //   const [beneficiario, setBeneficiario] = useContext(BeneficiarioContext);

  //   return (
  //     <div>
  //       Olá {beneficiario.contaEstudanteNome}
  //       {/* <button onClick={() => setUser(false)}>Sair</button> */}
  //     </div>
  //   );
  // };
  
  // view = () => {
  //   // const [beneficiario, setBeneficiario] = useContext(Context);
  //   // <h3>{beneficiario}</h3>
  //   // setBeneficiario(beneficiario)

  //   const [, setBeneficiario] = useContext(BeneficiarioContext);

  // return <button onClick={() => setBeneficiario({ contaEstudanteNome: "Bruno" })}>Entrar</button>;
  // }

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
              <p className="text-xl font-semibold">Gerenciar Beneficiários</p>
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
                  <form action="#" >
                    <div className="row flex flex-row-reverse align-middle px-4 mt-1">
                      <div className="col ml-2">
                        <Button id="btnImport" label="IMPORTAR DADOS DO EDITAL" className="bg-green-500" raised onClick={importarDadosEdital} />
                      </div> 
                      <div className="col mr-2">
                        <Button id="btnNew" label="NOVO BENEFICIÁRIO" severity="sucess" raised onClick={createBeneficiario} />
                      </div>
                    </div>
                  </form>

                  <div className="row">
                    
                  </div>
                  <br />
                  <div className="row">
                    <div className="">
                      <div className="pt-4 pl-8 pr-8 mb-4">
                        
                          {/* <BeneficiariosTable
                            beneficiarios={beneficiarios}
                            delete={apagar}
                            edit={edit}
                            view={view}
                            id="idEdit"
                          /> */}

                          {/* <div className="card">
                            <DataTable value={beneficiarios} filters={filters} header={header} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                              <Column field="contaEstudante.nome" sortable header="Nome" ></Column>
                              <Column field="ativo" header="Ativo" ></Column>
                              <Column field="programa" sortable header="Programa" ></Column>
                              <Column field="contaEstudante.email" header="E-mail" ></Column>
                              {/* <Column field="vigenteFinal" header="Fim da vigência" ></Column> 
                              <Column header="Ações" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                            </DataTable>
                          </div> */}
                          <div className="card">
                            <DataTable value={beneficiariosList} paginator rows={10} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
                              selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
                              stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="Beneficiário não encontrado!" tableStyle={{ minWidth: '50rem' }}>
                              <Column className="text-sm" field="contaEstudante.nome" header="Nome" sortable style={{ width: '25%' }}></Column>
                              <Column className="text-sm" field="edital.nome" header="Edital" sortable style={{ width: '25%' }}></Column>
                              <Column className="text-sm" field="programa" header="Programa" sortable sortField="programa" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                              {/* <Column header="programa" sortable sortField="representative.name" filter filterField="representative" */}
                                {/* showFilterMatchModes={false} filterElement={representativeFilterTemplate} filterMenuStyle={{ width: '14rem' }} style={{ width: '25%' }} ></Column> */}
                              <Column className="text-sm" field="contaEstudante.email" header="E-mail" 
                              // body={statusBodyTemplate} sortable filter filterElement={statusFilterTemplate} 
                              filterMenuStyle={{ width: '14rem' }} style={{ width: '25%' }}></Column>
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

export default memo(ListarBeneficiarios);