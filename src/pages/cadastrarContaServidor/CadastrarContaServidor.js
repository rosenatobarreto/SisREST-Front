import React, { useEffect, useState, memo } from "react";
import ContaServidorApiService from "../../services/ContaServidorApiService";
// import Footer from "../../components/Footer";
import MenuAdministrador from "../../components/MenuAdministrador";
import Footer from "../../components/Footer";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import { InputMask } from 'primereact/inputmask';
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from "primereact/radiobutton";
import { Button } from 'primereact/button';

const CadastrarContaServidor = (props) => {

  const service = new ContaServidorApiService();

  const [nome, setNome] = useState(null);
  const [email, setEmail] = useState(null);
  const [matriculaSIAPE, setMatriculaSIAPE] = useState(0);
  const [isAdmin, setIsAdmin] = useState(null);
  const [campus, setCampus] = useState(null);

  useEffect(() => {
    // findAllEditais();
    // findAllContasEstudantes();
  
    // // return () => {
    // //   window.removeEventListener('scroll', handleScroll)
    // // }

    // const loadEditais = async () => {
    //         const response = await serviceEdital.get('/buscarTodos');//.then((data) => setEditais(data));
    //         setEditais(response.data);
    //     };
    //     loadEditais(); 

      }, []
  );

  const validate = () => {
    const errors = [];
    return errors;
  };

  const create = () => {
    const errors = validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    service.create(
      setNome(nome),
      setEmail(email),
      setMatriculaSIAPE(matriculaSIAPE),
      setIsAdmin(isAdmin),
      setCampus(campus),
    )
      .then((response) => {
        console.log(response);
        // console.log(this.state);
        showSuccessMessage("Beneficiário criado com sucesso!");
        props.history.push("/cadastrarContaServidor");
      })
      .catch((error) => {
        console.log(error.response);
        // console.log(this.state);
        showErrorMessage("O beneficiário não pode ser salvo!");
      });

    console.log("request finished");
  };

  const cancel = () => {
    props.history.push("/boasVindas");
  };

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
            <p className="text-xs">{props.currentUser.email}</p>
          </div>
          <div className="flex flex-row-reverse pr-6">
            <p className="text-lg font-semibold">Administrador</p>
          </div>
          <div className="flex flex-row pl-6">
            <p className="text-xl font-semibold">Cadastrar Servidor</p>
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
              <div className="mt-2 md:col-span-2 md:mt-0">
                <form action="">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    {/* <div className="grid grid-cols-6 gap-6">
                    </div> */}

                    <div className="col-span-10 sm:col-span-10 lg:col-span-12">
                      <label
                      for="nome"
                      className="block text-sm font-medium text-gray-700 pb-2">
                      Nome
                      </label>
                      <div className="card flex justify-content-center gap-3">
                        <InputText id="nomeId" className="w-full" value={nome} onChange={(e) => setNome(e.target.value)} />
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                      
                      <label
                      for="email"
                      className="block text-sm font-medium text-gray-700 pb-2 pt-4">
                      E-mail
                      </label>

                      <div className="card flex justify-content-center gap-3">
                        <InputText  id="emailId" className="w-96" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>


                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                      <label
                      for="matSiape"
                      className="block text-sm font-medium text-gray-700 pb-2 pt-4">
                      Administrador do Sistema?
                      </label>

                      <div className="card flex justify-content-center gap-3">
                        {/* <InputText id="matSiapeId" className="w-auto" value={matriculaSIAPE} onChange={(e) => setMatriculaSIAPE(e.target.value)} /> */}
                      <select
                            id="idIsAdmin"
                            name="isAdmin"
                            className="w-20 h-10 md:w-20rem border-green-50"
                            value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}
                          >
                            <option value="true" >Sim</option>
                            <option value="false" >Não</option>
                            
                            
                          </select>

                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                      <label
                      for="matSiape"
                      className="block text-sm font-medium text-gray-700 pb-2 pt-4">
                      Matrícula Siape
                      </label>

                      <div className="card flex justify-content-center gap-3">
                        <InputText type="number" id="matSiapeId" className="w-auto" value={matriculaSIAPE} onChange={(e) => setMatriculaSIAPE(e.target.value)} />
                      </div>
                    </div>

                    <div className="col-span-10 sm:col-span-10 lg:col-span-12">
                      <label
                      for="campus"
                      className="block text-sm font-medium text-gray-700 pb-2 pt-4">
                      Campus
                      </label>
                      <div className="card flex justify-content-center gap-3">
                        <InputText id="campusId" className="w-full" value={campus} onChange={(e) => setCampus(e.target.value)} />
                      </div>
                    </div>

                  </div>
            
                  <div className="">
                  
                    <div className="row flex flex-row-reverse align-middle px-6 mt-1">

                      <div className="col ml-2">
                        <div className="card flex justify-content-center">
                          <Button label="CANCELAR" severity="sucess" outlined onClick={cancel} />
                        </div>
                      </div>

                      <div className="col mr-2">
                        <div className="card flex justify-content-center">
                          <Button label="CADASTRAR" severity="sucess" onClick={create} />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default memo(CadastrarContaServidor);
