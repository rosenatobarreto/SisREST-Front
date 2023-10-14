import React, { useEffect, useState, useRef, memo } from "react";

import ConfirmarPresencaApiService from "../../services/ConfirmarPresencaApiService";
import MenuAluno from "../../components/MenuAluno";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import ListaDiariaApiService from "../../services/ListaDiariaApiService";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';
import { formatDateBr } from "../../util/FormatDate";



const ConfirmarPresenca = (props) => {

  const servicePresenca = new ConfirmarPresencaApiService();
  const serviceListaDiaria = new ListaDiariaApiService();
  // const service = new ListaDiariaApiService();

  // const [id, setId] = useState(0);
  // const [beneficiario, setBeneficiario] = useState(0);
  // const [listaDiaria, setListaDiaria] = useState(0);
  // const [confirmadoEm, setConfirmadoEm] = useState('');
  // const [compareceuEm, setCompareceuEm] = useState('');
  const [listBeneficiario, setListBeneficiario] = useState([]);
  const [listListaDiaria, setListListaDiaria] = useState([]);
  const [filteredListaDiaria, setFilteredListaDiaria] = useState(null);
  const [filteredBeneficiario, setFilteredBeneficiario] = useState(null);
  // const [searchBeneficiario, setSearchBeneficiario] = useState(null);
  const [listaDiariaId, setListaDiariaId] = useState(null);
  const [listasDiarias, setListasDiarias] = useState([]);
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



  // const searchListaDiaria = (event) => {
  //   setTimeout(() => {
  //     let _filteredListaDiaria;
      
  //     if (!event.query.trim().length) {
  //       _filteredListaDiaria = [...listasDiarias];
  //     } else {
  //       _filteredListaDiaria = listasDiarias.filter((listaDiaria) => {
  //         return listaDiaria.id.toLowerCase().startsWith(event.query.toLowerCase())
  //       });
  //     }
  //     setFilteredListaDiaria(_filteredListaDiaria);
  //   }, 250);
  // }
  
  // const selectOneListaDiaria = (props) => {
  //   props.map(listaDiaria => {
  //     setListaDiariaId(listaDiaria.id);
  //     console.log('edital:', listaDiaria);
  //    })
  // }

  // useEffect(() => {

  //   const listasSelecionadas = [];


  //   const loadListas = async () => {

  //     const response = await service.get('/buscarTodos');
  //     const listasSelected = response.data.map(lista => {
        
  //       // dataVigente = new Date(lista.vigenteFinal)

  //       // if (dataVigente.getFullYear() === dataAtual.getFullYear()) {
  //         listasSelecionadas.push(lista);
  //       // }
  //     })
  //     setListasDiarias(listasSelecionadas);
  //   };
  //   loadListas();

  // }, []
  // );

 



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

  const header = renderHeader();

  // findById = (id) => {
        
  //   this.serviceBeneficiario.get(`/buscarPorID/${id}`)
  //     .then((response) => {
  //       const beneficiario = response.data;
  //       const id = beneficiario.id;
  //       const ativo = beneficiario.ativo;
  //       const editalNumero = beneficiario.edital.numero;
  //       const editalAno = beneficiario.edital.ano;
  //       const editalNome = beneficiario.edital.nome;
  //       const editalLink = beneficiario.edital.link;
  //       const editalVigenteInicio = beneficiario.edital.vigenteInicio;
  //       const editalVigenteFinal = beneficiario.edital.vigenteFinal;
  //       const contaEstudanteNome = beneficiario.contaEstudante.nome;
  //       const contaEstudanteEmail = beneficiario.contaEstudante.email;
  //       const contaEstudanteMatricula = beneficiario.contaEstudante.matricula;

  //         this.setState({id:id, ativo:ativo,editalNumero:editalNumero,editalNome:editalNome,
  //           editalAno:editalAno,editalLink:editalLink,editalVigenteInicio:editalVigenteInicio,
  //           editalVigenteFinal:editalVigenteFinal,contaEstudanteNome:contaEstudanteNome,
  //           contaEstudanteEmail:contaEstudanteEmail,contaEstudanteMatricula:contaEstudanteMatricula});
        
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  //   };

  const confirmar = (id) => {
    setListaDiariaId(id);
  };

  console.log('lista diaria',listaDiaria)

  const actionBodyTemplate = (rowData) => {

    return (
      <React.Fragment>
        {/* <Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => detailsBeneficiario(rowData.id)} /> */}
        <Button icon="pi pi-check" rounded outlined className="mr-2" onClick={() => confirmar(rowData.id)} />
        {/* <Button icon="pi pi-trash" rounded outlined style={{ marginLeft: '6px' }} severity="danger" onClick={() => deleteEdital(rowData.id)} /> */}
      </React.Fragment>
    );
  };

  useEffect(() => {

    const loadListas = async () => {
      const response = await serviceListaDiaria.getAll('/buscarTodos')
      setListListaDiaria(response.data);
    };
    loadListas();
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []
  );


  const find = (id) => {

    serviceListaDiaria
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
    serviceListaDiaria
      .get("/buscarTodos")
      .then((response) => {
        const listaDiaria = response.data;
        setListListaDiaria({ listaDiaria: listaDiaria });
        console.log(listaDiaria);
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

  const dateBodyTemplateConfirmado = (rowData) => {  
    return formatDateBr(rowData.confirmadoEm);
  };
  
  const dateBodyTemplateCompareceu = (rowData) => { 
    if (rowData.compareceuEm !== null){ 
      return formatDateBr(rowData.compareceuEm);
    } 
  };

  console.log(listListaDiaria)
  return (
    <div className="container-fluid h-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
      {/*Col left  */}
      <div className="w-[220px] flex-shrink flex-grow-0 px-0">
        {/* Side Menu */}
        <MenuAluno />
      </div>
      {/* Col right */}
      <div className="w-full">
        {/* Header */}
        <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
          <div className="flex flex-row-reverse pr-6">
            <p className="text-xs">{props.currentUser.email}</p>
          </div>
          <div className="flex flex-row-reverse pr-6">
            <p className="text-lg font-semibold">Estudante</p>
          </div>
          <div className="flex flex-row pl-6">
            <p className="text-xl font-semibold">Lista Diária - Confirmar Presença</p>
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
                  <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      {/* <label className="block text-sm font-medium text-gray-700">
                        Edital selecionado:
                      </label> */}
                      {/* <p className="block text-sm font-medium ml-4 mb-4" id="labelEdital">{numero}-{ano} - {tituloEdital}</p> */}

                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      {/* <label className="block text-sm font-medium text-gray-700 mt-6">
                        Lista selecionada:
                      </label> */}
                      <p className="block text-sm font-medium ml-4" id="labelEstudante">
                        {/* Nome: {nomeEstudante}<br />
                        CPF: {cpf}<br />
                        Matrícula: {matriculaEstudante}<br />
                        Email: {emailEstudante}<br />
                        Programa: {programa}<br /> */}
                        </p>
                    </div>


                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <div className="row flex justify-content gap-10 mt-6 ">
                        <div className="">
                          {/* <p className="mb-1 text-sm font-semibold text-gray-700">Selecione a lista</p> */}
                          {/* <div className="card flex justify-content-center"> */}
                            {/* <AutoComplete
                              className="w-full"
                              field="nome"
                              multiple value={listaDiaria}
                              suggestions={filteredListaDiaria}
                              completeMethod={searchListaDiaria}
                              onChange={(e) => selectOneListaDiaria(e.target.value)}
                            /> */}
                          {/* </div> */}

                        </div>
                        <div className="row">
                          {/* <p className="mb-1 text-sm font-semibold text-gray-700">Selecione o Beneficiario</p> */}
                          {/* <div className="card flex justify-content-center">
                            <AutoComplete
                              className="w-full"
                              field="nome"
                              multiple value={beneficiario}
                              suggestions={filteredBeneficiario}
                              completeMethod={searchBeneficiario}
                              onChange={(e) => selectOneContaEstudante(e.target.value)}
                            />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  {/* </div> */}
                  {/* End Card */}
                </form>
                <br />
                <div className="row">
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mt-6">
                        Lista diária de refeições:
                      </label>
                    <div className="pt-4 pl-8 pr-8 mb-4">
                      <div className="card">
                      <Tooltip target=".export-buttons>button" position="bottom" />
                        <DataTable value={listListaDiaria} paginator rows={10} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
                          selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)} selectionMode="single" dataKey="id"
                          stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="Item não encontrado!" tableStyle={{ minWidth: '50rem' }}>
                          <Column className="text-sm" field="refeicao.descricao" header="Refeiçao" sortable sortField="nome" filterPlaceholder="Search" style={{ width: '55%' }}></Column>
                          <Column className="text-sm" field="refeicao.tipoDeRefeicao" header="Tipo" sortable sortField="nome" filterPlaceholder="Search" style={{ width: '25%' }}></Column>
                          {/* <Column className="text-sm" field="confirmadoEm" header="Confirmado em" body={dateBodyTemplateConfirmado} dataType="date" sortable style={{ width: '25%' }}></Column> */}
                          {/* <Column className="text-sm" field="compareceuEm" header="Compareceu em" body={dateBodyTemplateCompareceu} dataType="date" sortable sortField="ano" filterPlaceholder="Search" style={{ width: '25%' }}></Column> */}
                          <Column header="Selecionar" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
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

export default memo(ConfirmarPresenca);