import React, {  useEffect, useState, useRef, memo } from "react";

import PedidoAcessoApiService from "../../services/PedidoAcessoApiService";

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
import { formatDateBr } from "../../util/FormatDate";


const PedirAcessoValidar = (props) => {
  
  const service = new PedidoAcessoApiService();
  const [pedidosAcesso, setPedidosAcesso] = useState([]);
  const [id, setId] = useState(0);
  const toast = useRef(null);
  const [pedidosList, setPedidosList] = useState([]);
  const [refeicoesListConverted, setRefeicoesListConverted] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
  });
  
  const [selectedCustomer, setSelectedCustomer] = useState(null);

//   const tipos = [
//     { name: 'CAFE_MANHA', key: 'Café da Manhã' },
//     { name: 'LANCHE_MANHA', key: 'Lanche da Manhã' },
//     { name: 'ALMOCO', key: 'Alomoço' },
//     { name: 'LANCHE_TARDE', key: 'Lanche da Tarde' },
//     { name: 'JANTAR', key: 'Jantar' },
//     { name: 'CEIA', key: 'Ceia' }
//   ];

//     const restricoesList = [
//     { name: 'DIABETES', key: 'Diabetes' },
//     { name: 'INTOLERANCIA_LACTOSE', key: 'Intolerância à Lactose' },
//     { name: 'INTOLERANCIA_GLUTEN', key: 'Intolerância à Glúten' },
//     { name: 'ALERGIAS', key: 'Alergias' },
//     { name: 'HIPERTENSO', key: 'Hipertenso' },
//     { name: 'VEGANO', key: 'Vegano' }
//   ];
    
  // const [deleteBeneficiarioDialog, setDeleteBeneficiarioDialog] = useState(false);

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
        <Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => detalharPedido(rowData.id)} />
        {/* <Button icon="pi pi-trash" rounded outlined severity="danger" style={{ marginLeft: '6px' }} onClick={() => deleteRefeicao(rowData.id)} /> */}
      </React.Fragment>
    );
  };
  
  useEffect(() => {
    
    const loadPedidos = async () => {
      const response = await service.getAll('/buscarTodos')
      setPedidosList(response.data);
    };
    loadPedidos(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []
  );
  
//   const deleteRefeicao = (id) => {
//     service
//       .delete(id)
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//       props.history.push('/listarRefeicoes')
//   };

  const detalharPedido = (id) => {
    props.history.push(`/validarPedidoAcesso/${id}`);
  };

  const find = (id) => {
        
    service
      .get(`/buscarPorID/${id}`)
      .then((response) => {
        const pedidoAcesso = response.data;
        const id = pedidoAcesso.id;
 
        setId(id);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
    
  // const findAll = () => {
  //     service
  //     .getAll("/buscarTodos")
  //     .then((response) => {
  //       const pedidos = response.data;
  //       setPedidosAcesso({ pedidos: pedidos });
  //       console.log(pedidos);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };

  const dateBodyTemplateSolicitado = (rowData) => {
    
    return formatDateBr(rowData.solicitadoEm);
  };

  const dateBodyTemplateAnalisado = (rowData) => {
    const dateNull = '';
    if (rowData.analisadoEm === null) {
      return dateNull;
    } else {

      return formatDateBr(rowData.analisadoEm);
    }
  };

  const dateBodyTemplateAprovacao = (rowData) => {
    
    if (rowData.aprovado === false) {
      const naoAprovado = 'Não';
      return naoAprovado;
    } 
    else if (rowData.aprovado === true) {
      const aprovado = 'Sim';
      return aprovado;
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
          <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
            <div className="flex flex-row-reverse pr-6">
                <p className="text-xs">{props.currentUser.email}</p>
            </div>
            <div className="flex flex-row-reverse pr-6">
              <p className="text-lg font-semibold">Administrador</p>
            </div>
            <div className="flex flex-row pl-6">
              <p className="text-xl font-semibold">Avaliar Pedidos</p>
            </div>
          </div>

          {/* Content two */}
          <div className="pt-4 pl-8 pr-8 mb-4">
            <div className="mt-0 sm:mt-0">
              <div className="md:grid md:grid-cols-1 md:gap-6">
                <div className="md:col-span-1">

                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  {/* <form action="#" >
                    <div className="row flex flex-row-reverse align-middle px-4 mt-1">
                      <div className="col mr-2">
                        <Button id="btnNew" label="NOVA REFEIÇÃO" severity="sucess" raised onClick={createRefeicao} />
                      </div>
                    </div>
                  </form> */}

                  <div className="row">
                    
                  </div>
                  <br />
                  <div className="row">
                    <div className="">
                      <div className="pt-4 pl-8 pr-8 mb-4">
                          <div className="card">
                            <DataTable value={pedidosList} paginator rows={10} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
                              selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
                              stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="Pedido não encontrado!" tableStyle={{ minWidth: '50rem' }}>
                              <Column className="text-sm" field="solicitadoEm" filterField="date" dataType="date" header="Solicitado" sortable body={dateBodyTemplateSolicitado} style={{ width: '10%' }}></Column>
                              <Column className="text-sm" field="analisadoEm" filterField="date" dataType="date" header="Analisado" sortable body={dateBodyTemplateAnalisado} style={{ width: '10%' }}></Column>
                              <Column className="text-sm" field="beneficiario.contaEstudante.nome" header="Estudante" sortable filterPlaceholder="Search" style={{ width: '50%' }}></Column>
                              {/* <Column className="text-sm" field="beneficiario.situacao" header="Situação" sortable sortField="situacao" filterPlaceholder="Search" style={{ width: '10%' }}></Column> */}
                              <Column className="text-sm" field="acessosDiaRefeicao.length" header="Quant. Refeições" sortable filterPlaceholder="Search" style={{ width: '10%' }}></Column>
                              <Column className="text-sm" field="aprovado" header="Aprovado" sortable body={dateBodyTemplateAprovacao} style={{ width: '10%' }}></Column>
                              <Column header="Detalhes/Validar" body={actionBodyTemplate} exportable={false} style={{ width: '10%', align: 'center' }}></Column>
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

export default memo(PedirAcessoValidar);