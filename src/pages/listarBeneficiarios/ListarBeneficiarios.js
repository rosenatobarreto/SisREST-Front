import React, { Component } from "react";
// import Header from "../../components/Header";

// import { withRouter } from "react-router-dom";
// import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import BeneficiariosTable from "../../components/BeneficiariosTable";
import MenuAdministrador from "../../components/MenuAdministrador";

class ListarBeneficiarios extends Component {
  
  state = {
    id: 0,
    ativo: true,
    edital: {
      id: 0,
      numero: 0,
      ano: 0,
      nome: "",
      link: "",
      vigenteInicio: "",
      vigenteFinal: ""
    },
    contaEstudante: {
      nome: "",
      senha: "",
      email: "",
      matricula: 0
    },
    beneficiarios:[],
    beneficiarioAtivo: true,
    editalNumero: 0,
    editalAno: 0,
    editalNome: "",
    editalLink: "",
    editalVigenteInicio: "",
    editalVigenteFinal: "",
    contaEstudanteNome: "",
    contaEstudanteEmail: "",
    contaEstudanteMatricula: 0 
  };
  
  constructor(props) {
    super(props);
    this.service = new BeneficiarioApiService();
    // console.log("Constructor props ",props);
  }
  
  componentDidMount() {
    this.findAll();
  }
  
  delete = (id) => {
    this.service
      .delete(id)
      .then((response) => {
        this.find();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  edit = (id) => {
    this.props.history.push(`/atualizarBeneficiario/${id}`);
  };

  view = (id) => {
    this.props.history.push(`/detalharBeneficiario/${id}`);
  };

  createBeneficiario = () => {
    this.props.history.push(`/cadastrarBeneficiario`);
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
    
    // if (this.state.email !== "") {
      //   if (params !== "?") {
        //     params = `${params}&`;
        //   }
        
        //   params = `${params}email=${this.state.email}`;
        // }

        // if (this.state.matricula !== 0) {
    //   if (params !== "?") {
    //     params = `${params}&`;
    //   }

    //   params = `${params}matricula=${this.state.matricula}`;
    // }
    
    // if (this.state.tipo !== "") {
      //   if (params !== "?") {
        //     params = `${params}&`;
        //   }
        
        //   params = `${params}tipo=${this.state.tipo}`;
    // }
    
    // if (this.state.admin !== false) {
      //   if (params !== "?") {
        //     params = `${params}&`;
        //   }
        
    //   params = `${params}admin=${this.state.admin}`;
    // }
    
    this.service
    .get(`/buscarPorID/${id}`)
    .then((response) => {
        const beneficiarios = response.data;
        this.setState({ beneficiarios });
        console.log("teste: ",beneficiarios);
      })
      .catch((error) => {
        console.log(error.response);
      });
    };
    
    findAll = () => {
      this.service
      .get("/buscarTodos")
      .then((response) => {
        const beneficiarios = response.data;
        this.setState({ beneficiarios });
        console.table(beneficiarios);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  
  importarDadosEdital = () => {
    this.props.history.push("/importarBeneficiarios");
  };

  // carregarDados = () => {
  //   const [beneficiario, setBeneficiario] = useContext(BeneficiarioContext);

  //   return (
  //     <div>
  //       Olá {beneficiario.contaEstudanteNome}
  //       {/* <button onClick={() => setUser(false)}>Sair</button> */}
  //     </div>
  //   );
  // };
  
  // view = () => {
  //   // const [beneficiario, setBeneficiario] = useContext(Context);
  //   // <h3>{beneficiario}</h3>
  //   // setBeneficiario(beneficiario)

  //   const [, setBeneficiario] = useContext(BeneficiarioContext);

  // return <button onClick={() => setBeneficiario({ contaEstudanteNome: "Bruno" })}>Entrar</button>;
  // }

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
          <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
            <div className="flex flex-row-reverse pr-6">
                <p className="text-xs">{this.props.currentUser.email}</p>
            </div>
            <div className="flex flex-row-reverse pr-6">
              <p className="text-lg font-semibold">Administrador</p>
            </div>
            <div className="flex flex-row pl-6">
              <p className="text-xl font-semibold">Gerenciar Beneficiários</p>
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
                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                              <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">Filtrar por nome</label>
                              <input type="text" name="nome" id="filterName"  className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"/>
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="cpf" className="block text-sm font-medium text-gray-700">Filtrar por edital</label>
                              <input type="text" name="editalNome" id="filterEdital" autocomplete="" className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"/>
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="email" className="block text-sm font-medium text-gray-700">Filtrar por matrícula</label>
                              <input type="email" name="matricula" id="filterMatricula" autocomplete="filterMatricula" className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"/>
                            </div>
                      </div>
                    </div>

                    <div className="row flex flex-row-reverse align-middle px-4 mt-1">
                      <div className="col ml-2">
                                    <button onClick={this.importarDadosEdital} type="submit" className=" btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2">IMPORTAR DADOS DO EDITAL</button>
                                </div> 
                      <div className="col mr-2">
                        <button
                          onClick={this.createBeneficiario}
                          type="submit"
                          className=" btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >NOVO BENEFICIÁRIO
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
                      <div className="">
                        
                          <BeneficiariosTable
                            beneficiarios={this.state.beneficiarios}
                            delete={this.delete}
                            edit={this.edit}
                            view={this.view}
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

export default ListarBeneficiarios;
