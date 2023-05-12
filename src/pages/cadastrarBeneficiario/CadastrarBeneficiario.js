import React, { useEffect, useState, memo } from "react";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import EditalApiService from "../../services/EditalApiService";
import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
import Footer from "../../components/Footer";
import MenuAdministrador from "../../components/MenuAdministrador";

import { AutoComplete } from 'primereact/autocomplete';
import { InputMask } from 'primereact/inputmask';
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

const CadastrarBeneficiario = (props) => {

  const service = new BeneficiarioApiService();
  const serviceEdital = new EditalApiService();
  const serviceContaEstudante = new ContaEstudanteApiService();

  const [ativo, setAtivo] = useState(true);
  const [cpf, setCpf] = useState(null);
  const [programa, setPrograma] = useState(null);
  const [situacao, setSituacao] = useState(null);
  const [contaEstudante, setContaEstudante] = useState(0);
  const [nomeEstudante, setNomeEstudante] = useState(null);
  const [matriculaEstudante, setMatriculaEstudante] = useState([]);
  const [emailEstudante, setEmailEstudante] = useState(null);
  const [listEditais, setListEditais] = useState([]);
  const [selectedEstudantes, setSelectedEstudantes] = useState(null);
  const [listContasEstudante, setListContasEstudante] = useState([]);
  const [edital, setEdital] = useState(0);
  const [numero, setNumero] = useState(null);
  const [ano, setAno] = useState(null);
  const [tituloEdital, setTituloEdital] = useState(null);
  const [editais, setEditais] = useState([]);
  const [selectedEditais, setSelectedEditais] = useState(null);
  const [filteredEditais, setFilteredEditais] = useState(null);
  const [filteredEstudantes, setFilteredEstudantes] = useState(null);

  useEffect(() => {
    findAllEditais();
    findAllContasEstudantes();

    // let dataAtual = new Date();
    // const editaisSelecionados=[];
    // let dataVigente;

    // const editaisSelected = props.editais.map(edital => {

    //     dataVigente = new Date(edital.vigenteFinal)

    //     if (dataVigente.getFullYear() === dataAtual.getFullYear()){

    //         editaisSelecionados.push(edital);
    //     }
    // })

    const loadEditais = async () => {
      const response = await serviceEdital.get('/buscarTodos');//.then((data) => setEditais(data));
      setEditais(response.data);
    };
    loadEditais();

  }, []
  );


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

    service
      .create(
        setAtivo(ativo),
        setContaEstudante(contaEstudante),
        setEdital(edital),
      )
      .then((response) => {
        console.log(response);

        showSuccessMessage("Beneficiário criado com sucesso!");
        props.history.push("/listarBeneficiarios");
      })
      .catch((error) => {
        console.log(error.response);

        showErrorMessage("O beneficiário não pode ser salvo!");
      });

    console.log("request finished");
  };

  const cancel = () => {
    props.history.push("/listarBeneficiarios");
  };


  // inputSelectEdital = (e) => {
  //   this.setState({ editalId: e.target.value }, () => {
  //     console.log("Id do Edital: ", this.state.editalId);
  //   });
  // };

  // inputSelectContaEstudante = (e) => {
  //   this.setState({ contaEstudanteId: e.target.value }, () => {
  //     console.log("Id da conta estudante: ", this.state.contaEstudanteId);
  //   });
  // };

  const findAllEditais = () => {
    serviceEdital
      .get("/buscarTodos")
      .then((response) => {
        const listEditais = response.data;
        setListEditais(listEditais);

      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const findAllContasEstudantes = () => {
    serviceContaEstudante
      .get("/buscarTodos")
      .then((response) => {
        const listContasEstudante = response.data;
        setListContasEstudante(listContasEstudante);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const selectOneEdital = (props) => {
    props.map(edital => {
      setEdital(edital.id);
      setTituloEdital(edital.nome);
      setNumero(edital.numero);
      setAno(edital.ano);
    })

  }

  const selectOneContaEstudante = (props) => {
    props.map(estudante => {
      setContaEstudante(estudante.id);
      setNomeEstudante(estudante.nome);
      setMatriculaEstudante(estudante.matricula);
      setEmailEstudante(estudante.email);
    })

  }

  // const selectOneContaEstudante = (contaId, nome) => {

  //   setContaEstudante(contaId);
  //   setNomeEstudante(nome);
  // }

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

  const searchEstudante = (event) => {

    setTimeout(() => {
      let _filteredEstudantes;

      if (!event.query.trim().length) {
        _filteredEstudantes = [...listContasEstudante];
      } else {
        _filteredEstudantes = listContasEstudante.filter((estudante) => {
          return estudante.nome.toLowerCase().startsWith(event.query.toLowerCase())
        });
      }
      setFilteredEstudantes(_filteredEstudantes);
    }, 250);
    // selectOneEdital(filteredEditais);
  }

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
            <p className="text-xl font-semibold">Cadastrar Beneficiário</p>
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
                      <label className="block text-sm font-medium text-gray-700">
                        Edital selecionado:
                      </label>
                      <p className="block text-sm font-medium ml-4 mb-4" id="labelEdital">{numero}-{ano} - {tituloEdital}</p>

                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <label className="block text-sm font-medium text-gray-700 mt-6">
                        Estudante selecionado:
                      </label>
                      <p className="block text-sm font-medium ml-4" id="labelEstudante">
                        Nome: {nomeEstudante}<br />
                        Matrícula: {matriculaEstudante}<br />
                        Email: {emailEstudante}</p>
                    </div>


                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <div className="row flex justify-content gap-10 mt-6 ">
                      <div className="">
                        <p className="mb-1 text-sm font-semibold text-gray-700">Selecione o edital</p>
                        <div className="card flex justify-content-center">
                          <AutoComplete
                            className="w-full"
                            field="nome"
                            multiple value={selectedEditais}
                            suggestions={filteredEditais}
                            completeMethod={searchEdital}
                            onChange={(e) => selectOneEdital(e.target.value)}
                          />
                        </div>

                      </div>
                      <div className="row">
                        <p className="mb-1 text-sm font-semibold text-gray-700">Selecione o estudante</p>
                        <div className="card flex justify-content-center">
                          <AutoComplete
                            className="w-full"
                            field="nome"
                            multiple value={selectedEstudantes}
                            suggestions={filteredEstudantes}
                            completeMethod={searchEstudante}
                            onChange={(e) => selectOneContaEstudante(e.target.value)}
                          />
                        </div>
                      </div>
                      </div>
                    </div>


                    <div className="col-span-3 lg:col-span-2">
                      <div className="row flex justify-content-center gap-6 mt-6">
                      <label className="mb-1 text-sm font-semibold text-gray-700">
                        Ativo no Sistema?
                      </label>
                      <div className="card flex justify-content-center">
                        <RadioButton checked disabled></RadioButton>
                        <label htmlFor="sim" className="ml-2">Sim</label>
                      </div>
                      </div>
                    </div>


                    <div className="col-span-6 sm:col-span-3 lg:col-span-6 gap-6 mt-6">
                      <label
                        htmlFor="cpf"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CPF
                      </label>

                      <InputMask value={cpf} onChange={(e) => setCpf(e.target.value)} mask="999.999.999-99" placeholder="999.999.999-99" />
                    </div>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="programa"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Programa
                      </label>
                      <div className="card flex justify-content-center gap-3">
                        <InputText className="w-full" value={programa} onChange={(e) => setPrograma(e.target.value)} />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="situacao"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Situação
                      </label>
                      <div className="card flex justify-content-center">
                        <InputText className="w-full" value={situacao} onChange={(e) => setSituacao(e.target.value)} />
                      </div>
                    </div>


                    <div className="row flex flex-row-reverse align-middle mt-6">
                      <div className="col ml-2">
                        <div className="card flex justify-content-center">
                          <br/>
                          <Button label="CANCELAR" severity="sucess" outlined onClick={cancel} />
                        </div>
                      </div>
                      <div className="col mr-2">
                        <div className="card flex justify-content-center">
                          <Button label="CADASTRAR" severity="sucess" onClick={create} />
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                    </div>

                  </div>

                  {/* ////////////////// */}

              

                </form>
            
              </div>
            </div>
          </div>
        </div>
    
      </div >
    </div>
  );
}

export default memo(CadastrarBeneficiario);
