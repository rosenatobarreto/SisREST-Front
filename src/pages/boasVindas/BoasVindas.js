import React, { Component } from "react";
import Header from "../../components/Header";
import MenuAdministrador from "../../components/MenuAdministrador";

class BoasVindas extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }


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
                      Você está logado(a) como Administrador(a)
                    </p>
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

export default BoasVindas;
