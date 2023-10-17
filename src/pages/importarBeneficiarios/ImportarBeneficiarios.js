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

  const [arquivoBeneficiariosSuap, setArquivoBeneficiariosSuap] = useState('');
  const [arquivoEstudantesSuap, setArquivoEstudantesSuap] = useState('');
  const [listEditais, setListEditais] = useState([]);
  const [editais, setEditais] = useState([]);
  const [idEdital, setIdEdital] = useState(0);
  const [numero, setNumero] = useState(0);
  const [ano, setAno] = useState(0);
  const [tituloEdital, setTituloEdital] = useState('');
  const [selectedEditais, setSelectedEditais] = useState(null);
  const [filteredEditais, setFilteredEditais] = useState(null);
  const [file, setFile] = useState([]);

  const initialFormData = Object.freeze({
    arquivoEstudantesSuap: "",
    arquivoBeneficiariosSuap: ""
  });
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData);
    // ... submit to API or something
  };


  const service = new UploadCsvApiService();
  const serviceEdital = new EditalApiService();


  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  const upload = (e) => {
    e.preventDefault()
    // const url = 'http://localhost:8080/api';
    // const formData = new FormData();
    // formData.append('file', file);
    service.processar('/processar', formData, config)
    .then((response) => {
      console.log(response.data);
    })
  }
  

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

  // Crie um objeto FormData
  // const formData = new FormData();
  // formData.append(arquivoBeneficiariosSuap);
  // formData.append(idEdital);

  // const prencherFormData = () => {

  //   formData.append(arquivoEstudantesSuap);
  //   formData.append(arquivoBeneficiariosSuap);
  // }

  // Configuração para a requisição
  // const config = {
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }
  // };

  // const upload = (e) => {
  //   e.preventDefault();
  //   // prencherFormData();
  //   service
  //     .post('/processar', {
  //       method: 'POST',
  //       body: formData, idEdital
  //     }
  //     )
  //     // service.post('/processar', formData, idEdital)
  //     .then((response) => {
  //       showSuccessMessage("Dados inseridos com sucesso!");
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //       showErrorMessage("Os dados não pode ser salvos!");
  //     });
  //   console.log("request finished");
  // };

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

  //INÍCIO da lógica do envio de arquivos



  //FIM da lógica do envio de arquivos

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
                <form >
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
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >

                          <p className="text-sm mt-3">CSV de estudantes</p>
                        </label>
                        {/* <input
                          type="file"
                          name="arquivoEstudantesSuap"
                          id="formFile2"
                          className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm
                             focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          value={arquivoEstudantesSuap}
                          // onChange={(e) => setArquivoEstudantesSuap(e.target.value)}
                          // onChange={(e) => handleChange(e.target.value)}
                          onChange={handleChange}


                        /> */}
                        <input type="file" name="arquivoEstudantesSuap" onChange={handleChange} />
                        <label
                          htmlFor=""
                          className="block text-sm font-medium text-gray-700"
                        >

                          <p className="text-sm mt-3">CSV de beneficiários</p>
                        </label>
                        {/* <input
                          type="file"
                          name="arquivoBeneficiariosSuap"
                          id="formFile2"
                          className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm
                             focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          value={arquivoBeneficiariosSuap}
                          // onChange={(e) => setArquivoBeneficiariosSuap(e.target.value)}
                          // onChange={(e) => handleChange(e.target.value)}
                          onChange={handleChange}
                        /> */}
                        <input type="file" name="arquivoBeneficiariosSuap" onChange={handleChange} />


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
                        {/* <p>{arquivoEstudantesSuap}</p>
                        <p>{arquivoBeneficiariosSuap}</p> */}

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



// Você pode fazer algo assim:

// <FileUpload name="invoice"
//     accept="image/*"
//     customUpload={true}
//     uploadHandler={invoiceUploadHandler}
//     mode="basic"
//     auto={true}
//     chooseLabel="Upload invoice"/>


// const invoiceUploadHandler = ({files}) => {
//     const [file] = files;
//     const fileReader = new FileReader();
//     fileReader.onload = (e) => {
//         uploadInvoice(e.target.result);
//     };
//     fileReader.readAsDataURL(file);
// };
// Envie sua solicitação assim

// const uploadInvoice = async (invoiceFile) => {
//     let formData = new FormData();
//     formData.append('invoiceFile', invoiceFile);

//     const response = await fetch(`orders/${orderId}/uploadInvoiceFile`,
//         {
//             method: 'POST',
//             body: formData
//         },
//     );
// };
// Importante: Não defina nenhum cabeçalho! Isso será feito automaticamente.Content-Type