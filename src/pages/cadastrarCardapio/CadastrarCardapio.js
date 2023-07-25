import React, { useEffect, useState, useRef, memo } from "react";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import RefeicaoApiService from "../../services/RefeicaoApiService";
import EditalApiService from "../../services/EditalApiService";
import CardapioSemanalApiService from "../../services/CardapioSemanalApiService";
import MenuNutricionista from "../../components/MenuNutricionista";

import { AutoComplete } from 'primereact/autocomplete';
import { InputMask } from 'primereact/inputmask';
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import { Editor } from 'primereact/editor';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputSwitch } from 'primereact/inputswitch';

const CadastrarCardapio = (props) => {

  const serviceRefeicao = new RefeicaoApiService();
  const serviceEdital = new EditalApiService();
  const service = new CardapioSemanalApiService();

  const [sequenciaSemanal, setSequenciaSemanal] = useState(0);

  const [edital, setEdital] = useState(0);
  const [numero, setNumero] = useState(0);
  const [ano, setAno] = useState(0);
  const [tituloEdital, setTituloEdital] = useState('');

  const [itensCardapioDia, setItensCardapioDia] = useState([]);
  const [diaDaSemana, setDiaDaSemana] = useState('');
  const [refeicoes, setRefeicoes] = useState([]);
  const [refeicaoId, setRefeicaoId] = useState(0);

  const [refeicao, setRefeicao] = useState('');
  const [tipoRefeicao, setTipoRefeicao] = useState('');
  const [descricaoRefeicao, setDescricaoRefeicao] = useState('');
  const [restricoes, setRestricoes] = useState([]);
  const [selectedRefeicoes, setSelectedRefeicoes] = useState([]);
  const [refeicoesList, setRefeicoesList] = useState([]);
  const [refeicoesEscolhidas, setRefeicoesEscolhidas] = useState([]);
  const [cardapioSemanal, setCardapioSemanal] = useState(0);
  const [editais, setEditais] = useState([]);

  const [selectedEditais, setSelectedEditais] = useState(null);
  const [filteredEditais, setFilteredEditais] = useState(null);
  const [filteredRefeicoes, setFilteredRefeicoes] = useState(null);
  const [metaKey, setMetaKey] = useState(false);
  const [rowClick, setRowClick] = useState(true);

  const handleChange = (setState) => (event) => { setState(event.target.value) }

  const toast = useRef(null);
  const msgs = useRef(null);

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Pedido cadastrado com sucesso!', life: 3000 });
  }

  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'O pedido não pôde ser cadastrado!', life: 3000 });
  }

  const showSuccessAddRefeicao = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Refeições adicionadas!', life: 3000 });
  }

  const addMessages = () => {
    msgs.current.show([
      { severity: 'success', summary: 'Success', detail: 'Sequência Semanal e Dia da refeição adicionados ao Cardápio!', sticky: true, closable: false },
      // { severity: 'info', summary: 'Info', detail: 'Message Content', sticky: true, closable: false },
      // { severity: 'warn', summary: 'Warning', detail: 'Message Content', sticky: true, closable: false },
      { severity: 'error', summary: 'Error', detail: 'Itens não adicionados ao Cardápio!', sticky: true, closable: false }
    ]);
  };

  // const clearMessages = () => {
  //   msgs.current.clear();
  // };

const onRowSelect = (event) => {
  captureIdRefeicoes()
  toast.current.show({ severity: 'info', summary: 'Refeição selecionada!', detail: `${''}`, life: 3000 });
};

// const onRowUnselect = (event) => {
//     toast.current.show({ severity: 'warn', summary: 'Refeição não selecionada', detail: `Name: ${event.data.name}`, life: 3000 });
// };

  const captureIdRefeicoes = () => {
    // eslint-disable-next-line array-callback-return
    // refeicoes.forEach((refeicao, index) => {
    //   refeicoesEscolhidas.push(refeicao.id)
      
    // });
  }

  const addItemCardapioDia = (event) => {
    event.preventDefault();
    const refeicoes = [];
    refeicoesEscolhidas.forEach((refeicao, index) => {
      refeicoes.push(refeicao.id)
      
    });
    
    const elementosDoCardapioDia = { diaDaSemana, refeicoes };
    itensCardapioDia.push({ diaDaSemana, refeicoes });
    setRefeicoesEscolhidas(null);
  }
console.log('itensCardapioDia.push', itensCardapioDia);

  // const buttonAddItemCardapioDia = (event) => {
  //   event.preventDefault();
  //   addItemCardapioDia();
  // }


  // const addRefeicoesSelecionadas = (id, event) => {
  //   setRefeicoesSelecionadas(id);
  //   event.preventDefault();


  //   window.alert("Item adicionado!")

  //   // addRefeicoes();

  // }




  const validate = () => {
    const errors = [];
    return errors;
  };

  const create = (event) => {
    event.preventDefault();
    const errors = validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    service
      .create({
        sequenciaSemanal,
        edital,
        itensCardapioDia,
      })
      .then((response) => {
        console.log(response);
        console.log('Entrou no then');
        console.log('itensCardapioDia create', itensCardapioDia);
        showSuccessMessage("Cardápio cadastrado com sucesso!");
        // props.history.push("/listarRefeicoes");
      })
      .catch((error) => {
        console.log(error.response);
        showErrorMessage("O cardápio não pode ser cadastrado!");
      });
    console.log("request finished");
  };

  const cancel = () => {
    props.history.push("/listarRefeicoes");
  };

  // const findAllEditais = () => {
  //   serviceEdital
  //     .get("/buscarTodos")
  //     .then((response) => {
  //       const editais = response.data;
  //       setListEditais(editais);

  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };

  const findAllRefeicoes = () => {
    serviceRefeicao
      .get("/buscarTodos")
      .then((response) => {
        const refeicoes = response.data;
        setRefeicoesList(refeicoes);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };



  const searchEdital = (event) => {
    setTimeout(() => {
      let _filteredEditais;

      if (!event.query.trim().length) {
        _filteredEditais = [...editais];
      } else {
        _filteredEditais = editais.filter((edital) => {
          return edital.nome.toLowerCase().startsWith(event.query.toLowerCase())
        });
      }
      setFilteredEditais(_filteredEditais);
    }, 250);
  }

  const selectOneEdital = (props) => {
    props.map(edital => {
      setEdital(edital.id);
      setTituloEdital(edital.nome);
      setNumero(edital.numero);
      setAno(edital.ano);
      console.log('edital:', edital);
    })
  }

  // const searchRefeicao = (event) => {
  //   setTimeout(() => {
  //     let _filteredRefeicoes;

  //     if (!event.query.trim().length) {
  //       _filteredRefeicoes = [...refeicoes];
  //     } else {
  //       _filteredRefeicoes = refeicoes.filter((refeicao) => {
  //         return refeicao.descricao.toLowerCase().startsWith(event.query.toLowerCase())
  //       });
  //     }
  //     setFilteredRefeicoes(_filteredRefeicoes);

  //   }, 250);
  // }

  const selectOneRefeicao = (props) => {
    props.map(refeicao => {
      setRefeicao(refeicao.id);
      setTipoRefeicao(refeicao.tipoDeRefeicao);
      setDescricaoRefeicao(refeicao.descricao);
      setRestricoes(refeicao.restricoes);
      console.log('refeicao:', refeicao);
    })
  }


  useEffect(() => {

    let dataVigente;
    let dataAtual = new Date();
    const editaisSelecionados = [];
    const refeicoesSelecionadas = [];

    const loadEditais = async () => {

      const response = await serviceEdital.get('/buscarTodos');
      const editaisSelected = response.data.map(edital => {

        dataVigente = new Date(edital.vigenteFinal)

        if (dataVigente.getFullYear() === dataAtual.getFullYear()) {
          editaisSelecionados.push(edital);
        }
      })
      setEditais(editaisSelecionados);
    };
    loadEditais();

    console.log(refeicoesSelecionadas)

    captureIdRefeicoes()
    findAllRefeicoes()
    // const loadRefeicoes = async () => {

    //   const response = await serviceRefeicao.get('/buscarTodos');
    //   const refeicaoSelected = response.data.map(refeicao => {
    //     refeicoesSelecionadas.push(refeicao);
    //   })
    //   setRefeicoes(refeicoesSelecionadas);
    // };
    // loadRefeicoes();

    // const loadRefeicoesList = async () => {
    //   const response = await serviceRefeicao.getAll('/buscarTodos')
    //   setRefeicoesList(response.data);
    // };
    // loadRefeicoesList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []
  );

  console.log('>>Seleção')
  console.log('sequenciaSemanal', sequenciaSemanal)
  console.log('edital', edital)
  console.log('itensCardapioDia', itensCardapioDia)
  console.log('<<Seleção')
  console.log('selectedRefeicoes', selectedRefeicoes)
  console.log('Refeicoes: ', refeicoes)



  //   {
  //     "sequenciaSemanal": 1,
  //     "edital" : 1,
  //     "itensCardapioDia":[
  //         {
  //         "diaDaSemana":"SEGUNDA",
  //         "refeicoes": [1, 2]   
  //        },
  //        {
  //        "diaDaSemana":"SEXTA",
  //         "refeicoes": [3, 4] 
  //        }] 
  // }

  //Refeições

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    'nome': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
  });

  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
        <Button icon="pi pi-check" rounded outlined className="mr-2" onClick={(event) =>
          // addRefeicoesSelecionadas(rowData.id, event)
          captureIdRefeicoes()

        } />
      </React.Fragment>
    );
  };

  const editRefeicao = (id) => {
    props.history.push(`/atualizarRefeicao/${id}`);
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
            <p className="text-xl font-semibold">Cadastrar Cardápio</p>
          </div>
        </div>

        {/* Content two */}
        <div className="pt-4 pl-8 pr-8 mb-4">
          <div className="mt-0 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">
              {/* <div className="md:col-span-1">
                <div className="px-4 sm:px-0">

                </div>
              </div> */}
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="">
                  <div className="bg-white px-4 py-5 sm:p-6">

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <label className="block text-sm font-medium text-gray-700">
                        Edital selecionado: {numero}-{ano} - {tituloEdital}<br />
                        Sequência semanal: {sequenciaSemanal}<br />
                        Itens do cardápio - Dia da Semana: {diaDaSemana} <br />
                        <br />
                        
                      </label>
                      {/* <p className="block text-sm font-medium ml-4 mb-4" id="labelEdital">{numero}-{ano} - {tituloEdital}</p> */}
                    </div>

                    {/* Sequencia semanal */}
                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="sequencia"
                        className="block text-sm font-medium text-gray-700 mb-3">
                        Sequência Semanal
                      </label>
                      <div className="card flex justify-content-center">
                        <div className="flex flex-wrap gap-3">
                          {/* <div className="flex align-items-center">
                            <RadioButton inputId="sequencia1" name="sequencia" value="sequencia" onChange={handleChange(setSequenciaSemanal)} checked={sequenciaSemanal === 'Semana 1'} />
                            <label htmlFor="sequencia1" className="ml-2">Semana 1</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="sequencia2" name="sequencia" value="sequencia" onChange={handleChange(setSequenciaSemanal)} checked={sequenciaSemanal === 'Semana 2'} />
                            <label htmlFor="sequencia2" className="ml-2">Semana 2</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="sequencia3" name="sequencia" value="sequencia" onChange={handleChange(setSequenciaSemanal)} checked={sequenciaSemanal === 'Semana 3'} />
                            <label htmlFor="sequencia3" className="ml-2">Semana 3</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="sequencia4" name="sequencia" value="sequencia" onChange={handleChange(setSequenciaSemanal)} checked={sequenciaSemanal === 'Semana 4'} />
                            <label htmlFor="sequencia4" className="ml-2">Semana 4</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="sequencia5" name="sequencia" value="sequencia" onChange={handleChange(setSequenciaSemanal)} checked={sequenciaSemanal === 'Semana 5'} />
                            <label htmlFor="sequencia5" className="ml-2">Semana 5</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="sequencia6" name="sequencia" value="sequencia" onChange={handleChange(setSequenciaSemanal)} checked={sequenciaSemanal === 'Semana 6'} />
                            <label htmlFor="sequencia6" className="ml-2">Semana 6</label>
                          </div> */}

                          <select className="rounded-md border border-gray-300 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm md:w-10rem"
                            id="selectSequencia" value={sequenciaSemanal}
                            // onChange={handleChange(setSequenciaSemanal)}
                            onChange={(e) => setSequenciaSemanal(e.target.value)}
                          >
                            <option>Selecione uma opção</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="1">Semana 1</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="2">Semana 2</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="3">Semana 3</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="4">Semana 4</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="5">Semana 5</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="6">Semana 6</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* .......... */}
                    <div className="col-span-12 sm:col-span-10 lg:col-span-12">
                      <div className="row flex justify-content gap-10 mt-6 ">
                        <div className="">
                          <p className="mb-1 text-sm font-semibold text-gray-700">Selecione um edital</p>
                          <div className="card flex justify-content-center">
                            <AutoComplete
                              className="w-full"
                              field="nome"
                              placeholder="Pesquisar..."
                              multiple value={selectedEditais}
                              suggestions={filteredEditais}
                              completeMethod={searchEdital}
                              onChange={(e) => selectOneEdital(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Divider className="border-2 border-x-green-950" />

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="diaRefeicao"
                        className="block text-sm font-medium text-gray-700 mt-2 mb-3">
                        Dia da Refeição (Escolha um dia)
                      </label>
                      <div className="card flex justify-content-center">
                        <div className="flex flex-wrap gap-3">

                          <select className="rounded-md border border-gray-300 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm md:w-10rem"
                            id="selectDia" value={diaDaSemana}
                            // onChange={handleChange(setDiaDaSemana)}
                            onChange={(e) => setDiaDaSemana(e.target.value)}
                          >
                            <option>Selecionar o dia</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="SEGUNDA">Segunda-feira</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="TERCA">Terça-feira</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="QUARTA">Quarta-feira</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="QUINTA">Quinta-feira</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="SEXTA">Sexta-feira</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="SABADO">Sábado</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="DOMINGO">Domingo</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Selecionar refeição */}
                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      {/* <label
                        htmlFor="diaRefeicao"
                        className="block text-sm font-medium text-gray-700 mt-2 mb-3">
                        Refeições disponíveis
                      </label> */}
                      <div className="row flex justify-content gap-10 mt-6 ">
                        <div className="">
                          <p className="mb-1 text-sm font-semibold text-gray-700">Selecione as refeições</p>
                          {/* <div className="card flex justify-content-center">
                            <AutoComplete
                              className="w-full"
                              field="refeicao"
                              multiple value={selectedRefeicoes}
                              suggestions={filteredRefeicoes}
                              completeMethod={searchRefeicao}
                              onChange={(e) => selectOneRefeicao(e.target.value)}
                            />
                          </div> */}
                          <div className="card">
                            <div className="flex justify-content-center align-items-center mb-4 gap-2">
                              {/* <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} />
                              <label htmlFor="input-rowclick">Row Click</label> */}
                            </div>
                            <DataTable 
                            // value={refeicoesList} selectionMode="multiple"
                            // selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)}  dataKey="id"
                            
                            paginator rows={10} header={header} filters={filters} onFilter={(e) => setFilters(e.filters)}
                              // metaKeySelection={metaKey} dragSelection
                              stateStorage="session" stateKey="dt-state-demo-local" emptyMessage="Refeição não encontrada!" tableStyle={{ minWidth: '50rem' }}
                            
                              value={refeicoesList} selectionMode={rowClick ? null : 'checkbox'} 
                            selection={refeicoesEscolhidas} onSelectionChange={(e) => setRefeicoesEscolhidas(e.value)} 
                            dataKey="id" onRowSelect={onRowSelect} 
                            
                            >
                              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                              <Column className="text-sm" field="tipoDeRefeicao" header="Tipo de Refeição" sortable style={{ width: '20%' }}></Column>
                              <Column className="text-sm" field="descricao" header="Descrição" sortable sortField="descricao" filterPlaceholder="Search" style={{ width: '75%' }}></Column>
                              {/* <Column className="text-sm" field="restricoes" header="Restrições da Refeição" sortable sortField="restricoes" filterPlaceholder="Search" style={{ width: '25%' }}></Column> */}
                              {/* <Column header="Selecione" body={actionBodyTemplate} exportable={false} style={{ minWidth: '10rem' }}></Column> */}
                            </DataTable>

                            {/* <DataTable value={products} selectionMode={rowClick ? null : 'checkbox'} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" tableStyle={{ minWidth: '50rem' }}>
                              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                              <Column field="code" header="Code"></Column>
                              <Column field="name" header="Name"></Column>
                              <Column field="category" header="Category"></Column>
                              <Column field="quantity" header="Quantity"></Column>
                            </DataTable> */}
                          </div>

                          <div className="card">
                            <div className="flex justify-content-center align-items-center mb-4 gap-2">
                              {/* <InputSwitch inputId="input-rowclick" checked={rowClick} onChange={(e) => setRowClick(e.value)} /> */}
                              {/* <label htmlFor="input-rowclick">Row Click</label> */}
                            </div>
{/*                             
                            <DataTable value={refeicoesList} selectionMode={rowClick ? null : 'checkbox'} 
                            selection={refeicoesEscolhidas} onSelectionChange={(e) => setRefeicoesEscolhidas(e.value)} 
                            dataKey="id" onRowSelect={onRowSelect} tableStyle={{ minWidth: '50rem' }}>
                              <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                              <Column className="text-sm" field="tipoDeRefeicao" header="Tipo de Refeição" sortable style={{ width: '20%' }}></Column>
                              <Column className="text-sm" field="descricao" header="Descrição" sortable sortField="descricao" filterPlaceholder="Search" style={{ width: '75%' }}></Column>
                            </DataTable> */}
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* <div className="card">
                      <div className="flex justify-content-center align-items-center mb-4 gap-2">
                        <InputSwitch inputId="input-metakey" checked={metaKey} onChange={(e) => setMetaKey(e.value)} />
                        <label htmlFor="input-metakey">MetaKey</label>
                      </div>
                      <DataTable value={refeicoesList} selectionMode="multiple" selection={selectedCustomer} onSelectionChange={(e) => setSelectedCustomer(e.value)}
                        dataKey="id" metaKeySelection={metaKey} dragSelection tableStyle={{ minWidth: '50rem' }}>
                        <Column field="tipoDeRefeicao" header="Tipo de Refeição"></Column>
                        <Column field="descricao" header="Descrição"></Column>
                        <Column field="category" header="Category"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                      </DataTable>
                    </div> */}

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <div className="col mt-8 mb-6">
                        <div className="card flex justify-content-rigth">
                          <Button id="btnCreate" label="ADICIONAR DIA/REFEIÇÕES" severity="sucess"
                            icon="pi pi-check" size="small" onClick={(event) => addItemCardapioDia(event)} />
                          {/* <Button type="button" onClick={addMessages} label="Show" className="mr-2" />
                          <Button type="button" onClick={clearMessages} label="Clear" className="p-button-secondary" /> */}

                          <Messages ref={msgs} />

                        </div>
                      </div>
                    </div>



                    {/* <div className="row flex flex-row-reverse align-middle mt-6">
                      <div className="col ml-2">
                        <div className="card flex justify-content-center">
                          <br />
                          <Button id="btnConfirme" label="CONFIRMAR DADOS" severity="secondary" raised onClick={cancel} />
                        </div>
                      </div>
                      <div className="col mr-2">
                        <div className="card flex justify-content-center">
                          <Button id="btnCreate" label="ADICIONAR DIA/REFEIÇÕES" severity="sucess" 
                          icon="pi pi-check" size="small" onClick={addRefeicoes} />
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                    </div> */}
                    <Divider className="border-2 border-x-green-950" />

                    <div className="row flex flex-row-reverse align-middle mt-6">
                      <div className="col ml-2">
                        <div className="card flex justify-content-center">
                          <br />
                          <Button id="btnCancel" label="CANCELAR" severity="sucess" raised outlined onClick={cancel} />
                        </div>
                      </div>
                      <div className="col mr-2">
                        <div className="card flex justify-content-center">
                          <Toast ref={toast} />
                          <Button id="btnCreate" label="CADASTRAR" severity="sucess" raised onClick={create} />
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                    </div>

                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>

      </div >
    </div>
  );
}

export default memo(CadastrarCardapio);


// "{
// "sequenciaSemanal":"2",
// "edital":1,
// "itensCardapioDia":[{
// 	"diaDaSemana":"SEGUNDA",
// 	"refeicoes":[{
// 			"id":1,
// 			"descricao":"Feijão preto, arroz refogado, farofa, carne de sol, salada de legumes, salada crua.",
// 			"tipoDeRefeicao":"ALMOCO",
// 			"restricoes":["DIABETES"]},1]}]
// }"


// "{
// "sequenciaSemanal": "2",
//   "edital": 1,
//     "itensCardapioDia": [
//       {
//         \"diaDaSemana\":\"QUINTA\",
//         \"refeicoes\":[{
//         \"id\":1,
//         \"descricao\":\"Feijão preto, arroz refogado, farofa, carne de sol, salada de legumes, salada crua.\",
//         \"tipoDeRefeicao\":\"ALMOCO\",
//         \"restricoes\":[\"DIABETES\"]
// 						}, 1, 1]
// 				},
// {
//   \"diaDaSemana\":\"SEXTA\",
//   \"refeicoes\":[{
//   \"id\":1,
//   \"descricao\":\"Feijão preto, arroz refogado, farofa, carne de sol, salada de                                                                      legumes, salada crua.\",		
//   \"tipoDeRefeicao\":\"ALMOCO\",
//   \"restricoes\":[\"DIABETES\"]},1,1]}
// 	]
// } "









{/* <div className="flex align-items-center">
  <RadioButton inputId="diaRefeicao1" name="diaRefeicao" value="diaRefeicao" onChange={handleChange(setDiaDaSemana)} checked={diaDaSemana === 'Segunda-feira'} />
  <label htmlFor="diaRefeicao1" className="ml-2">Segunda-feira</label>
</div>
<div className="flex align-items-center">
  <RadioButton inputId="diaRefeicao2" name="diaRefeicao" value="diaRefeicao" onChange={handleChange(setDiaDaSemana)} checked={diaDaSemana === 'Terça-feira'} />
  <label htmlFor="diaRefeicao2" className="ml-2">Terça-feira</label>
</div>
<div className="flex align-items-center">
  <RadioButton inputId="diaRefeicao3" name="diaRefeicao" value="diaRefeicao" onChange={handleChange(setDiaDaSemana)} checked={diaDaSemana === 'Quarta-feira'} />
  <label htmlFor="diaRefeicao3" className="ml-2">Quarta-feira</label>
</div>
<div className="flex align-items-center">
  <RadioButton inputId="diaRefeicao4" name="diaRefeicao" value="diaRefeicao" onChange={handleChange(setDiaDaSemana)} checked={diaDaSemana === 'Quinta-feira'} />
  <label htmlFor="diaRefeicao4" className="ml-2">Quinta-feira</label>
</div>
<div className="flex align-items-center">
  <RadioButton inputId="diaRefeicao5" name="diaRefeicao" value="diaRefeicao" onChange={handleChange(setDiaDaSemana)} checked={diaDaSemana === 'Sexta-feira'} />
  <label htmlFor="diaRefeicao5" className="ml-2">Sexta-feira</label>
</div>
<div className="flex align-items-center">
  <RadioButton inputId="diaRefeicao6" name="diaRefeicao" value="diaRefeicao" onChange={handleChange(setDiaDaSemana)} checked={diaDaSemana === 'Sábado'} />
  <label htmlFor="diaRefeicao6" className="ml-2">Sábado</label>
</div> */}
{/* <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                      htmlFor="tipoRefeicao"
                      className="block text-sm font-medium text-gray-700 mb-3">
                        Tipo de Refeição
                      </label>
                      <div className="card flex justify-content-center">
                        <div className="flex flex-wrap gap-3">
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao1" name="tipoRefeicao" value="tipoRefeicao" onChange={handleChange(setTipoRefeicao)} checked={tipoRefeicao === 'Café da Manhã'} />
                            <label htmlFor="tipoRefeicao1" className="ml-2">Café da Manhã</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao2" name="tipoRefeicao" value="tipoRefeicao" onChange={handleChange(setTipoRefeicao)} checked={tipoRefeicao === 'Lanche da Manhã'} />
                            <label htmlFor="tipoRefeicao2" className="ml-2">Lanche da Manhã</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao3" name="tipoRefeicao" value="tipoRefeicao" onChange={handleChange(setTipoRefeicao)} checked={tipoRefeicao === 'Almoço'} />
                            <label htmlFor="tipoRefeicao3" className="ml-2">Almoço</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao4" name="tipoRefeicao" value="tipoRefeicao" onChange={handleChange(setTipoRefeicao)} checked={tipoRefeicao === 'Lanche da Tarde'} />
                            <label htmlFor="tipoRefeicao4" className="ml-2">Lanche da Tarde</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao5" name="tipoRefeicao" value="tipoRefeicao" onChange={handleChange(setTipoRefeicao)} checked={tipoRefeicao === 'Janta'} />
                            <label htmlFor="tipoRefeicao5" className="ml-2">Janta</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao6" name="tipoRefeicao" value="tipoRefeicao" onChange={handleChange(setTipoRefeicao)} checked={tipoRefeicao === 'Ceia'} />
                            <label htmlFor="tipoRefeicao6" className="ml-2">Ceia</label>
                          </div>
                        </div>
                      </div>
                    </div> */}