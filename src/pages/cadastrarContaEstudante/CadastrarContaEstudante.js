import React, { Component } from "react";

import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
import SelectEdital from "../../components/SelectEdital";
// import Footer from "../../components/Footer";
import MenuAdministrador from "../../components/MenuAdministrador";

class CadastrarContaEstudante extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.service = new ContaEstudanteApiService();
  }

  state = {
    nome: "",
    matricula: "",
    email: "",
    campus: "",
    curso: "",
  };

  validate = () => {
    const errors = [];

    // if (!this.state.nome) {
    //   errors.push("Campo Nome é obrigatório!");
    // } else if (!this.state.nome.match(/[A-z ]{2,50}$/)) {
    //   errors.push("O Nome deve ter no mínimo 2 e no máximo 50 caracteres!");
    // }

    // if (!this.state.email) {
    //   errors.push("Campo E-mail é obrigatório! ");
    // } else if (!this.state.email.match(/[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
    //   errors.push("Informe um E-mail válido!");
    // }

    // if (!this.state.matricula) {
    //   errors.push("Campo Matrícula é obrigatório!");
    //   errors.push("A Matrícula deve conter apenas números!");
    // }

    // if (!this.state.senha) {
    //   errors.push("Campo Senha é obrigatório!");
    // } else if (
    //   !this.state.senha.match(
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,30}$/
    //   )
    // ) {
    //   errors.push("A Senha deve ter no mínimo 8 e no máximo 30 caracteres.");
    //   errors.push("A Senha deve conter ao menos um número.");
    //   errors.push("A Senha deve conter ao menos uma letra minúscula.");
    //   errors.push("A Senha deve conter ao menos uma letra maiúscula.");
    //   errors.push("A Senha deve conter ao menos um caractere especial.");
    // }

    return errors;
  };

  create = () => {
    const errors = this.validate();
    //this.service.create(this.state)
    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    this.service
      .create({
        nome: this.state.nome,
        matricula: this.state.matricula,
        email: this.state.email,
        campus: this.state.campus,
        curso: this.state.curso,
      })
      .then((response) => {
        console.log(response);
        console.log(this.state);
        showSuccessMessage("Conta criada com sucesso!");
        this.props.history.push("/listarContasEstudante");
      })
      .catch((error) => {
        console.log(error.response);
        console.log(this.state);
        showErrorMessage("A conta não pode ser criada!");
      });

    console.log("request finished");
  };

  cancel = () => {
    this.props.history.push("/listarContasEstudante");
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
              <p className="text-xl font-semibold">Cadastrar Usuário</p>
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
                        
                        <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                          <label
                            for="nome"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nome
                          </label>
                          <input
                            type="text"
                            name="nome"
                            id="idNome"
                            autocomplete="given-name"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm 
                            focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={this.state.nome} onChange={(e) => { this.setState({ nome: e.target.value }) }}
                          />
                        </div>

                        <div clasName="">
                          {/* //className="col-span-6 sm:col-span-6 lg:col-span-6"> */}
                          <label
                            for="matricula"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Matrícula
                          </label>
                          <input
                            type="number"
                            name="matricula"
                            id="idMatricula"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm 
                            focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={this.state.matricula} onChange={(e) => { this.setState({ matricula: e.target.value }) }}
                          />
                        </div>
                        
                        <div className="col-span-8 sm:col-span-6 lg:col-span-6">
                          <label
                            for="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            E-mail
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="idEmail"
                            autocomplete="email"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 py-2 px-3 shadow-sm 
                            focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }}
                          />
                        </div>

                        <div className="col-span-10 sm:col-span-6 lg:col-span-6">
                          <label
                            for="campus"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Campus
                          </label>
                          <input
                            type="campus"
                            name="campus"
                            id="idCampus"
                            autocomplete="campus"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 py-2 px-3 shadow-sm 
                            focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={this.state.campus} onChange={(e) => { this.setState({ campus: e.target.value }) }}
                          />
                        </div>

                        <div className="col-span-10 sm:col-span-6 lg:col-span-6">
                          <label
                            for="curso"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Curso
                          </label>
                          <input
                            type="curso"
                            name="curso"
                            id="idCurso"
                            autocomplete="curso"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 py-2 px-3 shadow-sm 
                            focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={this.state.curso} onChange={(e) => { this.setState({ curso: e.target.value }) }}
                          />
                        </div>

                      </div>
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
                      </div>
                      <br />
                    </div>

                    <div className=""></div>
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

export default CadastrarContaEstudante;
