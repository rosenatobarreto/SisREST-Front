import React, { useEffect, useState, useRef, memo } from "react";
// import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import ConfirmarPresencaApiService from "../../services/ConfirmarPresencaApiService";
import MenuAdministrador from "../../components/MenuAdministrador";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import { formatDateBr } from "../../util/FormatDate";

const ListaDiaria = (props) => {

  const service = new ConfirmarPresencaApiService();

  const [id, setId] = useState(0);
  const [beneficiario, setBeneficiario] = useState(0);
  const [listaDiaria, setListaDiaria] = useState(0);
  const [confirmadoEm, setConfirmadoEm] = useState('');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  const [compareceuEm, setCompareceuEm] = useState('');
  const [listaPresenca, setListaPresenca] = useState([]);
  const [editaisList, setEditaisList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
  });
  const dt = useRef(null);
  const cols = [
    { field: 'beneficiario.contaEstudante.nome', header: 'Estudante' },
    { field: 'beneficiario.contaEstudante.matricula', header: 'Matrícula' },
    { field: 'confirmadoEm', header: 'Confirmado Em' },
    { field: 'compareceuEm', header: 'Compareceu Em' }
    
  ];

  
  // const exportTable = () => {
    
  //   const exportCol = selectedCustomer.map((col) => ({ title: col.header, dataKey: col.field }));
  //   return exportCol;
  // }

  const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };
    _filters['global'].value = value;

    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters['global'] ? filters['global'].value : '';

    return (
      <>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Pesquise na tabela" />
        </span>
        
      </>

    );
  };

  //  const header = renderHeader();

  const actionBodyTemplate = (rowData) => {

    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => edit(rowData.id)} />
        {/* <Button icon="pi pi-trash" rounded outlined style={{ marginLeft: '6px' }} severity="danger" onClick={() => delete(rowData.id)} /> */}
      </React.Fragment>
    );
  };

  useEffect(() => {

    const loadPresencas = async () => {
      const response = await service.getAll('/buscarTodos')
      setListaPresenca(response.data);
    };
    loadPresencas();
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []
  );


  // const delete = (id) => {
  //   service
  //     .delete(id)
  //     .then((response) => {
  //       // props.history.push(`/listarEditais`);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };

  const edit = (id) => {
    // props.history.push(`/atualizarEdital/${editalId}`);
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
        const presencas = response.data;
        setListaPresenca({ presencas: presencas });
        console.log(presencas);
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

  //Seção exportação de lista
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, listaPresenca);
        doc.save('listaPresenca.pdf');
      });
    });
  };

  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(listaPresenca);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, 'listaPresenca');
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
        {/* <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" /> */}
        {/* <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" /> */}
        <Button type="button" icon="pi pi-file-pdf" severity="danger" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
    </div>
);

const dateBodyTemplateConfirmado = (rowData) => {  
  return formatDateBr(rowData.confirmadoEm);
};

const dateBodyTemplateCompareceu = (rowData) => { 
  if (rowData.compareceuEm !== null){ 
    return formatDateBr(rowData.compareceuEm);
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
            <p className="text-xl font-semibold">Gerenciar Lista Diária</p>
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
                  {/* <div className="row flex flex-row-reverse align-middle px-4 mt-1">
                      <div className="col mr-2">
                        <Button id="btnNew" label="NOVO EDITAL" severity="sucess" raised onClick={createEdital} />
                      </div>
                    </div> */}

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
                      <Tooltip target=".export-buttons>button" position="bottom" />
                        <DataTable value={listaPresenca} paginator rows={10} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
                          selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
                          stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="Item não encontrado!" tableStyle={{ minWidth: '50rem' }}>
                          {/* {cols.map((col, index) => (
                            <Column key={index} field={col.field} header={col.header} body={cols}/>
                            ))} */}
                          <Column className="text-sm" field="beneficiario.contaEstudante.nome" header="Estudante" sortable sortField="nome" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                          <Column className="text-sm" field="beneficiario.contaEstudante.matricula" header="Matrícula" sortable sortField="nome" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                          <Column className="text-sm" field="confirmadoEm" header="Confirmado em" body={dateBodyTemplateConfirmado} dataType="date" sortable style={{ width: '25%' }}></Column>
                          <Column className="text-sm" field="compareceuEm" header="Compareceu em" body={dateBodyTemplateCompareceu} dataType="date" sortable sortField="ano" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
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

export default memo(ListaDiaria);