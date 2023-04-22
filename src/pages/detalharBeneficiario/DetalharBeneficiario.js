import React, { Component} from "react";
// import Header from "../../components/Header";

// import { withRouter } from "react-router-dom";
// import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import EditalApiService from "../../services/EditalApiService";
import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
import BeneficiariosTable from "../../components/BeneficiariosTable";
import MenuAdministrador from "../../components/MenuAdministrador";

class DetalharBeneficiario extends Component {
    
    constructor(props) {
      super(props);
      this.serviceBeneficiario = new BeneficiarioApiService();
      this.serviceEdital = new EditalApiService();
      this.serviceContaEstudante = new ContaEstudanteApiService();
      console.log("Detalhes: ",props);
      
    }

  state = {
    id: 0,
    ativo: true,
    editalNumero: 0,
    editalAno: 0,
    editalNome: "",
    editalLink: "",
    editalVigenteInicio: "",
    editalVigenteFinal: "",
    contaEstudanteNome: "",
    contaEstudanteEmail: "",
    contaEstudanteMatricula: 0
    // edital: {
    //     id: 0,
    //     numero: 0,
    //     ano: 0,
    //     nome: "",
    //     link: "",
    //     vigenteInicio: "",
    //     vigenteFinal: ""
    //   },
    // contaEstudante: {
    //     nome: "",
    //     senha: "",
    //     email: "",
    //     matricula: 0
    //   },
  };


  componentDidMount() {
    const params = this.props.match.params;
    const id = params.id;
    const ativo = params.ativo;
    const editalNumero = params.editalNumero;
    const editalAno = params.editalAno;
    const editalNome = params.editalNome;
    const editalLink = params.editalLink;
    const editalVigenteInicio = params.editalVigenteInicio;
    const editalVigenteFinal = params.editalVigenteFinal;
    const contaEstudanteNome = params.contaEstudanteNome;
    const contaEstudanteEmail = params.contaEstudanteEmail;
    const contaEstudanteMatricula = params.contaEstudanteMatricula
    // this.findById(id);
    this.view(id,ativo,editalNumero,editalNome,editalAno,editalLink,editalVigenteInicio,editalVigenteFinal,contaEstudanteNome,contaEstudanteEmail,contaEstudanteMatricula);
    this.selectedBeneficiario(id);
   }
 
  selectedBeneficiario = () => {

  // this.setState({ id: props.id }, () => {
  //     console.log("Id do beneficiario: ", this.state.id);

  //   });
    // this.setState({ nomeEstudante: nome });
  }


  findById = (id) => {
        
    this.service.get(`/${id}`)
      .then((response) => {
        const beneficiario = response.data;
        const id = beneficiario.id;
        const ativo = beneficiario.ativo;
        // const email = beneficiario.contaEstudante.email;
        // const edital = response.data;
        // const id = edital.id;
        // const numero = edital.numero;
        // const ano = edital.ano;
        // const nome = edital.nome;
        // const link = edital.link;
        // const vigenteInicio = edital.vigenteInicio;
        // const vigenteFinal = edital.vigenteFinal;
        
        this.setState({id, ativo});
        console.log("findById: "+beneficiario.id)
      })
      .catch((error) => {
        console.log(error.response);
      });
    };




//   edit = (id) => {
//     this.props.history.push(`/atualizarBeneficiario/${id}`);
//   };

//   createBeneficiario = () => {
//     this.props.history.push(`/cadastrarBeneficiario`);
//   };

//   find = (id) => {
//     // this.service.find.id(id);
//     var params = "?";

//     if (this.state.id !== 0) {
//       if (params !== "?") {
//         params = `${params}&`;
//       }

//       params = `${params}id=${this.state.id}`;
//     }

//     if (this.state.nome !== "") {
//       if (params !== "?") {
//         params = `${params}&`;
//       }

//       params = `${params}nome=${this.state.nome}`;
//     }

//     if (this.state.email !== "") {
//       if (params !== "?") {
//         params = `${params}&`;
//       }

//       params = `${params}email=${this.state.email}`;
//     }

//     if (this.state.matricula !== 0) {
//       if (params !== "?") {
//         params = `${params}&`;
//       }

//       params = `${params}matricula=${this.state.matricula}`;
//     }

//     this.service
//       .get(`/${id}`)
//       .then((response) => {
//         const beneficiarios = response.data;
//         this.setState({ beneficiarios });
//         console.log(beneficiarios);
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   };


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
              <p className="text-xl font-semibold">Detalhes do Beneficiário</p>
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

                    <div>Dados do Beneficiário</div>
                    {/* contaEstudante */}
                    <p>Nome: </p>
                    <p>E-mail: {this.state.contaEstudanteEmail}</p>
                    <p>Matrícula: </p>
                    <p>Edital: numero ano - nome </p>
                    <p>Link do edital: </p>
                    <p>Vigência do edital: vigenteInicio a vigenteFinal </p>


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

export default DetalharBeneficiario;
