import React, { Component } from "react";
import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import MenuAdministrador from "../../components/MenuAdministrador";
class AtualizarContaEstudante extends Component {
  
  constructor(props) {
    super(props);
    this.service = new ContaEstudanteApiService();
  }
  
  state = {
    id: 0,
    nome: "",
    matricula: "",
    email: "",
    campus: "",
    curso: "",
  };
  
  componentDidMount() {
    const params = this.props.match.params;
    const id = params.id;
    this.find(id);
  }
  

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

  
  update = () => {
    
    const errors = this.validate();
    
    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false
    }

    this.service.update(this.state.id,
      {
        nome: this.state.nome,
        matricula: this.state.matricula,
        email: this.state.email,
        campus: this.state.campus,
        curso: this.state.curso,
      }
    ).then(response => {
      console.log(response);
      showSuccessMessage('Conta Estudante atualizada com sucesso!');
      this.props.history.push("/listarContasEstudante");
    }
    ).catch(error => {
      console.log(error.response);
      showErrorMessage('A conta não pode ser atualizado!');
    }
    );

    console.log('request finished');
  }

  find = (id) => {
        
    this.service.get(`/${id}`)
      .then((response) => {
        const contaEstudante = response.data;
        const id = contaEstudante.id;
        const nome = contaEstudante.nome;
        const matricula = contaEstudante.matricula;
        const email = contaEstudante.email;
        const campus = contaEstudante.campus;
        const curso = contaEstudante.curso;
                
        this.setState({id:id, nome:nome, email:email, matricula:matricula, campus:campus, curso:curso});
      })
      .catch((error) => {
        console.log(error.response);
      });
    };
    

  cancel = () => {
      this.props.history.push("/listarContasEstudante");
  };
  
  // componentWillUnmount() {
  //   this.clear();
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
              <p className="text-xl font-semibold">Atualizar Usuário</p>
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
                  <form action="" method="PUT">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        
                        <div className="col-span-12 sm:col-span-12 lg:col-span-12">
                          <label
                            for="name"
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

                        <div className="col-span-4 sm:col-span-6 lg:col-span-6">
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
                        
                        <div className="col-span-12 sm:col-span-6 lg:col-span-6">
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

                        <div className="col-span-12 sm:col-span-6 lg:col-span-6">
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

                        <div className="col-span-12 sm:col-span-6 lg:col-span-6">
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
                          onClick={this.update}
                          type="submit"
                          className=" btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          ATUALIZAR
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

export default AtualizarContaEstudante;





// import React, { Component } from "react";
// // import LogoIntern from "../../assets/imgs/SisRestLogoIntern.png";
// // import SideBar from "../../components/SideBar";
// // import Header from "../../components/Header";

// // import { withRouter } from "react-router-dom";
// import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
// import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
// import SelectEdital from "../../components/SelectEdital";
// // import Footer from "../../components/Footer";
// import MenuAdministrador from "../../components/MenuAdministrador";

// class AtualizarContaEstudante extends Component {

//   constructor(props) {
//     super(props);
//     this.service = new ContaEstudanteApiService();
//   }

//   state = {
//     id: 0,
//     nome: "",
//     matricula: 0,
//     email: "",
//     senha: "",
//   };

//   componentDidMount() {
//     const params = this.props.match.params;
//     const id = params.id;
//     this.findById(id);
//   }


//   validate = () => {
//     const errors = [];

//     if (!this.state.nome) {
//       errors.push("Campo Nome é obrigatório!");
//     } else if (!this.state.nome.match(/[A-z ]{2,50}$/)) {
//       errors.push("O Nome deve ter no mínimo 2 e no máximo 50 caracteres!");
//     }

//     if (!this.state.email) {
//       errors.push("Campo E-mail é obrigatório! ");
//     } else if (!this.state.email.match(/[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
//       errors.push("Informe um E-mail válido!");
//     }

//     if (!this.state.matricula) {
//       errors.push("Campo Matrícula é obrigatório!");
//       errors.push("A Matrícula deve conter apenas números!");
//     }

//     if (!this.state.senha) {
//       errors.push("Campo Senha é obrigatório!");
//     } else if (
//       !this.state.senha.match(
//         /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,30}$/
//       )
//     ) {
//       errors.push("A Senha deve ter no mínimo 8 e no máximo 30 caracteres.");
//       errors.push("A Senha deve conter ao menos um número.");
//       errors.push("A Senha deve conter ao menos uma letra minúscula.");
//       errors.push("A Senha deve conter ao menos uma letra maiúscula.");
//       errors.push("A Senha deve conter ao menos um caractere especial.");
//     }

//     return errors;
//   };

//   cancel = () => {
//     this.props.history.push("/listarContasEstudante");
//   };


//   update = () => {

//         const errors = this.validate();

//         if (errors.length > 0) {
//             errors.forEach((message, index) => {
//                 showErrorMessage(message);
//             });
//             return false
//         }

//         this.service.update(this.state.id,
//             {
//                 nome: this.state.nome,
//                 matricula: this.state.matricula,
//                 email: this.state.email,
//                 senha: this.state.senha,                
//             }
//         ).then(response => {
//             console.log(response);
//             showSuccessMessage('Conta atualizada com sucesso!');
//             this.props.history.push("/listarContaEstudante");
//         }
//         ).catch(error => {
//             console.log(error.response);
//             showErrorMessage('A conta não pode ser atualizado!');
//         }
//         );

//         console.log('request finished');
//   }

//   findById = (id) => {
//     this.service.get(`/${id}`)
//     .then(response => {
//       const contaEstudante = response.data;
//       const id = contaEstudante.id;
//       const nome = contaEstudante.nome;
//       const matricula = contaEstudante.matricula;
//       const email = contaEstudante.email;
//       const senha = contaEstudante.senha;
                
//       this.setState({ id, nome, matricula, email, senha });
//     }
//     ).catch(error => {
//         console.log(error.response);
//       }
//     );
//   }


//   render() {
//     return (
//       <div className="container-fluid h-screen flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
//         {/*Col left  */}
//         <div className="w-[220px] flex-shrink flex-grow-0 px-0">
//           {/* Side Menu */}
//           <MenuAdministrador /> 
//         </div>
//         {/* Col right */}
//         <div className="w-full">
//           {/* Header */}
//           <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
//             <div className="flex flex-row-reverse pr-6">
//                 <p className="text-xs">{this.props.currentUser.email}</p>
//             </div>
//             <div className="flex flex-row-reverse pr-6">
//                 <p className="text-lg font-semibold">Administrador</p>
//             </div>
//             <div className="flex flex-row pl-6">
//               <p className="text-xl font-semibold">Atualizar Conta</p>
//             </div>
//           </div>

//           {/* Content two */}
//           <div className="pt-4 pl-8 pr-8 mb-4">
//             <div className="mt-0 sm:mt-0">
//               <div className="md:grid md:grid-cols-1 md:gap-6">
//                 <div className="md:col-span-1">
//                   <div className="px-4 sm:px-0">
                    
//                   </div>
//                 </div>
//                 <div className="mt-5 md:col-span-2 md:mt-0">
//                   <form action="" method="PUT">
                  
//                     <div className="bg-white px-4 py-5 sm:p-6">
//                       <div className="grid grid-cols-6 gap-6">
//                         <div className="col-span-6 sm:col-span-3">
//                           <label
//                             for="name"
//                             className="block text-sm font-medium text-gray-700"
//                           >
//                             Nome
//                           </label>
//                           <input
//                             type="text"
//                             name="name"
//                             id="name"
//                             autocomplete="given-name"
//                             className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
//                             value={this.state.nome} onChange={(e) => { this.setState({ nome: e.target.value }) }}
//                           />
//                         </div>

//                         <div className="col-span-6 sm:col-span-6 lg:col-span-2">
//                           <label
//                             for="matricula"
//                             className="block text-sm font-medium text-gray-700"
//                           >
//                             Matrícula
//                           </label>
//                           <input
//                             type="text"
//                             name="matricula"
//                             id="matricula"
//                             className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
//                             value={this.state.matricula} onChange={(e) => { this.setState({ matricula: e.target.value }) }}
//                           />
//                         </div>

//                         <div className="col-span-6 sm:col-span-3 lg:col-span-2">
//                           <label
//                             for="email"
//                             className="block text-sm font-medium text-gray-700"
//                           >
//                             E-mail
//                           </label>
//                           <input
//                             type="email"
//                             name="email"
//                             id="email"
//                             autocomplete="email"
//                             className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
//                             value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value }) }}
//                           />
//                         </div>


//                         <div className="col-span-6 sm:col-span-3">
//                           <label
//                             for="senha"
//                             className="block text-sm font-medium text-gray-700"
//                           >
//                             Senha
//                           </label>
//                           <input
//                             type="senha"
//                             name="senha"
//                             id="senha"
//                             autocomplete=""
//                             className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
//                             value={this.state.senha} onChange={(e) => { this.setState({ senha: e.target.value }) }}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="row flex flex-row-reverse align-middle px-6 mt-1">
//                       <div className="col ml-2">
//                         <button
//                           onClick={this.cancel}
//                           type="submit"
//                           className=" btn-cancel inline-flex justify-center 
//                                     rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
//                                     font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
//                                     focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                         >
//                           CANCELAR
//                         </button>
//                       </div>
//                       <div className="col mr-2">
//                         <button
//                           onClick={this.update}
//                           type="submit"
//                           className=" btn-save inline-flex justify-center 
//                                     rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
//                                     font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
//                                     focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                         >
//                           ATUALIZAR
//                         </button>
//                       </div>
//                       <br />
//                     </div>

//                     <div className=""></div>
//                     <br />
                    
                    
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default AtualizarContaEstudante;