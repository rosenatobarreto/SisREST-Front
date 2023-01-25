import React from "react";
import LogoIntern from "../../assets/imgs/SisRestLogoIntern.png";
import SideBar from "../../components/SideBar";
// import Header from "../../components/Header";

import { withRouter } from "react-router-dom";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import SelectEdital from "../../components/SelectEdital";
import Footer from "../../components/Footer";
import MenuAdministrador from "../../components/MenuAdministrador";

class CadastrarBeneficiario extends React.Component {
  state = {
    nome: "",
    matricula: "",
    email: "",
    senha: "",
    admin: false,
    editalId: "",
  };
  constructor() {
    super();
    this.service = new BeneficiarioApiService();
  }

  componentWillUnmount() {
    this.clear();
  }

  // validate = () => {
  //   const errors = [];

  //   if (!this.state.nome) {
  //     errors.push("Campo Nome é obrigatório!");
  //   } else if (!this.state.nome.match(/[A-z ]{2,50}$/)) {
  //     errors.push("O Nome deve ter no mínimo 2 e no máximo 50 caracteres!");
  //   }

  //   if (!this.state.email) {
  //     errors.push("Campo E-mail é obrigatório! ");
  //   } else if (!this.state.email.match(/[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
  //     errors.push("Informe um E-mail válido!");
  //   }

  //   if (!this.state.matricula) {
  //     errors.push("Campo Matrícula é obrigatório!");
  //     errors.push("A Matrícula deve conter apenas números!");
  //   }

  //   if (!this.state.senha) {
  //     errors.push("Campo Senha é obrigatório!");
  //   } else if (
  //     !this.state.senha.match(
  //       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,30}$/
  //     )
  //   ) {
  //     errors.push("A Senha deve ter no mínimo 8 e no máximo 30 caracteres.");
  //     errors.push("A Senha deve conter ao menos um número.");
  //     errors.push("A Senha deve conter ao menos uma letra minúscula.");
  //     errors.push("A Senha deve conter ao menos uma letra maiúscula.");
  //     errors.push("A Senha deve conter ao menos um caractere especial.");
  //   }

  //   return errors;
  // };

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
        senha: this.state.senha,
        admin: this.state.admin,
      })
      .then((response) => {
        console.log(response);
        console.log(this.state);
        showSuccessMessage("Beneficiário criado com sucesso!");
      })
      .catch((error) => {
        console.log(error.response);
        console.log(this.state);
        showErrorMessage("O beneficiário não pode ser salvo!");
      });

    console.log("request finished");
  };

  cancel = () => {
    this.props.history.push("/");
  };

  inputSelectEdital = (e) => {
    this.setState({ editalId: e.target.value }, () => {
      console.log("Id do Edital: ", this.state.editalId);
    });
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
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            for="edital"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Edital
                          </label>
                          {/* <select id="edital" name="edital" autocomplete="edital-name" className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm">
                                <option>Edital 2022</option>
                                <option>Edital 2021</option>
                                <option>Edital 2020</option>
                              </select> */}

                          <SelectEdital onChange={this.inputSelectEdital} />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            for="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nome
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autocomplete="given-name"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            for="matricula"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Matrícula
                          </label>
                          <input
                            type="text"
                            name="matricula"
                            id="matricula"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            for="cpf"
                            className="block text-sm font-medium text-gray-700"
                          >
                            CPF
                          </label>
                          <input
                            type="text"
                            name="cpf"
                            id="cpf"
                            autocomplete=""
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            for="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            E-mail
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                          />
                        </div>

                        {/* <div className="col-span-6 sm:col-span-3">
                              <label for="last-name" className="block text-sm font-medium text-black">Last name</label>
                              <input type="text" name="last-name" id="last-name" autocomplete="family-name" className="mt-1 block w-full rounded-md border border-green-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"/>
                            </div> */}

                        {/* <div className="col-span-6 sm:col-span-4">
                              <label for="email-address" className="block text-sm font-medium text-black">Email address</label>
                              <input type="text" name="email-address" id="email-address" autocomplete="email" className="mt-1 block w-full rounded-md border border-green-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"/>
                            </div> */}

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            for="campus"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Campus
                          </label>
                          <select
                            id="campus"
                            name="campus"
                            autocomplete="campus"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          >
                            <option>Monteiro</option>
                            {/* <option>Cabedelo</option>
                                <option>Campina Grande</option> */}
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            for="curso"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Curso
                          </label>
                          <input
                            type="text"
                            name="curso"
                            id="curso"
                            autocomplete="curso"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
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
}

export default withRouter(CadastrarBeneficiario);
