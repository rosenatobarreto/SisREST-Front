import React, { Component } from "react";

import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import EditalApiService from "../../services/EditalApiService";
import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
// import SelectEdital from "../../components/SelectEdital";
// import SelectContaEstudante from "../../components/SelectContaEstudante";
import ListContasEstudanteTable from "../../components/ListContasEstudanteTable";
import ListEditaisTable from "../../components/ListEditaisTable";
import Footer from "../../components/Footer";
import MenuAdministrador from "../../components/MenuAdministrador";

class CadastrarBeneficiario extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.service = new BeneficiarioApiService();
    this.serviceEdital = new EditalApiService();
    this.serviceContaEstudante = new ContaEstudanteApiService();
  }

  state = {
    ativo: true,
    contaEstudante: 0,
    edital: 0,
    numero: "",
    ano: "",
    tituloEdital: "",
    nomeEstudante: "",
    listEditais: [],
    listContasEstudante:[]
  };

  componentDidMount() {
    this.findAllEditais();
    this.findAllContasEstudantes();
  }

  validate = () => {
    const errors = [];

    return errors;
  };

  create = () => {
    const errors = this.validate();
    
    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    this.service
      .create({
        ativo: this.state.ativo,
        contaEstudante: this.state.contaEstudante,
        edital: this.state.edital,
      })
      .then((response) => {
        console.log(response);
        console.log(this.state);
        showSuccessMessage("Beneficiário criado com sucesso!");
        this.props.history.push("/listarBeneficiarios");
      })
      .catch((error) => {
        console.log(error.response);
        console.log(this.state);
        showErrorMessage("O beneficiário não pode ser salvo!");
      });

    console.log("request finished");
  };

  cancel = () => {
    this.props.history.push("/listarBeneficiarios");
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

  findAllEditais = () => {
    this.serviceEdital
      .get("/buscarTodos")
      .then((response) => {
        const listEditais = response.data;
        this.setState({ listEditais });
        console.log(listEditais);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

    findAllContasEstudantes = () => {
    this.serviceContaEstudante
      .get("/buscarTodos")
      .then((response) => {
        const listContasEstudante = response.data;
        this.setState({ listContasEstudante });
        console.log(listContasEstudante);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  find = (id) => {
    this.service.find(id);
    var params = "?";

    if (this.state.id !== 0) {
      if (params !== "?") {
        params = `${params}&`;
      }

      params = `${params}id=${this.state.id}`;
    }

    if (this.state.ativo !== false) {
      if (params !== "?") {
        params = `${params}&`;
      }

      params = `${params}ativo=${this.state.ativo}`;
    }

    this.service
      .get(`/${id}`)
      .then((response) => {
        const beneficiarios = response.data;
        this.setState({ beneficiarios });
        console.log("find: ",beneficiarios);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };


  selectOneEdital = (id, numero, ano, tituloEdital) => {
    
    this.setState({ edital: id }, () => {
      console.log("Id do edital: ", this.state.edital);
    });
    this.setState({ tituloEdital: tituloEdital, numero: numero, ano: ano }); 
  }

  selectOneContaEstudante = (contaId, nome) => {

    this.setState({ contaEstudante: contaId }, () => {
      console.log("Id da conta estudante: ", this.state.contaEstudante);
    });
    this.setState({ nomeEstudante: nome });
  }

  render() {
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
                <p className="text-xs">{this.props.currentUser.email}</p>
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
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <form action="">
                    
                    
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            for="ativo"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Ativo no Sistema?
                          </label>
                          <select
                            id="idAtivo"
                            name="ativo"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            value={this.state.ativo} onChange={e => this.setState({ ativo: e.target.value }) }
                          >
                            <option value="true" >Sim</option>
                            {/* <option value="false">Não</option> */}
                            
                          </select>
                        </div>
                        
                        <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                          <label
                            for="edital"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Edital selecionado:
                          </label>
                          <p className="block text-md font-medium" id="labelEdital">{this.state.numero}-{this.state.ano} - {this.state.tituloEdital}</p>
                          {/* <SelectEdital onChange={this.inputSelectEdital} /> */}
                        </div>

                        <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                          <label
                            for="edital"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Estudante selecionado:
                          </label>
                          <p className="block text-md font-medium" id="labelEstudante">{this.state.nomeEstudante}</p>
                          {/* <SelectContaEstudante onChange={this.inputSelectContaEstudante} /> */}
                        </div>


                        {/* <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            for="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Edital
                          </label>
                          <input
                            type="text"
                            name="editalId"
                            id="editalId"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={this.state.editalId} onChange={this.selectOneEdital}
                          />
                        </div> */}


                        {/* <div className="col-span-6 sm:col-span-3">
                          <label
                            for="estudanteId"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Estudante
                          </label>
                          <input
                            type="text"
                            name="estudanteId"
                            id="estudanteId"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={this.state.contaEstudanteId} onChange={this.selectOneContaEstudante}
                          />
                        </div> */}
                      </div>
                    </div>


                    <div className="">
                      <div className="pt-4 pl-8 pr-8 mb-4">
                      <p className="mb-1 text-md font-semibold text-gray-700">Selecione o edital</p>
                        <ListEditaisTable
                          editais={this.state.listEditais}
                          // delete={this.delete}
                          selectOneEdital={this.selectOneEdital}
                          id="idEditEditais"
                        />
                        <br />
                    </div>
                    <div className="">
                      <div className="pt-4 pl-8 pr-8 mb-4 text-gray-700">
                      <p className="mb-1 text-md font-semibold">Selecione o estudante</p>
                        <ListContasEstudanteTable
                          contasEstudante={this.state.listContasEstudante}
                          selectOneContaEstudante={this.selectOneContaEstudante}
                          // edit={this.edit}
                          id="idEditContasEstudante"
                        />
                        <br />
                    </div>
                    <div className="row flex flex-row-reverse align-middle px-6 mt-1">
                      <div className="col ml-2">
                        <button
                          onClick={this.cancel}
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
                          onClick={this.create}
                          type="submit"
                          className=" btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          CADASTRAR
                        </button>
                        <br />
                        <br />
                      </div>
                      <br />
                    </div>
                    
                    </div>
                    </div>
                    
                  </form>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CadastrarBeneficiario;
