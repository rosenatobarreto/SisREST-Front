import React, { useEffect, useState, useRef, memo } from "react";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import PedidoAcessoApiService from "../../services/PedidoAcessoApiService";
import AcessoDiaRefeicaoApiService from "../../services/AcessoDiaRefeicaoApiService";
import RestricaoAlimentar from "../../services/RestricaoAlimentarApiService";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import MenuAdministrador from "../../components/MenuAdministrador";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { RadioButton } from 'primereact/radiobutton';
import { formatDateBr } from "../../util/FormatDate";
import { Calendar } from 'primereact/calendar';

const ValidarPedidoAcesso = (props) => {

  const servicePedidoAcesso = new PedidoAcessoApiService();
  const serviceAcessoDiaRefeicao = new AcessoDiaRefeicaoApiService();
  const serviceRestricao = new RestricaoAlimentar();
  const serviceBeneficiario = new BeneficiarioApiService();

  //Dados reais
  const [solicitadoEm, setSolicitadoEm] = useState('');
  const [analisadoEm, setAnalisadoEm] = useState('');
  const [isAprovado, setIsAprovado] = useState('');
  const [justificativaAnalise, setJustificativaAnalise] = useState('');
  const [beneficiario, setBeneficiario] = useState(0);
  const [acessosDiaRefeicao, setAcessosDiaRefeicao] = useState([]);
  const [restricoesAlimentares, setRestricoesAlimentares] = useState([]);
  //Dados complementares
  const [diaDaSemana, setDiaDaSemana] = useState('');
  const [tipoDeRefeicao, setTipoDeRefeicao] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [tipoDeRestricaoAlimentar, setTipoDeRestricaoAlimentar] = useState('');
  const [anexo, setAnexo] = useState(null);
  const [beneficiarios, setBeneficiarios] = useState([]);

  // Dados para exibição  
  const [nomeEstudante, setNomeEstudante] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');
  const [situacao, setSituacao] = useState('');
  const [pedidoId, setPedidoId] = useState(0);
  const [edital, setEdital] = useState('');
  const [diasAcessoRefeicao, setDiasAcessoRefeicao] = useState([]);
  const [editalNumero, setEditalNumero] = useState('');
  const [editalAno, setEditalAno] = useState('');
  const [editalTitulo, setEditalTitulo] = useState('');
  const [editalVigenteInicio, setEditalVigenteInicio] = useState('');
  const [editalVigenteFinal, setEditalVigenteFinal] = useState('');
  const [mostraAcessosDiaRefeicao, setMostraAcessosDiaRefeicao] = useState([]);
  const [mostraRestricoesAlimentares, setMostraRestricoesAlimentares] = useState([]);

  console.log(isAprovado)
  const handleChange = (setState) => (event) => { setState(event.target.value) }

  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Successo!', detail: 'Refeição adicionada!', life: 3000 });
  }

  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Atenção!', detail: 'Selecione o dia e a refeição!', life: 3000 });
  }

  const showInfo = () => {
    toast.current.show({ severity: 'error', summary: 'Atenção!', detail: 'Selecione uma opção para o tipo de restrição', life: 3000 });
  }
  const showSuccessRestricao = () => {
    toast.current.show({ severity: 'success', summary: 'Opção confirmada', detail: 'Restrição selecionada!', life: 3000 });
  }


  const validate = () => {
    const errors = [];
    return errors;
  };

  const update = (event) => {
    event.preventDefault();
    const errors = validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    servicePedidoAcesso
      .update(pedidoId, {
        solicitadoEm,
        analisadoEm,
        justificativaAnalise,
        isAprovado,
        beneficiario,
        diasAcessoRefeicao,
        restricoesAlimentares
      })
      .then((response) => {
        console.log('Response then',response);
        console.log('Entrou no then');
        showSuccessMessage("Pedido cadastrado com sucesso!");
        console.log(response)
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error.response);
        showErrorMessage("O pedido não pôde ser cadastrado!");
      });
    console.log("request finished");
  };

  const cancel = () => {
    props.history.push("/listarPedidosAcesso");
  };

  const findAllBeneficiarios = () => {
    serviceBeneficiario
      .get("/buscarTodos")
      .then((response) => {
        const beneficiario = response.data;
        setBeneficiarios(beneficiario);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const addDiasTiposRefeicaoHandler = () => {
    // event.preventDefault();
    const diaAcessoRefeicao = { diaDaSemana, tipoDeRefeicao };
    // if (tipoDeRefeicao !== '') {
    diasAcessoRefeicao.push(diaAcessoRefeicao);
    //   showSuccess();
    // } else {
    //   showError();
    // }
  }

  const addRestricoesHandler = () => {
    const restricoes = { observacoes, tipoDeRestricaoAlimentar, anexo };
    // if (tipoDeRestricaoAlimentar === 'Selecione uma opção') {
    //   showInfo();
    // } else {
    restricoesAlimentares.push(restricoes);
    //   showSuccessRestricao();
    // }
  }

  const findById = (id) => {
    console.log(`Teste do id: ${id}`)

    servicePedidoAcesso
      .get(`/buscarPorID/${id}`)
      .then((response) => {
        const pedido = response.data;
        const id = pedido.id;
        const solicitadoEm = pedido.solicitadoEm;
        const analisadoEm = pedido.analisadoEm;
        const isAprovado = pedido.isAprovado;
        const justificativaAnalise = pedido.justificativaAnalise;
        const beneficiarioId = pedido.beneficiario.id;
        const acessosDiaRefeicao = pedido.acessosDiaRefeicao;
        const restricoesAlimentares = pedido.restricoesAlimentares;
        console.log('restricoes', restricoesAlimentares)
        const mostraAcessosDiaRefeicao = pedido.acessosDiaRefeicao
          .map((refeicao) =>
            <div className="ml-6">{refeicao.diaDaSemana}{" - "}{refeicao.tipoDeRefeicao}</div>
          );
        const mostraRestricoesAlimentares = pedido.restricoesAlimentares
          .map((restricao) =>
            <div className="ml-6">{restricao.tipoDeRestricaoAlimentar}
              {" - "}{"Observações: "}{restricao.observacoes}</div>
          );
        const nomeEstudante = pedido.beneficiario.contaEstudante.nome;
        const matricula = pedido.beneficiario.contaEstudante.matricula;
        const curso = pedido.beneficiario.contaEstudante.curso;
        const situacao = pedido.beneficiario.situacao;
        const editalNumero = pedido.beneficiario.edital.numero;
        const editalAno = pedido.beneficiario.edital.ano;
        const editalTitulo = pedido.beneficiario.edital.nome;
        const editalVigenteInicio = pedido.beneficiario.edital.vigenteInicio;
        const editalVigenteFinal = pedido.beneficiario.edital.vigenteFinal;
        const mostraSolicitadoEm = pedido.solicitadoEm;

        setPedidoId(id);
        setSolicitadoEm(solicitadoEm);
        setAnalisadoEm(analisadoEm);
        setIsAprovado(isAprovado);
        setJustificativaAnalise(justificativaAnalise);
        setBeneficiario(beneficiarioId);
        setAcessosDiaRefeicao(acessosDiaRefeicao);
        setRestricoesAlimentares(restricoesAlimentares);

        setMostraAcessosDiaRefeicao(mostraAcessosDiaRefeicao);
        setMostraRestricoesAlimentares(mostraRestricoesAlimentares);
        setNomeEstudante(nomeEstudante);
        setMatricula(matricula);
        setCurso(curso);
        setSituacao(situacao);
        setEditalNumero(editalNumero);
        setEditalAno(editalAno);
        setEditalTitulo(editalTitulo);
        setEditalVigenteInicio(editalVigenteInicio);
        setEditalVigenteFinal(editalVigenteFinal);
        console.log(pedido)
      })
      .catch((error) => {
        console.log(error.response);
        console.log("Entrou no catch")
      });
  };

  useEffect(() => {

    // const beneficiariosSelecionados = [];

    // const loadBeneficiarios = async () => {

    //   const response = await serviceBeneficiario.get('/buscarTodos');
    //   const beneficiarioSelected = response.data.map(oneBeneficiario => {
    //     if(oneBeneficiario.contaEstudante.email === props.currentUser.email){
    //       beneficiariosSelecionados.push(oneBeneficiario);
    //       setBeneficiario(oneBeneficiario.id);

    //     }
    //   })
    //   setBeneficiarios(beneficiariosSelecionados);
    // };
    // loadBeneficiarios();
    // addDiasTiposRefeicaoHandler();
    // addRestricoesHandler();

    const params = props.match.params;
    const id = params.id
    findById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  console.log('Beneficiario id: ', beneficiario)
  console.log('Mostra dias Acesso: ', diasAcessoRefeicao);
  console.log('Mostra restrições: ', restricoesAlimentares);

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
            <p className="text-lg font-semibold">Estudante</p>
          </div>
          <div className="flex flex-row pl-6">
            <p className="text-xl font-semibold">Validar Pedido de Refeições</p>
          </div>
        </div>

        {/* Content two */}
        <div className="pt-4 pl-8 pr-8 mb-4">
          <div className="mt-0 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">
              <div className="mt-5 md:col-span-2 md:mt-0">

                <form action="">
                  <div className="bg-white px-4 py-5 sm:p-6">


                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <label className="block text-md font-medium text-gray-700 mt-6">
                        Dados do beneficiário:<br /><br />
                      </label>

                      <p className="text-sm">Estudante:</p>
                      <p className="text-md ml-4 mb-3">{nomeEstudante}</p>
                      <p className="text-sm">Matrícula:</p>
                      <p className="text-md ml-4 mb-3">{matricula}</p>
                      <p className="text-sm">Curso:</p>
                      <p className="text-md ml-4 mb-3">{curso}</p>
                      <p className="text-sm">Data da solicitação:</p>
                      <p className="text-md ml-4 mb-3">{formatDateBr(solicitadoEm)}</p>
                      <p className="text-sm">Edital:</p>
                      <p className="text-md ml-4 mb-3">{editalNumero}/{editalAno} - {editalTitulo}</p>
                      <p className="text-sm">Vigência do Edital:</p>
                      <p className="text-md ml-4 mb-3">{formatDateBr(editalVigenteInicio)} a {formatDateBr(editalVigenteFinal)}</p>
                      <p className="text-sm">Justificativa:</p>
                      <p className="text-md ml-4 mb-3">{justificativaAnalise}</p>
                      <p className="text-sm">Refeições:</p>
                      <p className="text-md ml-4 mb-3">{mostraAcessosDiaRefeicao}</p>
                      <p className="text-sm">Restrições Alimentares:</p>
                      <p className="text-md ml-4 mb-3">{mostraRestricoesAlimentares}</p>

                    </div>


                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <label
                        htmlFor="restricoes"
                        className="block text-md font-medium text-gray-700 mt-6 mb-2">
                        Aprova o pedido?</label>
                      <div className="card flex justify-content-center">

                        <div className="flex flex-wrap gap-3">
                          <div className="flex align-items-center">
                            <RadioButton inputId="aprovado" name="isAprovado" value="true" onChange={(e) => setIsAprovado(e.value)} checked={isAprovado === 'Sim'} />
                            <label htmlFor="ingredient1" className="ml-2">Sim</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="naoAprovado" name="isAprovado" value="false" onChange={(e) => setIsAprovado(e.value)} checked={isAprovado === 'Não'} />
                            <label htmlFor="ingredient2" className="ml-2">Não</label>
                          </div>

                        </div>

                      </div>
                    </div>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="justificativa"
                        className="block text-md font-medium text-gray-700 mb-2">
                        Marcar a Data da Análise do Pedido
                      </label>

                      <div className="card flex justify-content-center">
                        <Calendar value={analisadoEm} id="analisadoEm"
                          onChange={handleChange(setAnalisadoEm)}
                          dateFormat="yy/mm/dd" />
                      </div>
                    </div>

                    <div className="row flex flex-row-reverse align-middle mt-8">
                      <div className="col ml-2">
                        <div className="card flex justify-content-center">
                          <br />
                          <Button id="btnCancel" label="CANCELAR" severity="sucess" raised outlined onClick={cancel} />
                        </div>
                      </div>
                      <div className="col mr-2">
                        <div className="card flex justify-content-center">
                          <Toast ref={toast} />
                          <Button id="btnCreate" label="APROVAR" severity="sucess" raised onClick={update} />
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>

      </div >
    </div>
  );
}

export default memo(ValidarPedidoAcesso);

