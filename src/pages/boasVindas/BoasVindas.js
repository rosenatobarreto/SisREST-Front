import React, { Component, useEffect, useState, useRef, memo } from "react";
import Header from "../../components/Header";
import MenuAluno from "../../components/MenuAluno";
import MenuAdministrador from "../../components/MenuAdministrador";
import MenuNutricionista from "../../components/MenuNutricionista";
import jwt_decode from "jwt-decode";
import PedidoAcessoApiService from "../../services/PedidoAcessoApiService";

// import ListarPedidosAcesso from '../ListarPedidosAcesso';

//Pedido de acesso traz beneficiario

const BoasVindas = (props) => {
  console.log(props);
  let titleRoleInPage = null;
  let apc = null;
  const servicePedidosAcesso = new PedidoAcessoApiService();
  const [armazenaPedidoAcesso, setArmazenaPedidoAcesso] = useState([]);
  const [estudanteComPedidoAcesso, setEstudanteComPedidoAcesso] = useState('');
  const [mensagem, setMensagem] = useState('');

  let token = localStorage.accessToken;
  const decoded = jwt_decode(token);

  const getSideMenu = () => {

    if (decoded.role === "Estudante" && !estudanteComPedidoAcesso) {
      titleRoleInPage = "Estudante";
      // if(estudanteComPedidoAcesso){
      // setMensagem("Você ainda não tem refeições");
      // }
      return <MenuAluno />
    }
    else if (decoded.role === "Assistente Social") {
      titleRoleInPage = "Administrador";
      return <MenuAdministrador />
    }
    else if (decoded.role === "Admin") {
      titleRoleInPage = "Administrador";
      return <MenuAdministrador />
    }
    else if (decoded.role === "Nutricionista") {
      titleRoleInPage = "Nutricionista";
      return <MenuNutricionista />
    }
  }

  // Função para encontrar um usuário pelo ID
  // const findPedidoAcesso = () => {
  //   const pedidoAcesso = servicePedidosAcesso.getAll((pedidoAcesso) => pedidoAcesso.id === id);
  //   setArmazenaPedidoAcesso(pedidoAcesso);
  // };
  useEffect(() => {
    const loadPedidos = async () => {
      const response = await servicePedidosAcesso.get('/buscarTodos')
      setArmazenaPedidoAcesso(response.data);
    };
    loadPedidos();
    findBeneficiarioInPedidoAcesso();
    console.log('ArmazenaPedidoAcesso', armazenaPedidoAcesso.length)
    console.log('Mensagem', mensagem);
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []
  );

  // const findBeneficiarioInPedidoAcesso = () => {
  //   const pedidoAcesso = armazenaPedidoAcesso.map((pedidoAcesso) => pedidoAcesso.beneficiario.contaEstudante.email === props.currentUser.email);
  //   setEstudanteComPedidoAcesso(pedidoAcesso);
  // };

  const findBeneficiarioInPedidoAcesso = () => {

    apc = armazenaPedidoAcesso.map((pedidoAcesso) => {

      if (pedidoAcesso.beneficiario.contaEstudante.email === props.currentUser.email) {

        // estudanteComPedidoAcesso.push(pedidoAcesso);
        setMensagem("Você ainda não tem refeições");
      }
    })
  }

  // const numbers = [1, 2, 3, 4, 5];
  // const dobro = numbers.map((numbers) => numbers * 2);
  // console.log(dobro);


  // const buscarEstudante(id) {

  //   // const loadPedidos = async () => {
  //   //   const response = await this.servicePedidosAcesso.get('/buscarTodos')
  //   //   console.log(response.data);
  //   // };
  //   // loadPedidos();

  //   const find = (id) => {

  //     servicePedidosAcesso
  //       .get(`/buscarPorID/${id}`)
  //       .then((response) => {
  //         const pedidoAcesso = response.data;
  //         const id = pedidoAcesso.id;

  //         // setId(id);
  //       })
  //       .catch((error) => {
  //         console.log(error.response);
  //       });
  //   }

  // }

  return (
    <div className="container-fluid h-screen flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
      {/*Col left  */}
      <div className="w-[220px] flex-shrink flex-grow-0 px-0">
        {/* Side Menu */}
        {getSideMenu()}
      </div>
      {/* Col right */}
      <div className="w-full">
        {/* Header */}

        <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
          <div className="flex flex-row-reverse pr-6">
            <p className="text-xs">{props.currentUser.email}</p>
          </div>
          <div className="flex flex-row-reverse pr-6">
            <p className="text-lg font-semibold">{titleRoleInPage}</p>
          </div>
          <div className="flex flex-row pl-6">
            <p className="text-xl font-semibold"></p>
          </div>
        </div>

        {/* Content two */}
        <div className="pt-4 pl-8 pr-8 mb-4">
          <div className="mt-0 sm:mt-0">
            <div className="row flex justify-center align-middle px-4 mt-1">
              <div className="md:grid md:grid-cols-1 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    {/* <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                    <p className="mt-1 text-sm text-gray-600">Use a perm</p> */}
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <p></p>
                  <p className="text-center">Bem-vindo(a) ao SisRest!</p>
                  <br />
                  <p className="text-center">
                    Você está logado(a) como {titleRoleInPage}
                  </p>

                  <div>

                    {/* <p>{armazenaPedidoAcesso.length}</p>
                    <p>Mensagem: {mensagem}</p> */}
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

export default memo(BoasVindas);
