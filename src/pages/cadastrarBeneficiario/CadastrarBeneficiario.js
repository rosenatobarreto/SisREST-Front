import React, { useEffect, useState, memo } from "react";

import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import EditalApiService from "../../services/EditalApiService";
import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
// import SelectEdital from "../../components/SelectEdital";
// import SelectContaEstudante from "../../components/SelectContaEstudante";
import ListContasEstudanteTable from "../../components/ListContasEstudanteTable";
import ListEditaisTable from "../../components/ListEditaisTable";
import Footer from "../../components/Footer";
import MenuAdministrador from "../../components/MenuAdministrador";

import { AutoComplete } from 'primereact/autocomplete';
import { InputMask } from 'primereact/inputmask';
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

const CadastrarBeneficiario = (props) => {
  
  const service = new BeneficiarioApiService();
  const serviceEdital = new EditalApiService();
  const serviceContaEstudante = new ContaEstudanteApiService();
  
  const [ativo, setAtivo] = useState(true);
  const [CPF, setCPF] = useState(null);
  const [programa, setPrograma] = useState(null);
  const [situacao, setSituacao] = useState(null);
  const [contaEstudante, setContaEstudante] = useState(0);
  const [edital, setEdital] = useState(0);
  const [numero, setNumero] = useState(null);
  const [ano, setAno] = useState(null);
  const [tituloEdital, setTituloEdital] = useState(null);
  const [nomeEstudante, setNomeEstudante] = useState(null);
  const [listEditais, setListEditais] = useState([]);
  const [listContasEstudante, setListContasEstudante] = useState([]);
  const [editais, setEditais] = useState([]);
  const [editaisSelection, setEditaisSelection] = useState([]);
  const [selectedEditais, setSelectedEditais] = useState(null);
  const [filteredEditais, setFilteredEditais] = useState(null);
    
  useEffect(() => {
    findAllEditais();
    findAllContasEstudantes();
  
    // return () => {
    //   window.removeEventListener('scroll', handleScroll)
    // }

    const loadEditais = async () => {
            const response = await serviceEdital.get('/buscarTodos');//.then((data) => setEditais(data));
            setEditais(response.data);
        };
        loadEditais(); 

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

    service
      .create(
        setAtivo(ativo),
        setContaEstudante(contaEstudante),
        setEdital(edital),
      )
      .then((response) => {
        console.log(response);
        // console.log(this.state);
        showSuccessMessage("Beneficiário criado com sucesso!");
        props.history.push("/listarBeneficiarios");
      })
      .catch((error) => {
        console.log(error.response);
        // console.log(this.state);
        showErrorMessage("O beneficiário não pode ser salvo!");
      });

    console.log("request finished");
  };

  const cancel = () => {
    props.history.push("/listarBeneficiarios");
  };


  // inputSelectEdital = (e) => {
  //   this.setState({ editalId: e.target.value }, () => {
  //     console.log("Id do Edital: ", this.state.editalId);
  //   });
  // };

  // inputSelectContaEstudante = (e) => {
  //   this.setState({ contaEstudanteId: e.target.value }, () => {
  //     console.log("Id da conta estudante: ", this.state.contaEstudanteId);
  //   });
  // };

  const findAllEditais = () => {
    serviceEdital
      .get("/buscarTodos")
      .then((response) => {
        const listEditais = response.data;
        setListEditais(listEditais);
        
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const findAllContasEstudantes = () => {
    serviceContaEstudante
      .get("/buscarTodos")
      .then((response) => {
        const listContasEstudante = response.data;
        setListContasEstudante(listContasEstudante);
        // console.log('lista contas estudante: ',listContasEstudante);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // find = (id) => {
  //   this.service.find(id);
  //   var params = "?";

  //   if (this.state.id !== 0) {
  //     if (params !== "?") {
  //       params = `${params}&`;
  //     }

  //     params = `${params}id=${this.state.id}`;
  //   }

  //   if (this.state.ativo !== false) {
  //     if (params !== "?") {
  //       params = `${params}&`;
  //     }

  //     params = `${params}ativo=${this.state.ativo}`;
  //   }

  //   this.service
  //     .get(`/${id}`)
  //     .then((response) => {
  //       const beneficiarios = response.data;
  //       this.setState({ beneficiarios });
  //       console.log("find: ",beneficiarios);
  //     })
  //     .catch((error) => {
  //       console.log(error.response);
  //     });
  // };


  const selectOneEdital = (props) => {
    props.map(edital => {
      setEdital(edital.id);
      setTituloEdital(edital.nome);
      setNumero(edital.numero);
      setAno(edital.ano); 
    })
    
  }

  const selectOneContaEstudante = (contaId, nome) => {

    setContaEstudante(contaId);
    setNomeEstudante(nome);
  }

  const search = (event) => {
        // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredEditais;

      if (!event.query.trim().length) {
        _filteredEditais = [...editais];
      } else {
        _filteredEditais = editais.filter((edital) => {
          return edital.nome.toLowerCase().startsWith(event.query.toLowerCase())
        });
      }
      setFilteredEditais(_filteredEditais);
      }, 250);
      // selectOneEdital(filteredEditais);


  }

//   useEffect(() => {
//         const loadEditais = async () => {
//             const response = await serviceEdital.get('/buscarTodos');//.then((data) => setEditais(data));
//             setEditais(response.data);
//         };
//         loadEditais();    
        
//   }, []);


    // return (
    //     <div className="card flex justify-content-center w-screen">
    //         <AutoComplete 
    //         field="nome" multiple value={selectedEditais} suggestions={filteredEditais} completeMethod={search} onChange={(e) => setSelectedEditais(e.value)}             
    //         />
    //         {/* <br/><p>Edital selecionado: {selectedEditais}</p> */}
    //     </div>
        
    // )

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
              <p className="text-xl font-semibold">Cadastrar Beneficiário</p>
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
                        <div className="col-span-3 lg:col-span-2">
                          <label
                            // for="ativo"
                            // className="block text-sm font-medium text-gray-700"
                          >
                            Ativo no Sistema?
                          </label>
                          {/* <select
                            id="idAtivo"
                            name="ativo"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                            value={ativo} onChange={(e) => setAtivo(e.value)}
                          >
                            <option value="true" >Sim</option>
                            
                            
                          </select> */}
                        <div className="card flex justify-content-center">
                          <RadioButton checked disabled></RadioButton>
                          <label htmlFor="sim" className="ml-2">Sim</label>
                        </div>
                          
                        </div>


                        <div className="col-span-6 sm:col-span-3 lg:col-span-6">
                          <label
                            htmlFor="cpf"
                            className="block text-sm font-medium text-gray-700"
                          >
                            CPF
                          </label>
                          {/* <input
                            type="cpf"
                            name="cpf"
                            id="cpfId"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={CPF}
                            onChange={(e) => setCPF(e.target.value)}
                          /> */}
                          <InputMask value={CPF} onChange={(e) => setCPF(e.target.value)} mask="999.999.999-99" placeholder="999.999.999-99"/>
                        </div>

                        <div className="col-span-10 sm:col-span-10 lg:col-span-12">
                          <label
                            for="cpf"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Programa
                          </label>
                          {/* <input
                            type="programa"
                            name="programa"
                            id="programaId"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={programa}
                            onChange={(e) => setPrograma(e.target.value)}
                          /> */}
                          <div className="card flex justify-content-center gap-3">
                            <InputText className="w-full" value={programa} onChange={(e) => setPrograma(e.target.value)} />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                          <label
                            for="situacao"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Situação
                          </label>
                          {/* <input
                            type="situacao"
                            name="situacao"
                            id="situacaoId"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={situacao}
                            onChange={(e) => setSituacao(e.target.value)}
                          /> */}
                          <div className="card flex justify-content-center">
                            <InputText className="w-full" value={situacao} onChange={(e) => setSituacao(e.target.value)} />
                          </div>
                        </div>


                        {/* ////////////////////////////// */}
                        
                        <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                          <label
                            // htmlFor="edital"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Edital selecionado:
                          </label>
                          <p className="block text-md font-medium" id="labelEdital">{numero}-{ano} - {tituloEdital}</p>
                          
                          {/* <SelectEdital onChange={this.inputSelectEdital} /> */}
                        </div>

                        <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                          <label
                            // for="edital"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Estudante selecionado:
                          </label>
                          <p className="block text-md font-medium" id="labelEstudante">{nomeEstudante}</p>
                          {/* <SelectContaEstudante onChange={this.inputSelectContaEstudante} /> */}
                        </div>




                        {/* <div className="col-span-6 sm:col-span-3">
                          <label
                            for="estudanteId"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Estudante
                          </label>
                          <input
                            type="text"
                            name="estudanteId"
                            id="estudanteId"
                            className="mt-1 block w-full rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                            value={this.state.contaEstudanteId} onChange={this.selectOneContaEstudante}
                          />
                        </div> */}

                        {/* <AutoCompleteEdital 
                        value={selectedEditais} onChange={(e) => this.setState({selectedEditais: e.value})}
                        // childToParent={this.childToParent}
                        /> */}
                        
                      </div>
                    </div>


                    <div className="">
                      <div className="pt-4 pl-8 pr-8 mb-4">
                      <p className="mb-1 text-md font-semibold text-gray-700">Selecione o edital</p>

                        <div className="card flex justify-content-center">
                          <AutoComplete 
                            className="w-full"
                            field="nome" 
                            multiple value={selectedEditais} 
                            suggestions={filteredEditais} 
                            completeMethod={search} 
                            onChange={(e) => selectOneEdital(e.target.value) }            
                          
                          /> 
                        </div>
                        {/* <ListEditaisTable
                          editais={listEditais}
                          // delete={this.delete}
                          selectOneEdital={selectOneEdital}
                          id="idEditEditais"
                        /> */}
                        <br />

                    </div>

                    {/* <div className="card flex justify-content-center">
                      <input value={this.searchEditais} 
                      // suggestions={this.state.edital} 
                      // completeMethod={this.searchEditais} 
                      onChange={(e) => this.searchEditais(e.target.value)} />
                    
                      {this.state.editalEMatch && this.state.editalEMatch.map((item, index) => (
                        <div key={index}>
                          <p>nome= {`Edital: ${item.nome}`}</p>
                          <p>numero={item.numero}</p>
                          
                        </div>
                      ))}
                    </div>
                    <div className="card flex justify-content-center">
                      {/* <input 
                      //value={value} 
                      // suggestions={edital} 
                      //completeMethod={this.searchEditais} 
                      onChange={(e) => this.searchEditais(e.target.value)} />
                    </div> */}

                    <div className="">
                      <div className="pt-4 pl-8 pr-8 mb-4 text-gray-700">
                      <p className="mb-1 text-md font-semibold">Selecione o estudante</p>
                        <ListContasEstudanteTable
                          contasEstudante={listContasEstudante}
                          selectOneContaEstudante={selectOneContaEstudante}
                          // edit={this.edit}
                          id="idEditContasEstudante"
                        />
                        <br />
                    </div>
                    <div className="row flex flex-row-reverse align-middle px-6 mt-1">
                      <div className="col ml-2">
                        {/* <button
                          onClick={cancel}
                          type="submit"
                          className=" btn-cancel inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          CANCELAR
                        </button> */}
                        <div className="card flex justify-content-center">
                          <Button label="CANCELAR" severity="sucess" outlined onClick={cancel}/>
                        </div>
                      </div>
                      <div className="col mr-2">
                        {/* <button
                          onClick={create}
                          type="submit"
                          className=" btn-save inline-flex justify-center 
                                    rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm 
                                    font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none 
                                    focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          CADASTRAR
                        </button> */}
                        <div className="card flex justify-content-center">
                          <Button label="CADASTRAR" severity="sucess" onClick={create}/>
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                    </div>
                    
                    </div>
                    </div>
                    
                  </form>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default memo(CadastrarBeneficiario);
