import React from "react";
import LogoIntern from "../../assets/imgs/SisRestLogoIntern.png";
import SideBar from "../../components/SideBar";
// import Header from "../../components/Header";

import { withRouter } from "react-router-dom";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";


class CadastrarBeneficiario extends React.Component {

  state = {
    nome: '',
    matricula: '',
    email: '',
    senha: '',
    admin: false
  };
  constructor() {
    super();
    this.service = new BeneficiarioApiService();
  }

  componentWillUnmount() {
    this.clear();
  }

  validate = () => {
    const errors = [];

    if (!this.state.nome) {
      errors.push("Campo Nome é obrigatório!");
    } else if (!this.state.nome.match(/[A-z ]{2,50}$/)) {
      errors.push("O Nome deve ter no mínimo 2 e no máximo 50 caracteres!");
    }

    if (!this.state.email) {
      errors.push("Campo E-mail é obrigatório! ");
    } else if (!this.state.email.match(/[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      errors.push("Informe um E-mail válido!");
    }

    if (!this.state.matricula) {
      errors.push("Campo Matrícula é obrigatório!");
      errors.push("A Matrícula deve conter apenas números!");
    }

    if (!this.state.senha) {
      errors.push("Campo Senha é obrigatório!");
    } else if (
      !this.state.senha.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,30}$/
      )
    ) {
      errors.push("A Senha deve ter no mínimo 8 e no máximo 30 caracteres.");
      errors.push("A Senha deve conter ao menos um número.");
      errors.push("A Senha deve conter ao menos uma letra minúscula.");
      errors.push("A Senha deve conter ao menos uma letra maiúscula.");
      errors.push("A Senha deve conter ao menos um caractere especial.");
    }

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
        senha: this.state.senha,
        admin: this.state.admin
      })
      .then((response) => {
        console.log(response);
        console.log(this.state);
        showSuccessMessage("Beneficiário criado com sucesso!");
        // this.props.history.push("/login");
      })
      .catch((error) => {
        console.log(error.response);
        console.log(this.state);
        showErrorMessage('O beneficiário não pode ser salvo!');
      });

    console.log("request finished");
  };

  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
    <div className="container-fluid flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
          {/*Col left  */}
        <div className="w-[220px] flex-shrink flex-grow-0 px-0">
          {/* Side Menu */}
          <div className="w-[220px] sticky top-0 p-4 bg-[#93c47d] h-full">
            <div className="mx-auto flex-col justify-center items-center">
              <img className="h-[120px] w-auto" alt="SisRest" src={LogoIntern} />
              <div className="items-center">
                <spam className="text-xs text-center">maria.monteiro@ifpb.edu.br</spam>
              </div>
            </div>
            
            <div class="border-b-2 mt-2 mb-2 border-green-100 ..."></div>
            {/* Inicio do menu */}
            <ul className="flex sm:flex-col overflow-hidden content-center justify-center divide-y divide-gray-600">
              <li className="py-2 hover:bg-gray-300">
                <a className="truncate" href="#">
                  {/* <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg" className="w-7 sm:mx-2 mx-4 inline" /> */}
                  <span className="hidden sm:inline text-sm">
                    Validar Pedido de Refeição
                  </span>
                </a>
              </li>
              <li className="py-2 hover:bg-gray-300">
                <a className="truncate" href="#">
                  {/* <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/cog.svg" className="w-7 sm:mx-2 mx-4 inline" />  */}
                  <span className="hidden sm:inline text-sm">Lista Diária</span>
                </a>
              </li>
              <li className="py-2 hover:bg-gray-300">
                <a className="" href="#">
                  {/* <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/gift.svg" className="w-7 sm:mx-2 mx-4 inline" />  */}
                  <span className="hidden sm:inline text-sm">
                    Cancelamentos
                  </span>
                </a>
              </li>
              <li className="py-2 hover:bg-gray-300">
                <a className="" href="#">
                  {/* <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/chart-bar.svg" className="w-7 sm:mx-2 mx-4 inline" />  */}
                  <span className="hidden sm:inline text-sm">
                    Gerenciar Usuários
                  </span>
                </a>
              </li>
              <li className="py-2 hover:bg-gray-300">
                <a className="" href="#">
                  {/* <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/collection.svg" className="w-7 sm:mx-2 mx-4 inline" />  */}
                  <span className="hidden sm:inline text-sm">
                    Consultar Faltas
                  </span>
                </a>
              </li>
              <li className="py-2 hover:bg-gray-300">
                <a className="" href="/">
                  {/* <img src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/collection.svg" className="w-7 sm:mx-2 mx-4 inline" />  */}
                  <span className="hidden sm:inline text-sm">Sair</span>
                </a>
              </li>
            </ul>
            {/* Fim do menu */}
          </div>
        </div>
        {/* Col right */}
        <div className="w-full">
            {/* Header */}
            <div className="h-[120px] bg-gray-200 pt-4 pl-6 pr-6 mb-4">
                teste
            </div>
            {/* Content one */}
            {/* <div className="pt-4 pl-8 pr-8 mb-4 p-6">
                      <p className="text-red-500 text-xs italic mb-8">Please fill out this field.</p>
                <form className="w-full max-w-lg">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Nome
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-green-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                      id="grid-first-name" type="text" placeholder=""/>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
              id="grid-last-name" type="text" placeholder="Doe"/>
            </div>
        </div>
              <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Password
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
      py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      id="grid-password" type="password" placeholder="senha"/>
      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
        City
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
      py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      id="grid-city" type="text" placeholder="Albuquerque"/>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        Tipo de usuário
      </label>
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 
        px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Estudante</option>
          <option>Assistente Social</option>
          <option>Nutricionista</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        Zip
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
      py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
    </div>
  </div>
</form>
            </div> */}
        
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

                            <div className="col-span-6 sm:col-span-3">
                              <label for="edital" className="block text-sm font-medium text-gray-700">Edital</label>
                              <select id="edital" name="edital" autocomplete="edital-name" className="mt-1 block w-full rounded-md border border-green-300 bg-white py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm">
                                <option>Edital 2022</option>
                                <option>Edital 2021</option>
                                <option>Edital 2020</option>
                              </select>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label for="name" className="block text-sm font-medium text-black">Nome</label>
                              <input type="text" name="name" id="name" autocomplete="given-name" className="mt-1 block w-full rounded-md border border-green-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"/>
                            </div>

                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                              <label for="matricula" className="block text-sm font-medium text-gray-700">Matrícula</label>
                              <input type="text" name="matricula" id="matricula"  className="mt-1 block w-full rounded-md border border-green-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"/>
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
                              <input type="text" name="cpf" id="cpf" autocomplete="" className="mt-1 block w-full rounded-md border border-green-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"/>
                            </div>

                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                              <label for="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                              <input type="email" name="email" id="email" autocomplete="email" className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"/>
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
                              <label for="campus" className="block text-sm font-medium text-gray-700">Campus</label>
                              <select id="campus" name="campus" autocomplete="campus" className="mt-1 block w-full rounded-md border border-green-300 bg-white py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm">
                                <option>Monteiro</option>
                                {/* <option>Cabedelo</option>
                                <option>Campina Grande</option> */}
                              </select>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label for="curso" className="block text-sm font-medium text-gray-700">Curso</label>
                              <input type="text" name="curso" id="curso" autocomplete="curso" className="mt-1 block w-full rounded-md border border-green-300 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"/>
                            </div>

                            
              </div>
          </div>
          <div className="">

          <div className="col-span-6 bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button onClick={this.create} type="submit" className=" btn-save inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">CADASTRAR</button>
          </div>
          <div className="col-span-6 bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button onClick={this.cancel} type="submit" className=" btn-cancel inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">CANCELAR</button>
          </div>

          </div>
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

