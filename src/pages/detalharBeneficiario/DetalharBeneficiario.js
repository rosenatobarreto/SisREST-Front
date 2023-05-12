import React, { Component} from "react";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import EditalApiService from "../../services/EditalApiService";
import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
import MenuAdministrador from "../../components/MenuAdministrador";

import { formatDateBr } from "../../util/FormatDate";

class DetalharBeneficiario extends Component {
    
    constructor(props) {
      super(props);
      this.serviceBeneficiario = new BeneficiarioApiService();
      this.serviceEdital = new EditalApiService();
      this.serviceContaEstudante = new ContaEstudanteApiService();
      console.log("Detalhes: ",props);
      
    }

  state = {
    // id: 0,
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
  };

  
  componentDidMount() {
    const params = this.props.match.params;
    const id = params.id;
    this.findById(id);
   }

  findById = (id) => {
        
    this.serviceBeneficiario.get(`/buscarPorID/${id}`)
      .then((response) => {
        const beneficiario = response.data;
        const id = beneficiario.id;
        const ativo = beneficiario.ativo;
        const editalNumero = beneficiario.edital.numero;
        const editalAno = beneficiario.edital.ano;
        const editalNome = beneficiario.edital.nome;
        const editalLink = beneficiario.edital.link;
        const editalVigenteInicio = beneficiario.edital.vigenteInicio;
        const editalVigenteFinal = beneficiario.edital.vigenteFinal;
        const contaEstudanteNome = beneficiario.contaEstudante.nome;
        const contaEstudanteEmail = beneficiario.contaEstudante.email;
        const contaEstudanteMatricula = beneficiario.contaEstudante.matricula;
        
        this.setState({id:id, ativo:ativo,editalNumero:editalNumero,editalNome:editalNome,
          editalAno:editalAno,editalLink:editalLink,editalVigenteInicio:editalVigenteInicio,
          editalVigenteFinal:editalVigenteFinal,contaEstudanteNome:contaEstudanteNome,
          contaEstudanteEmail:contaEstudanteEmail,contaEstudanteMatricula:contaEstudanteMatricula});
      })
      .catch((error) => {
        console.log(error.response);
      });
    };

  voltar = () => {
    this.props.history.push("/listarBeneficiarios");
  };

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
                  <div className="px-4 ml-5 sm:px-0">
                    <h3 className="text-lg mb-10 font-medium leading-6 text-gray-900">Dados do Estudante</h3>

                    <p className="mt-1 ml-10 text-md text-gray-900">Nome:</p>
                    <p className="mt-0 ml-10 mb-5 text-lg text-gray-900">{this.state.contaEstudanteNome}</p>

                    <p className="mt-1 ml-10 text-md text-gray-900">E-mail:</p>
                    <p className="mt-0 ml-10 mb-5 text-lg text-gray-900">{this.state.contaEstudanteEmail}</p>

                    <p className="mt-1 ml-10 text-md text-gray-900">Matrícula:</p>
                    <p className="mt-0 ml-10 mb-5 text-lg text-gray-900">{this.state.contaEstudanteMatricula}</p>

                    <p className="mt-1 ml-10 text-md text-gray-900">Edital:</p>
                    <p className="mt-0 ml-10 mb-5 text-lg text-gray-900">{this.state.editalNumero}-{this.state.editalAno} {this.state.editalNome}</p>

                    <p className="mt-1 ml-10 text-md text-gray-900">Link do edital:</p>
                    <p className="mt-0 ml-10 mb-5 text-lg text-gray-900"><a href={this.state.editalLink} target="_blank" rel="noreferrer" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{this.state.editalLink}</a></p>

                    <p className="mt-1 ml-10 text-md text-gray-900">Vigência do edital:</p>
                    <p className="mt-0 ml-10 mb-5 text-lg text-gray-900">{formatDateBr(this.state.editalVigenteInicio)} a {formatDateBr(this.state.editalVigenteFinal)}</p>


                  </div>
                  <div className="row flex flex-row-reverse align-middle px-6 mt-1">
                    <button
                          onClick={this.voltar}
                          type="submit"
                          className=" btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                        VOLTAR
                    </button>

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
