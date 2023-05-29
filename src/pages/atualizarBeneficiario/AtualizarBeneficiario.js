import React, { useEffect, useState, memo } from "react";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import EditalApiService from "../../services/EditalApiService";
import ContaEstudanteApiService from "../../services/ContaEstudanteApiService";
import MenuAdministrador from "../../components/MenuAdministrador";
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';

const AtualizarBeneficiario = (props) => {

  const serviceBeneficiario = new BeneficiarioApiService();
  const serviceEdital = new EditalApiService();
  const serviceContaEstudante = new ContaEstudanteApiService();

  const [beneficiarioId, setBeneficiarioId] = useState(0);
  const [ativoNoSistema, setAtivoNoSistema] = useState(true);
  const [situacao, setSituacao] = useState(true);
  const [programa, setPrograma] = useState(null);

  const [editalLink, setEditalLink] = useState(null);
  const [editalVigenteInicio, setEditalVigenteInicio] = useState(null);
  const [editalVigenteFinal, setEditalVigenteFinal] = useState(null);
  const [listEditais, setListEditais] = useState([]);
  const [edital, setEdital] = useState(0);
  const [numero, setNumero] = useState(null);
  const [ano, setAno] = useState(null);
  const [editalNumero, setEditalNumero] = useState(0);
  const [editalAno, setEditalAno] = useState(0);
  const [editalNome, setEditalNome] = useState(null);
  const [editais, setEditais] = useState([]);
  const [filteredEditais, setFilteredEditais] = useState(null);
  const [selectedEditais, setSelectedEditais] = useState(null);
  const [tituloEdital, setTituloEdital] = useState(null);
  
  const [contaEstudante, setContaEstudante] = useState(0);
  const [contaEstudanteNome, setContaEstudanteNome] = useState(null);
  const [contaEstudanteEmail, setContaEstudanteEmail] = useState(null);
  const [contaEstudanteMatricula, setContaEstudanteMatricula] = useState(0)
  const [listContasEstudante, setListContasEstudante] = useState([]);
  const [nomeEstudante, setNomeEstudante] = useState(null);
  

  useEffect(() => {
    const params = props.match.params;
    const id = params.id;
    findById(id);
    findAllContasEstudantes();

    let dataVigente;
    let dataAtual = new Date();
    const editaisSelecionados = [];

    const loadEditais = async () => {

      const response = await serviceEdital.get('/buscarTodos');//.then((data) => setEditais(data));

      const editaisSelected = response.data.map(edital => {
        dataVigente = new Date(edital.vigenteFinal)

        if (dataVigente.getFullYear() === dataAtual.getFullYear()) {
          editaisSelecionados.push(edital);
        }
      })

      setEditais(editaisSelecionados);
    };
    loadEditais();

  }, [])

  const selectOneEdital = (props) => {
    props.map(edital => {
      setEdital(edital.id);
      setTituloEdital(edital.nome);
      setNumero(edital.numero);
      setAno(edital.ano);
    })
  }

  const searchEdital = (event) => {

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
  }

  const findById = (id) => {
    console.log(`Teste do id: ${id}`)

    serviceBeneficiario
      .get(`/buscarPorID/${id}`)
      .then((response) => {
        const beneficiario = response.data;
        const id = beneficiario.id;
        const ativoNoSistema = beneficiario.ativo;
        const situacao = beneficiario.situacao;
        const programa = beneficiario.programa;
        const editalNumero = beneficiario.edital.numero;
        const editalAno = beneficiario.edital.ano;
        const editalNome = beneficiario.edital.nome;
        const editalLink = beneficiario.edital.link;
        const editalVigenteInicio = beneficiario.edital.vigenteInicio;
        const editalVigenteFinal = beneficiario.edital.vigenteFinal;
        const contaEstudanteNome = beneficiario.contaEstudante.nome;
        const contaEstudanteEmail = beneficiario.contaEstudante.email;
        const contaEstudanteMatricula = beneficiario.contaEstudante.matricula;

        setBeneficiarioId(id);
        setAtivoNoSistema(ativoNoSistema);
        setSituacao(situacao);
        setPrograma(programa);
        setEditalNumero(editalNumero);
        setEditalNome(editalNome);
        setEditalAno(editalAno);
        setEditalLink(editalLink);
        setEditalVigenteInicio(editalVigenteInicio);
        setEditalVigenteFinal(editalVigenteFinal);
        setContaEstudanteNome(contaEstudanteNome);
        setContaEstudanteEmail(contaEstudanteEmail);
        setContaEstudanteMatricula(contaEstudanteMatricula);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const validate = () => {
    const errors = [];

    return errors;
  };

  const update = () => {

    const errors = validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false
    }

    serviceBeneficiario.update(
      beneficiarioId,
      {ativoNoSistema,
      contaEstudante,
      edital},
    ).then(response => {
      console.log(response);
      showSuccessMessage('Beneficiário atualizado com sucesso!');
      props.history.push("/listarBeneficiarios");
    }
    ).catch(error => {
      console.log(error.response);
      showErrorMessage('O beneficiário não pode ser atualizado!');
    }
    );

    console.log('request finished');
  }

  const cancel = () => {
    props.history.push("/listarBeneficiarios");
  };

  const findAllContasEstudantes = () => {
    serviceContaEstudante
      .get("/buscarTodos")
      .then((response) => {
        const listContasEstudante = response.data;
        setListContasEstudante(listContasEstudante);
        console.log(listContasEstudante);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const selectOneContaEstudante = (contaId, nome) => {

    setContaEstudante(contaId);
    setNomeEstudante(nome);
  }

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
            <p className="text-xl font-semibold">Atualizar Beneficiário</p>
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
                      <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                        <label
                          htmlFor="edital"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Beneficiário selecionado:
                        </label>
                        <p className="block text-md font-medium" id="labelEstudante">Nome: {contaEstudanteNome}</p>
                        <p className="block text-md font-medium" id="labelEstudante">Matrícula: {contaEstudanteMatricula}</p>
                        <p className="block text-md font-medium" id="labelEstudante">Edital: {editalNumero}-{editalAno} {editalNome}</p>
                        <p className="block text-md font-medium" id="labelEstudante">Ativo no Sistema: {ativoNoSistema === true ? 'Sim' : 'Não'}</p>
                        <p className="block text-md font-medium" id="labelEstudante">Situação: {situacao}</p>
                        <p className="block text-md font-medium" id="labelEstudante">Programa: {programa}</p>                        
                        {/* <SelectContaEstudante onChange={this.inputSelectContaEstudante} /> */}
                      </div>
                      <div className="col-span-12 sm:col-span-12">
                        <p className="mt-6 text-md text-emerald-900">Opções de atualização:</p>
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          for="ativo"
                          className="mb-1 text-sm font-semibold text-gray-700"
                        >
                          Ativo no Sistema?
                        </label>
                        <select
                          id="idAtivo"
                          name="ativo"
                          className="mt-1 block w-auto rounded-md border border-green-300 bg-green-50 py-2 px-3 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          value={ativoNoSistema} onChange={e => setAtivoNoSistema(e.target.value)}
                        >
                          <option value="true">Sim</option>
                          <option value="false">Não</option>

                        </select>
                      </div>

                      <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                        <label
                          for="edital"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Edital selecionado:
                        </label>
                        <p className="block text-md font-medium" id="labelEdital">{numero}-{ano} - {tituloEdital}</p>
                        
                      </div>

                      <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                        <label
                          for="edital"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Estudante selecionado:
                        </label>
                        <p className="block text-md font-medium" id="labelEstudante">{nomeEstudante}</p>
                        
                      </div>
                    </div>
                  </div>


                  <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                    <div className="row flex justify-content gap-10 mt-6 ">
                      <div className="">
                        <p className="mb-1 text-sm font-semibold text-gray-700">Selecione o edital</p>
                        <div className="card flex justify-content-center">
                          <AutoComplete
                            className="w-full"
                            field="nome"
                            multiple value={selectedEditais}
                            suggestions={filteredEditais}
                            completeMethod={searchEdital}
                            onChange={(e) => selectOneEdital(e.target.value)}
                          />
                        </div>

                      </div>

                    </div>
                  </div>
                    <div className="row flex flex-row-reverse align-middle px-6 mt-1">
                      <div className="col ml-2">
                       <div className="card flex justify-content-center">
                          <br />
                          <Button id="btnCancel" label="CANCELAR" severity="sucess" raised outlined onClick={cancel} />
                        </div> 
                      </div>
                      <div className="col mr-2">
                        <div className="card flex justify-content-center">
                          <Button id="btnCreate" label="ATUALIZAR" severity="sucess" raised onClick={update} />
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                    </div>

                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div >
  );

}

export default memo(AtualizarBeneficiario);