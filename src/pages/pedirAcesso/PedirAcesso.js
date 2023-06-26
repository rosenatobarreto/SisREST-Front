import React, { useEffect, useState, useRef, memo } from "react";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import PedidoAcessoApiService from "../../services/PedidoAcessoApiService";
import AcessoDiaRefeicaoApiService from "../../services/AcessoDiaRefeicaoApiService";
import RestricaoAlimentar from "../../services/RestricaoAlimentarApiService";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import MenuVazio from "../../components/MenuVazio";
import { DadosServiceRefeicao } from "../../components/dados/DadosServiceRefeicao";

import { AutoComplete } from 'primereact/autocomplete';
import { Checkbox } from "primereact/checkbox";
import { Editor } from 'primereact/editor';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ListBox } from 'primereact/listbox';
import { RadioButton } from "primereact/radiobutton";
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';


const PedirAcesso = (props) => {

  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUserName, setCurrentUserName] = useState('');

  const servicePedidoAcesso = new PedidoAcessoApiService();
  const serviceAcessoDiaRefeicao = new AcessoDiaRefeicaoApiService();
  const serviceRestricao = new RestricaoAlimentar();
  const serviceBeneficiario = new BeneficiarioApiService();


  const [solicitadoEm, setSolicitadoEm] = useState(null);
  const [justificativaAnalise, setJustificativaAnalise] = useState('');
  const [beneficiario, setBeneficiario] = useState(0);

  const [diasAcessoRefeicao, setDiasAcessoRefeicao] = useState([]);
  const [diaDaSemana, setDiaDaSemana] = useState('');
  const [tipoDeRefeicao, setTipoDeRefeicao] = useState('');


  const [restricaoAlimentar, setRestricaoAlimentar] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  const [tipoDeRestricaoAlimentar, setTipoDeRestricaoAlimentar] = useState('');
  const [anexo, setAnexo] = useState(null);
  
  const [selectedDiaTipo, setSelectedDiaTipo] = useState([]);
  const [selectedRestricao, setSelectedRestricao] = useState([]);
  
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [filteredBeneficiarios, setFilteredBeneficiarios] = useState(null);
  const [nomeBeneficiario, setNomeBeneficiario] = useState('');
  const [matriculaBeneficiario, setMatriculaBeneficiario] = useState('');
  const [emailBeneficiario, setEmailBeneficiario] = useState('');
  const [selectedBeneficiarios, setSelectedBeneficiarios] = useState('');

  const handleChange = (setState) => (event) => { setState(event.target.value) }

  // const itemsRestricoes = [
  //   { nomeRestricao: 'Diabetes', value: 'DIABETES' },
  //   { nomeRestricao: 'Intolerância à Lactose', value: 'INTOLERANCIA_LACTOSE' },
  //   { nomeRestricao: 'Intolerância à Glúten', value: 'INTOLERANCIA_GLUTEN' },
  //   { nomeRestricao: 'Alergias', value: 'ALERGIAS' },
  //   { nomeRestricao: 'Hipertenso(a)', value: 'HIPERTENSO' },
  //   { nomeRestricao: 'Vegano(a)', value: 'VEGANO' },
  // ];

  // const itemsDias = [
  //   { dia: 'Segunda-feira', value: 'SEGUNDA' },
  //   { dia: 'Terça-feira', value: 'TERCA' },
  //   { dia: 'Quarta-feira', value: 'QUARTA' },
  //   { dia: 'Quinta-feira', value: 'QUINTA' },
  //   { dia: 'Sexta-feira', value: 'SEXTA' },
  //   { dia: 'Sábado', value: 'SABADO' },
  //   { dia: 'Domingo', value: 'DOMINGO' },
  // ];

  // const itemsRefeicoes = [
  //   { key: '0-1', refeicao: 'Café da manhã', value: 'CAFE_MANHA' },
  //   { key: '0-2', refeicao: 'Lanche da manhã', value: 'LANCHE_MANHA' },
  //   { key: '0-3', refeicao: 'Almoço', value: 'ALMOCO' },
  //   { key: '0-4', refeicao: 'Lanche da tarde', value: 'LANCHE_TARDE' },
  //   { key: '0-5', refeicao: 'Janta', value: 'JANTA' },
  //   { key: '0-6', refeicao: 'Ceia', value: 'CEIA' },
  // ];

  const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success', detail:'Pedido cadastrado com sucesso!', life: 3000});
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'O pedido não pôde ser cadastrado!', life: 3000});
    }


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

    servicePedidoAcesso
      .create({
        solicitadoEm,
        justificativaAnalise,
        beneficiario,
        diasAcessoRefeicao,
        restricaoAlimentar
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

  //   const findAllBeneficiarios = () => {
  //   serviceBeneficiario
  //     .get("/buscarTodos")
  //     .then((response) => {
  //       const beneficiario = response.data;
  //       setBeneficiarios(beneficiario);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };  
  
  const addDiasTiposRefeicaoHandler = (event) => {
    event.preventDefault();
    const diaAcessoRefeicao = { diaDaSemana, tipoDeRefeicao };
    diasAcessoRefeicao.push(diaAcessoRefeicao);
  }
  
  const addRestricoesHandler = (event) => {
    event.preventDefault();
    const restricoes = {observacoes, tipoDeRestricaoAlimentar, anexo};
    restricaoAlimentar.push(restricoes);
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
  
  // const selectOneBeneficiario = (props) => {
  //   props.map(beneficiario => {
  //     if (props.currentUser.Email === beneficiario.contaEstudante.email){
    //       setBeneficiario(beneficiario.id);
    //       setNomeBeneficiario(beneficiario.contaEstudante.nome);
  //       setMatriculaBeneficiario(beneficiario.contaEstudante.matricula);
  //       setEmailBeneficiario(beneficiario.contaEstudante.email);
  //     }
  //     console.log('selectOneBeneficiario:', beneficiario);
  
  //   })
  // }
  
  useEffect(() => {
    // addDiaRefeicoes();
    // DadosServiceRefeicao.getTreeTableDiasData().then((data) => setDiaDaSemana(data));
    // DadosServiceRefeicao.getTreeTableRefeicoesData().then((data) => setTipoDeRefeicao(data));
    const beneficiariosSelecionados = [];
    
    const loadBeneficiarios = async () => {
      
      const response = await serviceBeneficiario.get('/buscarTodos');
      const beneficiarioSelected = response.data.map(oneBeneficiario => {
        if(oneBeneficiario.contaEstudante.email === props.currentUser.email){
          beneficiariosSelecionados.push(oneBeneficiario);
          setBeneficiario(oneBeneficiario.id);
          // console.log('beneficiario load', beneficiario.contaEstudante.nome)
          
        }
      })
      setBeneficiarios(beneficiariosSelecionados);
    };
    loadBeneficiarios();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  console.log('Beneficiario id: ', beneficiario)
  console.log('Mostra dias Acesso: ', diasAcessoRefeicao);
  console.log('Mostra restrições: ', restricaoAlimentar);
  
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
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="">
                  <div className="bg-white px-4 py-5 sm:p-6">

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <label
                        htmlFor="restricoes"
                        className="block text-md font-medium text-gray-700 mt-6 mb-2">
                        Selecione o dia da refeição</label>
                      <div className="card flex justify-content-center">
                        {/* <Dropdown id="diaDaSemana" value={diaDaSemana} onChange={(e) => setDiaDaSemana(e.value)} options={itemsDias} optionLabel="dia" 
                          placeholder="Selecione um dia" className="w-full md:w-10rem" /> */}
                        {/* <MultiSelect value={diaDaSemana} 
                          onChange={(e) => setDiaDaSemana(e.value)} options={itemsDias} optionLabel="dia" 
                          placeholder="Selecione um dia" maxSelectedLabels={1} className="w-full md:w-20rem" /> */}
                          
                          <select className="rounded-md border border-gray-300 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm md:w-10rem" 
                            id="selectDia" value={diaDaSemana} 
                            onChange={handleChange(setDiaDaSemana)}>
                            <option>Selecione uma opção</option>
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

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <label
                            htmlFor="restricoes"
                            className="block text-md font-medium text-gray-700 mt-6 mb-2">
                            Selecione o tipo de refeição</label>
                          <div className="card flex justify-content-center">
                          {/* <MultiSelect value={tipoDeRefeicao} 
                          onChange={(e) => setTipoDeRefeicao(e.value)} options={itemsRefeicoes} optionLabel="refeicao" 
                          placeholder="Selecione a refeição" maxSelectedLabels={1} className="w-full md:w-20rem" /> */}
                          <select className="rounded-md border border-gray-300 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm md:w-10rem" 
                            id="selectDia" value={tipoDeRefeicao} 
                            onChange={handleChange(setTipoDeRefeicao)}>
                            <option>Selecione uma opção</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="CAFE">Café da manhã</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="LANCHE_MANHA">Lanche da manhã</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="ALMOCO">Almoço</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="LANCHE_TARDE">Lanche da tarde</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="JANTAR">Jantar</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="CEIA">Ceia</option>
                          </select>
                          </div>                      
                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <div className="col mt-8 mb-6">
                        <div className="card flex justify-content-rigth">
                          <Button id="btnCreate" label="ADICIONAR REFEIÇÕES" severity="sucess" 
                          icon="pi pi-check" size="small" onClick={addDiasTiposRefeicaoHandler} />
                        </div>                        
                      </div>
                      <Divider className="border-2 border-x-green-950"/>
                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <label
                        htmlFor="restricoes"
                        className="block text-md font-medium text-gray-700 mt-6 mb-2">
                        Informe as Restrições Alimentares
                      </label>
                      <div className="card flex justify-content-center">
                          {/* <MultiSelect value={tipoDeRestricaoAlimentar} 
                          onChange={(e) => setTipoDeRestricaoAlimentar(e.value)} options={itemsRestricoes} optionLabel="nomeRestricao" 
                          placeholder="Selecione a restrição" maxSelectedLabels={1} className="w-full md:w-20rem" /> */}
                        <select className="rounded-md border border-gray-300 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm md:w-10rem" 
                            id="selectDia" value={tipoDeRestricaoAlimentar} 
                            onChange={handleChange(setTipoDeRestricaoAlimentar)}>
                            <option>Selecione uma opção</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="DIABETES">Diabetes</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="INTOLERANCIA_LACTOSE">Intolerância à Lactose</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="INTOLERANCIA_GLUTEN">Intolerância à Glúten</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="ALERGIAS">Alergias</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="HIPERTENSO">Hipertenso(a)</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="VEGANO">Vegano</option>                          
                          </select>
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
                          onChange={(e) => setObservacoes(e.target.value)}
                          // onChange={handleChange(setObservacoes)}
                          rows={5} cols={60} />
                      </div>
                    </div>

                    <div className="col mt-8 mb-6">
                        <div className="card flex justify-content-rigth">
                          <Button id="btnCreate" label="ADICIONAR RESTRIÇÃO" severity="sucess" 
                          icon="pi pi-check" size="small" onClick={addRestricoesHandler} />
                        </div>                        
                      </div>
                      <Divider className="border-2 border-x-green-950"/>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                        <label
                          htmlFor="justificativa"
                          className="block text-md font-medium text-gray-700 mb-2">
                          Justificativa da restrição alimentar
                        </label>
                        
                      <div className="card flex justify-content-center">
                        <InputTextarea id="descricao" autoResize placeholder="Justifique suas restrições alimentares"
                          value={justificativaAnalise} 
                          onChange={(e) => setJustificativaAnalise(e.target.value)} 
                          // onChange={handleChange(setJustificativaAnalise)}
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

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                        <label
                          htmlFor="justificativa"
                          className="block text-md font-medium text-gray-700 mb-2">
                          Data da solicitação
                        </label>
                        
                      <div className="card flex justify-content-center">
                        <Calendar value={solicitadoEm} id="solicitadoEm" 
                          onChange={handleChange(setSolicitadoEm)} 
                          dateFormat="yy/mm/dd" />
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