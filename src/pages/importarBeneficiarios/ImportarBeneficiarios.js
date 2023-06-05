import React, { useEffect, useState, ChangeEvent, memo } from "react";
import { withRouter } from "react-router-dom";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import UploadCsvApiService from "../../services/UploadCsvApiService";
import EditalApiService from "../../services/EditalApiService";
import SelectEdital from "../../components/SelectEdital";
import MenuAdministrador from "../../components/MenuAdministrador";
import { AutoComplete } from 'primereact/autocomplete';
import { FileUpload } from 'primereact/fileupload';

const ImportarBeneficiarios = (props) => {

  const [arquivoBeneficiariosSuap, setArquivoBeneficiariosSuap] = useState(null);
  const [arquivoEstudantesSuap, setArquivoEstudantesSuap] = useState(null);
  const [listEditais, setListEditais] = useState([]);
  const [editais, setEditais] = useState([]);
  const [idEdital, setIdEdital] = useState(0);
  const [numero, setNumero] = useState(0);
  const [ano, setAno] = useState(0);
  const [tituloEdital, setTituloEdital] = useState('');
  const [selectedEditais, setSelectedEditais] = useState(null);
  const [filteredEditais, setFilteredEditais] = useState(null);
  const handleChange = (setState) => (event) => { setState(event.target.value) }

  const service = new UploadCsvApiService();
  const serviceEdital = new EditalApiService();

  useEffect(() => {

    let dataVigente;
    let dataAtual = new Date();
    const editaisSelecionados = [];

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []
  )

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
      setIdEdital(edital.id);
      setTituloEdital(edital.nome);
      setNumero(edital.numero);
      setAno(edital.ano);
    })
  }

  // const handleUploadFile = (e: any) => setCardFile(e.target.files[0]);
  // const handleUploadFile = (e: any) => setCardFile(e.target.files[0]);

  const upload = () => {

    // if (errors.length > 0) {
    //   errors.forEach((message, index) => {
    //     showErrorMessage(message);
    //   });
    //   return false;
    // }

    service
      .processar({
        arquivoEstudantesSuap,
        arquivoBeneficiariosSuap,
        idEdital
      })
      .then((response) => {
        showSuccessMessage("Dados inseridos com sucesso!");
      })
      .catch((error) => {
        console.log(error.response);
        showErrorMessage("Os dados não pode ser salvos!");
      });
    console.log("request finished");
  };

  //   const processar = () => {
  //   const errors = validate();

  //   if (errors.length > 0) {
  //     errors.forEach((message, index) => {
  //       showErrorMessage(message);
  //     });
  //     return false;
  //   }

  //   service
  //     .processar({
  //       arquivoBeneficiariosSuap,
  //       arquivoEstudantesSuap,
  //       idEdital
  //     })
  //     .then((response) => {
  //       showSuccessMessage("Dados inseridos com sucesso!");
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //       showErrorMessage("Os dados não pode ser salvos!");
  //     });
  //   console.log("request finished");
  // };

  // setTimeout(() => {
  //   create();
  //   processar();
  // }, 6000)

  const cancel = () => {
    props.history.push("/boasVindas");
  };

  const findAllEditais = () => {
    serviceEdital
      .get("/buscarTodos")
      .then((response) => {
        const editais = response.data;
        setListEditais(editais);

      })
      .catch((error) => {
        console.log(error.response);
      });
  };


  // const create = () => {
  //     const errors = this.validate();
  //     //this.service.create(this.state)
  //     if (errors.length > 0) {
  //       errors.forEach((message, index) => {
  //         showErrorMessage(message);
  //       });
  //       return false;
  //     }

  //     this.service
  //       .create({
  //         // nome: this.state.nome,
  //         // matricula: this.state.matricula,
  //         // email: this.state.email,
  //         // CPF: this.state.CPF,
  //         // curso: this.state.curso,
  //         // programa: this.state.programa,
  //         // modalidade: this.state.modalidade,
  //         // situacao: this.state.situacao,
  //         // classificacao: this.state.classificacao,
  //         // pontuacao: this.state.pontuacao,
  //         // renda: this.state.renda,
  //         // quantidade: this.state.quantidade,
  //         // percapta: this.state.percapta,
  //         // cota: this.state.cota,
  //         // Nascimento: this.state.Nascimento,
  //         // valor: this.state.valor,
  //         // editalId: this.state.editalId
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         console.log(this.state);
  //         showSuccessMessage("Dados inseridos com sucesso!");
  //       })
  //       .catch((error) => {
  //         console.log(error.response);
  //         console.log(this.state);
  //         showErrorMessage("Os dados não podem ser salvos!");
  //       });

  //   console.log("request finished");
  // };


  // const inputSelectEdital = (e) => {
  //   this.setState({ editalId: e.target.value }, () => {
  //     console.log("Id do Edital: ", this.state.editalId);
  //   });
  // };

  return (
    <div className="container-fluid h-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
      {/*Col left  */}
      <div className="w-[220px] flex-shrink flex-grow-0 px-0 bg-[#93c47d]">
        {/* Side Menu */}

        <MenuAdministrador />

        {/* MENU */}
      </div>
      {/* Col right */}
      <div className="w-screen">
        {/* Header */}
        <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
          <div className="flex flex-row-reverse pr-6">
            <p className="text-xs">{props.currentUser.email}</p>
          </div>
          <div className="flex flex-row-reverse pr-6">
            <p className="text-lg font-semibold">Administrador</p>
          </div>
          <div className="flex flex-row pl-6">
            <p className="text-xl font-semibold">Cadastrar Beneficiário em lote</p>
          </div>
        </div>

        {/* Content two */}
        <div className="pt-4 pl-8 pr-8 mb-4">
          <div className="mt-0 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">
              <div className="md:col-span-1">
                {/* <div className="px-4 sm:px-0">
                </div> */}
              </div>
              <div className="mt-5 md:col-span-8 md:mt-0">
                <form>
                  {/* Begin Card */}
                  {/* <div className="overflow-hidden shadow sm:rounded-md"> */}
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {/* <div className="col-span-6 sm:col-span-6">
                        <label
                          for="formFileMultiple"
                          className="block text-sm font-medium text-gray-700"
                        >
                          <p className="mb-1 text-lg">Importar dados do Edital</p>
                          <p className="text-sm mt-6">CSV Beneficiários</p>
                        </label>
                        <input
                          type="file"
                          name="edital"
                          id="formFile1"
                          className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm
                             focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          value={arquivoBeneficiariosSuap}
                          onChange={handleChange(setArquivoBeneficiariosSuap)}

                        />
                      </div> */}

                      <div className="col-span-6 sm:col-span-6">
                        <label
                          for="formFileMultiple"
                          className="block text-sm font-medium text-gray-700"
                        >

                          <p className="text-sm mt-3">CSV de estudantes</p>
                        </label>
                        <input
                          type="file"
                          name="estudantes"
                          id="formFile2"
                          className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm
                             focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          value={arquivoEstudantesSuap}
                          onChange={(e) => setArquivoEstudantesSuap(e.target.value)}

                        />

                        <input
                          type="file"
                          name="beneficiarios"
                          id="formFile2"
                          className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm
                             focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          value={arquivoBeneficiariosSuap}
                          onChange={(e) => setArquivoBeneficiariosSuap(e.target.value)}

                        />


                        {/* <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" 
                        for="multiple_files">Upload multiple files</label>
                        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer
                         bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 
                         dark:placeholder-gray-400" 
                    id="multiple_files" type="file" multiple/>*/}



                      </div>

                      <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                        <label className="block text-sm font-medium text-gray-700">
                          Edital selecionado:
                        </label>
                        <p className="block text-sm font-medium ml-4 mb-4" id="labelEdital">{numero}-{ano} - {tituloEdital}</p>

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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row flex flex-row-reverse align-middle px-6 mt-1">
                    <div className="col ml-2">
                      <button
                        onClick={cancel}
                        type="submit"
                        className=" btn-cancel inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        CANCELAR
                      </button>
                    </div>
                    <div className="col mr-2">
                      <button
                        onClick={upload}
                        type="submit"
                        className=" btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        ENVIAR
                      </button>
                    </div>
                    <br />
                  </div>
                  <br />
                  {/* </div> */}
                  {/* End Card */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default memo(ImportarBeneficiarios);
