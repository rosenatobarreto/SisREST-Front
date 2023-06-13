import React, { useEffect, useState, memo } from "react";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import PedidoAcessoApiService from "../../services/PedidoAcessoApiService";
import AcessoDiaRefeicaoApiService from "../../services/AcessoDiaRefeicaoApiService";
import RestricaoAlimentar from "../../services/RestricaoAlimentarApiService";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import MenuVazio from "../../components/MenuVazio";
import { DadosServiceRefeicao } from "../../components/dados/DadosServiceRefeicao";

import { AutoComplete } from 'primereact/autocomplete';
import { InputMask } from 'primereact/inputmask';
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import { Editor } from 'primereact/editor';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { SelectButton } from 'primereact/selectbutton';
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from 'primereact/divider';
import { ListBox } from 'primereact/listbox';


const PedirAcesso = (props) => {

  const[currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUserName, setCurrentUserName] = useState(props.currentUser.name);

  const servicePedidoAcesso = new PedidoAcessoApiService();
  const serviceAcessoDiaRefeicao = new AcessoDiaRefeicaoApiService();
  const serviceRestricao = new RestricaoAlimentar();
  const serviceBeneficiario = new BeneficiarioApiService();


  const [solicitadoEm, setSolicitadoEm] = useState(new Date());
  const [justificativaAnalise, setJustificativaAnalise] = useState('');
  const [beneficiario, setBeneficiario] = useState(0);
  const [diasAcessoRefeicao, setDiasAcessoRefeicao] = useState([]);
  const [restricaoAlimentar, setRestricaoAlimentar] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  
  const [diaDaSemana, setDiaDaSemana] = useState(null);
  const [tipoDeRefeicao, setTipoDeRefeicao] = useState([]);
  
  const [selectedDiaKeys, setSelectedDiaKeys] = useState(null);
  const [selectedRefeicaoKeys, setSelectedRefeicaoKeys] = useState(null);
  
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [filteredBeneficiarios, setFilteredBeneficiarios] = useState(null);
  const [nomeBeneficiario, setNomeBeneficiario] = useState('');
  const [matriculaBeneficiario, setMatriculaBeneficiario] = useState('');
  const [emailBeneficiario, setEmailBeneficiario] = useState('');
  const [selectedBeneficiarios, setSelectedBeneficiarios] = useState('');

  const [tipoDeRestricaoAlimentar, setTipoDeRestricaoAlimentar] = useState([]);
  const handleChange = (setState) => (event) => { setState(event.target.value) }

  const items = [
    { name: 'Diabetes', value: 'DIABETES' },
    { name: 'Intolerância à Lactose', value: 'INTOLERANCIA_LACTOSE' },
    { name: 'Intolerância à Glúten', value: 'INTOLERANCIA_GLUTEN' },
    { name: 'Alergias', value: 'ALERGIAS' },
    { name: 'Hipertenso(a)', value: 'HIPERTENSO' },
    { name: 'Vegano(a)', value: 'VEGANO' },
  ];

  const itemsDias = [
    { dia: 'Segunda-feira', value: 'SEGUNDA' },
    { dia: 'Terça-feira', value: 'TERCA' },
    { dia: 'Quarta-feira', value: 'QUARTA' },
    { dia: 'Quinta-feira', value: 'QUINTA' },
    { dia: 'Sexta-feira', value: 'SEXTA' },
    { dia: 'Sábado', value: 'SABADO' },
    { dia: 'Domingo', value: 'DOMINGO' },
  ];

  const itemsRefeicoes0 = [
    { key: '0-1', refeicao0: 'Café da manhã', value: 'CAFE_MANHA' },
    { key: '0-2', refeicao0: 'Lanche da manhã', value: 'LANCHE_MANHA' },
    { key: '0-3', refeicao0: 'Almoço', value: 'ALMOCO' },
    { key: '0-4', refeicao0: 'Lanche da tarde', value: 'LANCHE_TARDE' },
    { key: '0-5', refeicao0: 'Janta', value: 'JANTA' },
    { key: '0-6', refeicao0: 'Ceia', value: 'CEIA' },
  ];

  const objectDiaRefeicoes = [
    {
      diaDaSemana,
      tipoDeRefeicao
    }
  ];

  const objectRestricaoAlimentar = [
    {
      observacoes,
      tipoDeRestricaoAlimentar
    }
  ];
  console.log('Obj Dia-Refeicoes ',objectDiaRefeicoes)
  // console.log('Dias Acesso Refeicoes',diasAcessoRefeicao)
  // diasAcessoRefeicao.push(diaDaSemana,tipoDeRefeicao);
  // const [teste, setTeste] = useState([]);
  // teste.push(itemsRefeicoes,itemsDias)

  // console.log('Dias acesso refeicao: ', teste)
  // console.log('Restricao: ',restricaoAlimentar)


  const validate = () => {
    const errors = [];
    return errors;
  };

  const create = () => {
    const errors = validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    servicePedidoAcesso
      .create({
        solicitadoEm,
        justificativaAnalise,
        beneficiario,
        diasAcessoRefeicao,
        restricaoAlimentar,
      })
      .then((response) => {
        console.log(response);
        console.log('Entrou no then');
        showSuccessMessage("Pedido cadastrado com sucesso!");
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error.response);
        showErrorMessage("O pedido não pôde ser cadastrado!");
      });
    console.log("request finished");
  };

  const cancel = () => {
    props.history.push("/");
  };

  // const findAllDiasRefeicao = () => {
  //   serviceAcessoDiaRefeicao
  //     .get("/buscarTodos")
  //     .then((response) => {
  //       const diasAcesso = response.data;
  //       setDiasAcessoRefeicao(diasAcesso);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };



  
  // const selectDiasAcesso = (props) => {
  //   props.map(diasAcesso => {
  //     setDiaDaSemana(diasAcesso.dia);
  //     setTipoDeRefeicao(diasAcesso.refeicao);
  //   })
  // }

  // const selectRestricao = (props) => {
  //   props.map(restricao => {
  //     setObservacoes(restricao.observacoes);
  //     setTipoDeRestricaoAlimentar(restricao.name);
  //   })
  // }
  
  console.log('Mostra dias Acesso: ', diasAcessoRefeicao);
  console.log('Mostra restrições: ', restricaoAlimentar);
  
  const addDiasTiposRefeicaoHandler = (event) => {
      event.preventDefault();
      diasAcessoRefeicao.push(objectDiaRefeicoes);
  }
  
  const addRestricoesHandler = (event) => {
      event.preventDefault();
      restricaoAlimentar.push(objectRestricaoAlimentar);
  }

  const searchBeneficiario = (event) => {
    setTimeout(() => {
      let _filteredBeneficiarios;
      
      if (!event.query.trim().length) {
        _filteredBeneficiarios = [...beneficiarios];
      } else {
        _filteredBeneficiarios = beneficiarios.filter((beneficiario) => {
          return beneficiario.contaEstudante.nome.toLowerCase().startsWith(event.query.toLowerCase())
        });
      }
      setFilteredBeneficiarios(_filteredBeneficiarios);
      
    }, 250);
  }
  
  const selectOneBeneficiario = (props) => {
    props.map(beneficiario => {
      if (currentUserEmail === beneficiario.contaEstudante.email){
        setBeneficiario(beneficiario.id);
        setNomeBeneficiario(beneficiario.contaEstudante.nome);
        setMatriculaBeneficiario(beneficiario.contaEstudante.matricula);
        setEmailBeneficiario(beneficiario.contaEstudante.email);
      }
      console.log('Beneficiario:', beneficiario);
      })
  }

  useEffect(() => {
    // addDiaRefeicoes();
    // DadosServiceRefeicao.getTreeTableDiasData().then((data) => setDiaDaSemana(data));
    // DadosServiceRefeicao.getTreeTableRefeicoesData().then((data) => setTipoDeRefeicao(data));
    const beneficiariosSelecionados = [];
    
    const loadBeneficiarios = async () => {

      const response = await serviceBeneficiario.get('/buscarTodos');
      const beneficiarioSelected = response.data.map(beneficiario => {
        if(beneficiario.contaEstudante.nome === currentUserName){
          beneficiariosSelecionados.push(beneficiario);
          console.log('beneficiario load', beneficiario.contaEstudante.nome)

        }
      })
      setBeneficiarios(beneficiariosSelecionados);
    };
    loadBeneficiarios();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="container-fluid h-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
      {/*Col left  */}
      <div className="w-[220px] flex-shrink flex-grow-0 px-0">
        {/* Side Menu */}
        <MenuVazio />
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
            <p className="text-xl font-semibold">Solicitar dias para refeições</p>
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
                    {/* <div className="grid grid-cols-6 gap-6">
                    </div> */}

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <div className="row flex justify-content gap-10 mt-6 ">
                        
                        <div className="row">
                          <p className="mb-1 text-sm font-semibold text-gray-700">Estudante:</p>
                          <div className="card flex justify-content-center">
                            <AutoComplete
                              className="w-full"
                              field="nome"
                              multiple value={selectedBeneficiarios}
                              suggestions={filteredBeneficiarios}
                              completeMethod={searchBeneficiario}
                              onChange={(e) => selectOneBeneficiario(e.target.value)}
                            />
                            {/* <p className="mt-2 text-lg">{currentUserName}</p> */}
                          </div>
                            <Divider className="border-2"/>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      {/* <label className="block text-sm font-medium text-gray-700">
                        Edital:
                        
                      </label>
                      <div className="card">
                        <TreeTable value={diaDaSemana} selectionMode="checkbox" selectionKeys={selectedDiaKeys}
                          onSelectionChange={(e) => setSelectedDiaKeys(e.value)} tableStyle={{ minWidth: '30rem' }}>
                          <Column field="dia" header="Selecione o dia" expander></Column>
                        </TreeTable>

                      </div>
                      <div className="card">
                        <TreeTable value={tipoDeRefeicao} selectionMode="checkbox" selectionKeys={selectedRefeicaoKeys}
                          onSelectionChange={(e) => setSelectedRefeicaoKeys(e.value)} tableStyle={{ minWidth: '30rem' }}>
                          <Column field="refeicao" header="Selecione a refeição" expander></Column>
                        </TreeTable>

                      </div> */}
                      <div className="flex flex-row">
                        <div className="col">
                          <label
                            htmlFor="restricoes"
                            className="block text-md font-medium text-gray-700 mt-6 mb-2">
                            Opções de dias e tipos de refeições</label>
                          <label
                            htmlFor="diaDaSemana"
                            className="block text-md font-medium text-gray-700 mt-6 mb-2">
                            Selecione o dia</label>
                          <div className="card flex justify-content-center"> 
                            <SelectButton value={diaDaSemana} 
                            onChange={(e) => setDiaDaSemana(e.value)} 
                            // onChange={handleChange(setDiaDaSemana)}
                            severity="secondary" optionLabel="dia" options={itemsDias} multiple/>
                          </div>
{/* 
              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center">
                    <RadioButton inputId="dia1" name="dia" value="SEGUNDA" onChange={(e) => setDiaDaSemana(e.value)} checked={diaDaSemana === 'Segunda-feira'} />
                    <label htmlFor="dia1" className="ml-2">Segunda-feira</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="dia2" name="dia" value="TERCA" onChange={(e) => setDiaDaSemana(e.value)} checked={diaDaSemana === 'Terça-feira'} />
                    <label htmlFor="dia2" className="ml-2">Terça-feira</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="dia3" name="dia" value="QUARTA" onChange={(e) => setDiaDaSemana(e.value)} checked={diaDaSemana === 'Quarta-feira'} />
                    <label htmlFor="dia3" className="ml-2">Quarta-feira</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="dia4" name="dia" value="QUINTA" onChange={(e) => setDiaDaSemana(e.value)} checked={diaDaSemana === 'Quinta-feira'} />
                    <label htmlFor="dia4" className="ml-2">Quinta-feira</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="dia5" name="dia" value="SEXTA" onChange={(e) => setDiaDaSemana(e.value)} checked={diaDaSemana === 'Sexta-feira'} />
                    <label htmlFor="dia5" className="ml-2">Sexta-feira</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="dia5" name="dia" value="SABADO" onChange={(e) => setDiaDaSemana(e.value)} checked={diaDaSemana === 'Sábado'} />
                    <label htmlFor="dia5" className="ml-2">Sábado</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="dia4" name="dia" value="DOMIGO" onChange={(e) => setDiaDaSemana(e.value)} checked={diaDaSemana === 'Domingo'} />
                    <label htmlFor="dia5" className="ml-2">Domingo</label>
                </div>
            </div> */}



                          <label
                            htmlFor="restricoes"
                            className="block text-md font-medium text-gray-700 mt-6 mb-2">
                            Selecione o tipo de refeição</label>
                          <div className="card flex justify-content-center">
                            <SelectButton id="refeicaoBtn" className="text-xs"
                              value={tipoDeRefeicao} 
                              onChange={(e) => setTipoDeRefeicao(e.value)}
                              // onChange={handleChange(setTipoDeRefeicao)}
                              optionLabel="refeicao0" options={itemsRefeicoes0} multiple />
                          </div>
                        </div>
                      </div>

                      <div className="col mt-6 mr-2">
                        <div className="card flex justify-content-rigth flex-row-reverse">
                          <Button id="btnCreate" label="ADICIONAR REFEIÇÕES" severity="sucess" 
                          icon="pi pi-check" size="small" onClick={addDiasTiposRefeicaoHandler} />
                        </div>                        
                      </div>
                      <Divider className="border-1 border-slate-900"/>

                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">

                      {/* <label
                        htmlFor="restricoes"
                        className="block text-md font-medium text-gray-700 mt-6 mb-2">
                        Opções de dias e tipos de refeições</label>
                      <div className="card flex justify-content-center">
                        <SelectButton id="selectDiasBtn" className="text-xs"
                          value={diaDaSemana} onChange={(e) => setDiaDaSemana(e.value)}
                          optionLabel="dia" options={itemsDias} multiple />
                      </div> */}
                        {/* <div className="col pl-4 pr-4">
                          <label
                            htmlFor="restricoes"
                            className="block text-md font-medium text-gray-700 mt-6 mb-2">
                            Selecione o tipo de refeição</label>
                          <div className="card flex justify-content-center">
                            <ListBox value={tipoDeRefeicao} onChange={(e) => setTipoDeRefeicao(e.value)} 
                            options={itemsRefeicoes0} optionLabel="refeicao0" className="w-120 md:w-14rem" multiple/>
                          </div>
                        </div>
                        <div className="card flex justify-content-center">
                          <SelectButton id="refeicaoBtn" className="text-xs"
                            value={tipoDeRefeicao} onChange={(e) => setTipoDeRefeicao(e.value)}
                            optionLabel="refeicao1" options={itemsRefeicoes1} multiple />
                        </div> */}
                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">

                      <label
                        htmlFor="restricoes"
                        className="block text-md font-medium text-gray-700 mt-6 mb-2">
                        Informe as Restrições Alimentares
                      </label>
                      <div className="card flex justify-content-center">
                        <SelectButton id="selectRefeicoesBtn" className="text-xs"
                          value={restricaoAlimentar} 
                          // onChange={(e) => setRestricaoAlimentar(e.value)}
                          onChange={handleChange(setRestricaoAlimentar)}
                          optionLabel="name" options={items} multiple />
                      </div>
                    </div>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="observacoes"
                        className="block text-md font-medium text-gray-700 mb-2">
                        Observações
                      </label>

                      <div className="card flex justify-content-center">
                        <InputTextarea id="observacao" autoResize placeholder="Detalhe sua restrição alimentar"
                          value={observacoes} 
                          // onChange={(e) => setObservacoes(e.target.value)}
                          onChange={handleChange(setObservacoes)}
                          rows={5} cols={60} />
                      </div>
                    </div>

                    <div className="col mr-2">
                        <div className="card flex justify-content-rigth flex-row-reverse">
                          <Button id="btnCreate" label="ADICIONAR RESTRIÇÃO" severity="sucess" 
                          icon="pi pi-check" size="small" onClick={addRestricoesHandler} />
                        </div>                        
                      </div>
                      <Divider className="border-1 border-slate-900"/>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                        <label
                          htmlFor="justificativa"
                          className="block text-md font-medium text-gray-700 mb-2">
                          Justificativa da restrição alimentar
                        </label>
                        
                      <div className="card flex justify-content-center">
                        <InputTextarea id="descricao" autoResize placeholder="Justifique suas restrições alimentares"
                          value={justificativaAnalise} 
                          // onChange={(e) => setJustificativaAnalise(e.target.value)} 
                          onChange={handleChange(setJustificativaAnalise)}
                          rows={5} cols={60} />
                      </div>
                    </div>


                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="diaRefeicao"
                        className="block text-sm font-medium text-gray-700 mb-3">
                        {/* Arquivo de comprovação das restrições alimentares(Laudo médico, exames) */}
                      </label>
                      <div className="card flex justify-content-center">
                        {/* <Editor value={descricaoRefeicao} onTextChange={(e) => setDescricaoRefeicao(e.htmlValue)} style={{ width: '100%', height: '320px' }} /> */}
                      </div>
                    </div>

                    <div className="row flex flex-row-reverse align-middle mt-6">
                      <div className="col ml-2">
                        <div className="card flex justify-content-center">
                          <br />
                          <Button id="btnCancel" label="CANCELAR" severity="sucess" raised outlined onClick={cancel} />
                        </div>
                      </div>
                      <div className="col mr-2">
                        <div className="card flex justify-content-center">
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

export default memo(PedirAcesso);

/*
{
    "solicitadoEm": "2023-05-20",
    "justificativaAnalise": "Nescessito, do auxilio nos dias tal",
    "beneficiario": 3,
    "diasAcessoRefeicao" : [
    {
       "diaDaSemana": "SEGUNDA",
      "tipoDeRefeicao": "JANTAR"
    },
    {
      "diaDaSemana": "TERCA",
      "tipoDeRefeicao": "ALMOCO"
    },
    {
      "diaDaSemana": "QUARTA",
      "tipoDeRefeicao": "JANTAR"
    },
    {
      "diaDaSemana": "QUINTA",
      "tipoDeRefeicao": "ALMOCO"
    },
    {
      "diaDaSemana": "SEXTA",
      "tipoDeRefeicao": "ALMOCO"
    }
  ],
  "restricaoAlimentar" : [
      {
        "observacoes" : "Diabetes tipo 30",
        "tipoDeRestricaoAlimentar" : "DIABETES"
      },
      {
        "observacoes" : "Alergia a sal",
          "tipoDeRestricaoAlimentar" : "ALERGIAS"
      }
  ]
}

*/
// const searchEdital = (event) => {
//   setTimeout(() => {
//     let _filteredEditais;

//     if (!event.query.trim().length) {
//       _filteredEditais = [...editais];
//     } else {
//       _filteredEditais = editais.filter((edital) => {
//         return edital.nome.toLowerCase().startsWith(event.query.toLowerCase())
//       });
//     }
//     setFilteredEditais(_filteredEditais);
//   }, 250);
// }


// const searchEstudante = (event) => {
//   setTimeout(() => {
//     let _filteredEstudantes;

//     if (!event.query.trim().length) {
//       _filteredEstudantes = [...contasEstudante];
//     } else {
//       _filteredEstudantes = contasEstudante.filter((estudante) => {
//         return estudante.nome.toLowerCase().startsWith(event.query.toLowerCase())
//       });
//     }
//     setFilteredEstudantes(_filteredEstudantes);

//   }, 250);
// }

// const selectOneContaEstudante = (props) => {
  //   props.map(estudante => {
//     setContaEstudante(estudante.id);
//     setNomeEstudante(estudante.nome);
//     setMatriculaEstudante(estudante.matricula);
//     setEmailEstudante(estudante.email);
//     console.log('estudante:', estudante);
//   })
// }

// useEffect(() => {

//   // let dataVigente;
//   // let dataAtual = new Date();
//   // const editaisSelecionados = [];
//   // const estudantesSelecionados = [];

//   // const loadEditais = async () => {
  
//   //   const response = await serviceEdital.get('/buscarTodos');
//   //   const editaisSelected = response.data.map(edital => {

//   //     dataVigente = new Date(edital.vigenteFinal)

//   //     if (dataVigente.getFullYear() === dataAtual.getFullYear()) {
//   //       editaisSelecionados.push(edital);
//   //     }
//   //   })
//   //   setEditais(editaisSelecionados);
//   // };
//   // loadEditais();

//   // const loadEstudantes = async () => {

//   //   const response = await serviceContaEstudante.get('/buscarTodos');//.then((data) => setEditais(data));
//   //   const estudanteSelected = response.data.map(estudante => {
  
//   //     estudantesSelecionados.push(estudante);
//   //   })
//   //   setContasEstudante(estudantesSelecionados);
//   // };
//   // loadEstudantes();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []
// );



// console.log(selectDia);
// console.log('diaDaSemana: ', diaDaSemana);
// console.log('DiasAcessoRefeicao: ', diasAcessoRefeicao)
// console.log('Restricao alimentar: ', restricaoAlimentar)
// const addDiaRefeicoes = () => {
//   // if (tipoDeRefeicao.length <= 5) {
    
//   // diasAcessoRefeicao.push(tipoDeRefeicao);
//   // diasAcessoRefeicao.push(diaDaSemana);
//   // setDiasAcessoRefeicao(objectDiaRefeicoes)
//   // }
//   // props.history.push("/pedirAcesso");
//   selectDiasAcesso(objectDiaRefeicoes)
// }