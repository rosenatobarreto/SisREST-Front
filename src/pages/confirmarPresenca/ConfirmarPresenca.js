import React, { useEffect, useState, useRef, memo } from "react";

import ListaDiariaApiService from "../../services/ListaDiariaApiService";
import MenuAluno from "../../components/MenuAluno";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';


const ConfirmarPresenca = (props) => {

    const service = new ListaDiariaApiService();

    const [id, setId] = useState(0);
    const [beneficiario, setBeneficiario] = useState(0);
    const [listaDiaria, setListaDiaria] = useState([]);
    const [confirmadoEm, setConfirmadoEm] = useState('');
    const [compareceuEm, setCompareceuEm] = useState('');

    useEffect(() => {
        
    }, []
    );

    return (
        <div className="container-fluid h-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
          {/*Col left  */}
          <div className="w-[220px] flex-shrink flex-grow-0 px-0">
            {/* Side Menu */}
            <MenuAluno /> 
          </div>
          {/* Col right */}
          <div className="w-full">
            {/* Header */}
            <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
              <div className="flex flex-row-reverse pr-6">
                  <p className="text-xs">{props.currentUser.email}</p>
              </div>
              <div className="flex flex-row-reverse pr-6">
                <p className="text-lg font-semibold">Estudante</p>
              </div>
              <div className="flex flex-row pl-6">
                <p className="text-xl font-semibold">Lista Diária - Solicitar Participação</p>
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
                    <form action="#" method="POST">
                      {/* Begin Card */}
                      {/* <div className="overflow-hidden shadow sm:rounded-md"> */}
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
  
  
                        </div>
                      </div>
                      {/* <div className="row flex flex-row-reverse align-middle px-4 mt-1">
                        <div className="col mr-2">
                          <Button id="btnNew" label="NOVO EDITAL" severity="sucess" raised onClick={createEdital} />
                        </div>
                      </div> */}
  
                      <div className="">
                        
                      </div>
                      {/* </div> */}
                      {/* End Card */}
                    </form>
                    <br />
                    <div className="row">
                      <div className="">
                        <div className="pt-4 pl-8 pr-8 mb-4">
                          <div className="card">
                              {/* Inclui elementos da tela */}
                            </div>
                        </div>
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

export default memo(ConfirmarPresenca);