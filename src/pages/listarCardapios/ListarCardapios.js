import React, {  useEffect, useState, useRef, memo } from "react";
// import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import CardapioSemanalApiService from "../../services/CardapioSemanalApiService";
import MenuNutricionista from "../../components/MenuNutricionista";
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

const ListarCardapios = (props) => {
  
  const service = new CardapioSemanalApiService();
  const [cardapios, setCardapios] = useState([]);
  const [id, setId] = useState(0);
  // const [deleteBeneficiarioDialog, setDeleteBeneficiarioDialog] = useState(false);
  const toast = useRef(null);
  
  const [CardapiosList, setCardapiosList] = useState(null);
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
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editCardapio(rowData.id)} />
        <Button icon="pi pi-trash" rounded outlined style={{ marginLeft: '6px' }} severity="danger" onClick={() => deleteCardapio(rowData.id)} />
      </React.Fragment>
    );
  };

  useEffect(() => {
    
            const loadCardapios = async () => {
            const response = await service.getAll('/buscarTodos')
            setCardapiosList(response.data);
        };
        loadCardapios(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []
  );
  
  
  const deleteCardapio = (id) => {
    service
      .delete(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
      props.history.push('/listarCardapios')
  };

  const editCardapio = (id) => {
    props.history.push(`/atualizarCardapio/${id}`);
  };

  const createCardapio = () => {
    props.history.push(`/cadastrarCardapio`);
  };
  


  const find = (id) => {
        
    service
      .get(`/buscarPorID/${id}`)
      .then((response) => {
        const cardapio = response.data;
        const id = cardapio.id;
 
        setId(id);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
    
  const findAll = () => {
      service
      .getAll("/buscarTodos")
      .then((response) => {
        const cardapios = response.data;
        setCardapios({ cardapios: cardapios });
        console.log(cardapios);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="container-fluid h-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
        {/*Col left  */}
        <div className="w-[220px] flex-shrink flex-grow-0 px-0">
          {/* Side Menu */}
          <MenuNutricionista /> 
        </div>
        {/* Col right */}
        <div className="w-full">
          {/* Header */}
          <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
            <div className="flex flex-row-reverse pr-6">
                <p className="text-xs">{props.currentUser.email}</p>
            </div>
            <div className="flex flex-row-reverse pr-6">
              <p className="text-lg font-semibold">Nutricionista</p>
            </div>
            <div className="flex flex-row pl-6">
              <p className="text-xl font-semibold">Gerenciar Cardápios</p>
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
                      <div className="col mr-2">
                        <Button id="btnNew" label="NOVO CARDÁPIO" severity="sucess" raised onClick={createCardapio} />
                      </div>
                    </div>
                  </form>

                  <div className="row">
                    
                  </div>
                  <br />
                  <div className="row">
                    <div className="">
                      <div className="pt-4 pl-8 pr-8 mb-4">
                          <div className="card">
                            <DataTable value={CardapiosList} paginator rows={10} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
                              selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
                              stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="Refeição não encontrada!" tableStyle={{ minWidth: '50rem' }}>
                              <Column className="text-sm" field="cardapio.tipoRefeicao" header="Tipo" sortable style={{ width: '25%' }}></Column>
                              <Column className="text-sm" field="diaRefeicao" header="Dia da Refeição" sortable style={{ width: '25%' }}></Column>
                              <Column className="text-sm" field="cardapio.descricao" header="Descrição da Refeição" sortable sortField="descricao" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
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

export default memo(ListarCardapios);