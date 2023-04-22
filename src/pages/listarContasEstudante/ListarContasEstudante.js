import React, { Component} from "react";

import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
import ContasEstudanteTable from "../../components/ContasEstudanteTable";
import MenuAdministrador from "../../components/MenuAdministrador";

class ListarContasEstudante extends Component {

  constructor(props) {
    super(props);
    this.service = new ContaEstudanteApiService();
    console.log(props);
    
  }

  state = {
    nome: "",
    email: "",
    senha: "",
    matricula: 0,
    contasEstudante: [],
  };

  componentDidMount() {
    this.findAll();
  }

  delete = (contaId) => {
    this.service
      .delete(contaId)
      .then((response) => {
        this.find();
        this.props.history.push(`/listarContasEstudante`);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  edit = (id) => {
    this.props.history.push(`/atualizarContaEstudante/${id}`);
  };

  createContaEstudante = () => {
    this.props.history.push(`/cadastrarContaEstudante`);
  };

  findById = (id) => {
    // this.service.find(id);
    var params = "?";

    if (this.state.id !== 0) {
      if (params !== "?") {
        params = `${params}&`;
      }

      params = `${params}id=${this.state.id}`;
    }

    if (this.state.nome !== "") {
      if (params !== "?") {
        params = `${params}&`;
      }

      params = `${params}nome=${this.state.nome}`;
    }
    
    if (this.state.matricula !== 0) {
      if (params !== "?") {
        params = `${params}&`;
      }

      params = `${params}matricula=${this.state.matricula}`;
    }

    if (this.state.email !== "") {
      if (params !== "?") {
        params = `${params}&`;
      }

      params = `${params}email=${this.state.email}`;
    }


    this.service.get(`/${id}`)
      .then((response) => {
        const contasEstudante = response.data;
        this.setState({ contasEstudante: contasEstudante });
        console.log('Contas Estudante:', contasEstudante);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  findAll = () => {
    this.service
      .get("/buscarTodos")
      .then((response) => {
        const contasEstudante = response.data;
        this.setState({ contasEstudante });
        console.log(contasEstudante);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // importarDadosEdital = () => {
  //   this.props.history.push("/importarBeneficiarios");
  // };


  render() {
    return (
      <div className="container-fluid h-screen flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
        {/*Col left  */}
        <div className="w-[220px] flex-shrink flex-grow-0 px-0">
          {/* Side Menu */}
          <MenuAdministrador /> 
        </div>
        {/* Col right */}
        <div className="w-full">
          {/* Header */}
          <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4">
            <div className="flex flex-row-reverse pr-6">
                <p className="text-xs">{this.props.currentUser.email}</p>
            </div>
            <div className="flex flex-row-reverse pr-6">
              <p className="text-lg font-semibold">Administrador</p>
            </div>
            <div className="flex flex-row pl-6">
              <p className="text-xl font-semibold">Gerenciar Contas de Estudantes</p>
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
                  <form action="" method="POST">
                    {/* Begin Card */}
                    {/* <div className="overflow-hidden shadow sm:rounded-md"> */}
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                              <label for="nome" className="block text-sm font-medium text-gray-700">Filtrar por nome</label>
                              <input type="text" name="filterNome" id="idFilterNome"  className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                              value={this.state.nome} onChange={(e) => { this.setState({ nome: e.target.value }) }}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="matricula" className="block text-sm font-medium text-gray-700">Filtrar por matricula</label>
                              <input type="number" name="filterMatricula" id="idFilterMatricula" autocomplete="filterMatricula" className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                              value={this.state.matricula} onChange={(e) => { this.setState({ matricula: e.target.value }) }}
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="email" className="block text-sm font-medium text-gray-700">Filtrar por e-mail</label>
                              <input type="email" name="filterEmail" id="idFilterEmail" autocomplete="filterMatricula" className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                              value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }}
                              />
                            </div>

                      </div>
                    </div>

                    <div className="row flex flex-row-reverse align-middle px-4 mt-1">
                      {/* <div className="col ml-2">
                                    <button onClick={this.importarDadosEdital} type="submit" className=" btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2">IMPORTAR DADOS DO EDITAL</button>
                                </div>  */}
                      <div className="col mr-2">
                        <button
                          onClick={this.createContaEstudante}
                          type="submit"
                          className=" btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >NOVA CONTA
                        </button>
                      </div>
                    </div>

                    <div className="">
                      {/* <div className="col-span-6 bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button onClick={this.create} type="submit" className=" btn-save inline-flex justify-center 
            rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
            font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
            focus:ring-2 focus:ring-green-500 focus:ring-offset-2">CADASTRAR</button>
          </div>
          <div className="col-span-6 bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button onClick={this.cancel} type="submit" className=" btn-cancel inline-flex justify-center 
            rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
            font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
            focus:ring-2 focus:ring-green-500 focus:ring-offset-2">CANCELAR</button>
          </div> */}
                    </div>
                    {/* </div> */}
                    {/* End Card */}
                  </form>

                  <div className="row">
                    {/* <div className="col-span-6">
                                <button onClick={this.createBeneficiario} type="button" id="idNovoUser" className="btn-save">
                                    <i className="pi pi-plus"></i> 
                                    CADASTRAR USUÁRIO
                                </button>
                            </div> */}
                  </div>
                  <br />
                  <div className="row">
                    <div className="">
                      <div className="pt-4 pl-8 pr-8 mb-4">
                        <ContasEstudanteTable
                          contasEstudante={this.state.contasEstudante}
                          delete={this.delete}
                          edit={this.edit}
                          id="idEdit"
                        />
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
}

export default ListarContasEstudante;
