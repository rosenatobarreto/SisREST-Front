import React, { Component } from "react";
import EditalApiService from "../../services/EditalApiService";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import MenuAdministrador from "../../components/MenuAdministrador";


class CadastrarEdital extends Component {

constructor(props) {
    super(props);
    console.log(props);
    this.service = new EditalApiService();
  }

  state = {
    numero: 0,
    ano: 0,
    nome: "",
    link: "",
    vigenteInicio: "",
    vigenteFinal: "",
  };


  componentWillUnmount() {
    this.clear();
  }

  validate = () => {
    const errors = [];

    // if (!this.state.numero) {
    //   errors.push("Campo Número é obrigatório!");
    // } else if (!this.state.numero.match(/[0-9 ]{1,50}$/)) {
    //   errors.push("O Número deve ter no mínimo 2 e no máximo 50 digitos!");
    // }

    // if (!this.state.ano) {
    //   errors.push("Campo E-mail é obrigatório! ");
    // } else if (!this.state.ano.match(/[0-9.]{4,4}$/)) {
    //   errors.push("Informe um ano válido!");
    // }

    // if (!this.state.nome) {
    //   errors.push("Campo Nome é obrigatório!");
    // } else if (!this.state.nome.match(/[A-Z]+(.){13,250}$/)) {
    //   errors.push(
    //     "O Nome do edital deve ter no mínimo 13 e no máximo 250 caracteres!"
    //   );
    // }

    // if (!this.state.vigenteInicio) {
    //   errors.push("Campo Data de Início é obrigatório!");
    // } else if (
    //   !this.state.vigenteInicio.match(
    //     /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/
    //   )
    // ) {
    //   errors.push("Data inválida!");
    // }

    // if (!this.state.vigenteFinal) {
    //   errors.push("Campo Data de Início é obrigatório!");
    // } else if (
    //   !this.state.vigenteFinal.match(
    //     /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/
    //   )
    // ) {
    //   errors.push("Data inválida!");
    // }
    return errors;
  };

  criar = () => {
    const errors = this.validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    this.service
      .criar({
        numero: this.state.numero,
        ano: this.state.ano,
        nome: this.state.nome,
        link: this.state.link,
        vigenteInicio: this.state.vigenteInicio,
        vigenteFinal: this.state.vigenteFinal
      })
      .then(response => {
        console.log(response);
        console.log(this.state);
        showSuccessMessage("Edital cadastrado com sucesso!");
      })
      .catch(error => {
        console.log(error.response);
        console.log(this.state);
        showErrorMessage("O edital não pode ser cadastrado!");
      });

    console.log("request finished");
  };

  cancel = () => {
    this.props.history.push("/boasVindas");
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
              <p className="text-xl font-semibold">Cadastrar Edital</p>
            </div>
          </div>

          {/* Content two */}
          <div className="pt-4 pl-8 pr-8 mb-4">
            <div className="mt-0 sm:mt-0">
              <div className="md:grid md:grid-cols-1 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0"></div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <form action="" method="POST">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                          <label
                            for="numero"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Número
                          </label>
                          <input
                            type="number"
                            name="numero"
                            id="numeroEdital"
                            autocomplete="given-name"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-2 sm:col-span-2 lg:col-span-2">
                          <label
                            for="ano"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Ano
                          </label>
                          <input
                            type="number"
                            name="ano"
                            id="anoEdital"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                          <label
                            for="nome"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Título do Edital
                          </label>
                          <input
                            type="text"
                            name="nome"
                            id="nomeEdital"
                            autocomplete=""
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-10 sm:col-span-10 lg:col-span-2">
                          <label
                            for="vigenteInicio"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Vigente a partir de
                          </label>
                          <input
                            type="date"
                            name="vigenteInicio"
                            id="vigenteInicio"
                            autocomplete="date"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-10 sm:col-span-10 lg:col-span-2">
                          <label
                            for="vigenteFinal"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Vigente até
                          </label>
                          <input
                            type="date"
                            name="vigenteFinal"
                            id="vigenteFinal"
                            autocomplete="date"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          >
                          </input>
                        </div>

                        <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                          <label
                            for="link"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Link do Edital
                          </label>
                          <input
                            type="url"
                            name="link"
                            id="linkEdital"
                            autocomplete=""
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row flex flex-row-reverse align-middle px-6 mt-1">
                      <div className="col ml-2">
                        <button onClick={this.cancel} type="submit"
                          className=" btn-cancel inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >CANCELAR
                        </button>
                      </div>
                      <div className="col mr-2">
                        <button onClick={this.criar} type="submit"
                          className=" btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >CADASTRAR
                        </button>
                      </div>
                      <br />
                    </div>
                    <br />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}  

export default CadastrarEdital;
