import React, { Component } from "react";
import "../assets/css/Style.css";
import LogoIntern from "../assets/imgs/SisRestLogoIntern.png";
import BeneficiarioApiService from "../services/BeneficiarioApiService";


class MenuAdministrador extends Component {

  constructor(props) {
    super(props);
    this.serviceBeneficiario = new BeneficiarioApiService();
    // this.serviceEdital = new EditalApiService();
    // this.serviceContaEstudante = new ContaEstudanteApiService();
    console.log("Detalhes: ",props);
    
  }

  detailsBeneficiario (id) {
    this.props.history.push(`/detalharBeneficiario/${id}`);
  };

  render() {
    return (

      <div className="w-[220px] sticky top-0 pt-4 pl-4 pr-4 bg-[#93c47d] h-screen">
         
        <div className="mx-auto">
          <img
            className="h-[120px] w-auto pl-12 pr-4 flex-auto"
            alt="SisRest"
            src={LogoIntern}
          />
        </div>

        <div className="border-b-2 mt-2 mb-2 border-green-100 ..."></div>
        
        <ul className="flex sm:flex-col overflow-hidden content-center justify-center divide-y divide-gray-600">
          <li className="py-2 hover:bg-gray-300">
            <a className="truncate" href="/dadosBeneficiario">
                <span className="hidden sm:inline text-sm">Minhas informações</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="truncate" href="/participarListaDiaria">
                <span className="hidden sm:inline text-sm">Confirmar Presença</span>
            </a>
          </li>
          {/* <li className="py-2 hover:bg-gray-300">
            <a className="truncate" href="/">
              <span className="hidden sm:inline text-sm">Lista Diária</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/">
              <span className="hidden sm:inline text-sm">Cancelamentos</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/">
              <span className="hidden sm:inline text-sm">Consultar Faltas</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/listarContasEstudante">
              <span className="hidden sm:inline text-sm">Gerenciar Usuários</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/listarBeneficiarios">
              <span className="hidden sm:inline text-sm">Gerenciar Beneficiários</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/listarEditais">
              <span className="hidden sm:inline text-sm">Gerenciar Editais</span>
            </a>
          </li>
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/listarContasServidor">
              <span className="hidden sm:inline text-sm">Gerenciar Servidores</span>
            </a>
          </li> */}
          <li className="py-2 hover:bg-gray-300">
            <a className="" href="/">
              <span className="hidden sm:inline text-sm">Sair</span>
            </a>
          </li>
        </ul>
        
      </div>
    );
  }
}

export default MenuAdministrador;
