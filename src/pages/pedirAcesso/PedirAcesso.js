import React, { useEffect, useState, useRef, memo } from "react";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import PedidoAcessoApiService from "../../services/PedidoAcessoApiService";
import AcessoDiaRefeicaoApiService from "../../services/AcessoDiaRefeicaoApiService";
import RestricaoAlimentar from "../../services/RestricaoAlimentarApiService";
import BeneficiarioApiService from "../../services/BeneficiarioApiService";
import MenuVazio from "../../components/MenuVazio";
import { Button } from 'primereact/button';
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';

const PedirAcesso = (props) => {

  const servicePedidoAcesso = new PedidoAcessoApiService();
  const serviceAcessoDiaRefeicao = new AcessoDiaRefeicaoApiService();
  const serviceRestricao = new RestricaoAlimentar();
  const serviceBeneficiario = new BeneficiarioApiService();
  const [solicitadoEm, setSolicitadoEm] = useState(null);
  const [justificativaAnalise, setJustificativaAnalise] = useState('');
  const [beneficiario, setBeneficiario] = useState(0);
  const [diasAcessoRefeicao, setDiasAcessoRefeicao] = useState([]);
  const [diaDaSemana, setDiaDaSemana] = useState('');
  const [tipoDeRefeicao, setTipoDeRefeicao] = useState('');
  const [restricaoAlimentar, setRestricaoAlimentar] = useState([]);
  const [observacoes, setObservacoes] = useState('');
  const [tipoDeRestricaoAlimentar, setTipoDeRestricaoAlimentar] = useState('');
  const [anexo, setAnexo] = useState(null);
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [isAprovado, setIsAprovado] = useState(false);

  const handleChange = (setState) => (event) => { setState(event.target.value) }

  const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Successo!', detail:'Refeição adicionada!', life: 3000});
    }

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Atenção!', detail:'Selecione o dia e a refeição!', life: 3000});
    }

    const showInfo = () => {
      toast.current.show({severity:'error', summary: 'Atenção!', detail:'Selecione uma opção para o tipo de restrição', life: 3000});
  }
  const showSuccessRestricao = () => {
    toast.current.show({severity:'success', summary: 'Opção confirmada', detail:'Restrição selecionada!', life: 3000});
}


  const validate = () => {
    const errors = [];
    return errors;
  };

  const create = (event) => {
    event.preventDefault();
    const errors = validate();

    if (errors.length > 0) {
      errors.forEach((message, index) => {
        showErrorMessage(message);
      });
      return false;
    }

    servicePedidoAcesso
      .create({
        solicitadoEm,
        justificativaAnalise,
        isAprovado,
        beneficiario,
        diasAcessoRefeicao,
        restricaoAlimentar
      })
      .then((response) => {
        console.log(response);
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
    props.history.push("/");
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
  
  const addDiasTiposRefeicaoHandler = (event) => {
    event.preventDefault();
    const diaAcessoRefeicao = { diaDaSemana, tipoDeRefeicao };
    if (tipoDeRefeicao !== ''){
      diasAcessoRefeicao.push(diaAcessoRefeicao);
      showSuccess();
    } else {
      showError();
    }
  }
  
  const addRestricoesHandler = (event) => {
    event.preventDefault();
    const restricoes = {observacoes, tipoDeRestricaoAlimentar, anexo};
    if (tipoDeRestricaoAlimentar === 'Selecione uma opção'){
      showInfo();
    } else {
      restricaoAlimentar.push(restricoes);
      showSuccessRestricao();
    }
  }

  
  useEffect(() => {

    const beneficiariosSelecionados = [];
    
    const loadBeneficiarios = async () => {
      
      const response = await serviceBeneficiario.get('/buscarTodos');
      const beneficiarioSelected = response.data.map(oneBeneficiario => {
        if(oneBeneficiario.contaEstudante.email === props.currentUser.email){
          beneficiariosSelecionados.push(oneBeneficiario);
          setBeneficiario(oneBeneficiario.id);

        }
      })
      setBeneficiarios(beneficiariosSelecionados);
    };
    loadBeneficiarios();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  console.log('Beneficiario id: ', beneficiario)
  console.log('Mostra dias Acesso: ', diasAcessoRefeicao);
  console.log('Mostra restrições: ', restricaoAlimentar);
  
  return (
    <div className="container-fluid h-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
      {/*Col left  */}
      <div className="w-[220px] flex-shrink flex-grow-0 px-0">
        {/* Side Menu */}
        <MenuVazio />
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
            <p className="text-xl font-semibold">Solicitar dias para refeições</p>
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
                      <label
                        htmlFor="restricoes"
                        className="block text-md font-medium text-gray-700 mt-6 mb-2">
                        Selecione o dia da refeição</label>
                      <div className="card flex justify-content-center">
                          
                          <select className="rounded-md border border-gray-300 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm md:w-10rem" 
                            id="selectDia" value={diaDaSemana} 
                            onChange={handleChange(setDiaDaSemana)}>
                            <option>Selecione uma opção</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="SEGUNDA">Segunda-feira</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="TERCA">Terça-feira</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="QUARTA">Quarta-feira</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="QUINTA">Quinta-feira</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="SEXTA">Sexta-feira</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="SABADO">Sábado</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="DOMINGO">Domingo</option>
                          </select>
                      </div>                      
                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <label
                            htmlFor="restricoes"
                            className="block text-md font-medium text-gray-700 mt-6 mb-2">
                            Selecione o tipo de refeição</label>
                          <div className="card flex justify-content-center">

                          <select className="rounded-md border border-gray-300 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm md:w-10rem" 
                            id="selectDia" value={tipoDeRefeicao} 
                            onChange={handleChange(setTipoDeRefeicao)}>
                            <option>Selecione uma opção</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="CAFE">Café da manhã</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="LANCHE_MANHA">Lanche da manhã</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="ALMOCO">Almoço</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="LANCHE_TARDE">Lanche da tarde</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="JANTAR">Jantar</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="CEIA">Ceia</option>
                          </select>
                          </div>                      
                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <div className="col mt-8 mb-6">
                        <div className="card flex justify-content-rigth">
                          <Button id="btnCreate" label="ADICIONAR REFEIÇÕES" severity="sucess" 
                          icon="pi pi-check" size="small" onClick={addDiasTiposRefeicaoHandler} />
                        </div>                        
                      </div>
                      <Divider className="border-2 border-x-green-950"/>
                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <label
                        htmlFor="restricoes"
                        className="block text-md font-medium text-gray-700 mt-6 mb-2">
                        Informe as Restrições Alimentares
                      </label>
                      <div className="card flex justify-content-center">

                        <select className="rounded-md border border-gray-300 
                            py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm md:w-10rem" 
                            id="selectDia" value={tipoDeRestricaoAlimentar} 
                            onChange={handleChange(setTipoDeRestricaoAlimentar)}>
                            <option>Selecione uma opção</option>
                            {/* <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="">Nenhuma</option> */}
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="DIABETES">Diabetes</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="INTOLERANCIA_LACTOSE">Intolerância à Lactose</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="INTOLERANCIA_GLUTEN">Intolerância à Glúten</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="ALERGIAS">Alergias</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="HIPERTENSO">Hipertenso(a)</option>
                            <option className="cursor-pointer hover:bg-green-200 text-sm font-medium text-gray-700" value="VEGANO">Vegano</option>                          
                          </select>
                      </div>
                    </div>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="observacoes"
                        className="block text-md font-medium text-gray-700 mb-2">
                        Observações
                      </label>

                      <div className="card flex justify-content-center">
                        <InputTextarea id="observacao" autoResize placeholder="Detalhe sua restrição alimentar"
                          value={observacoes} 
                          onChange={(e) => setObservacoes(e.target.value)}
                          rows={5} cols={60} />
                      </div>
                    </div>

                    <div className="col mt-8 mb-6">
                        <div className="card flex justify-content-rigth">
                          <Button id="btnCreate" label="ADICIONAR RESTRIÇÃO" severity="sucess" 
                          icon="pi pi-check" size="small" onClick={addRestricoesHandler} />
                        </div>                        
                      </div>
                      <Divider className="border-2 border-x-green-950"/>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                        <label
                          htmlFor="justificativa"
                          className="block text-md font-medium text-gray-700 mb-2">
                          Justificativa da restrição alimentar
                        </label>
                        
                      <div className="card flex justify-content-center">
                        <InputTextarea id="descricao" autoResize placeholder="Justifique suas restrições alimentares"
                          value={justificativaAnalise} 
                          onChange={(e) => setJustificativaAnalise(e.target.value)} 
                          rows={5} cols={60} />
                      </div>
                    </div>


                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="diaRefeicao"
                        className="block text-sm font-medium text-gray-700 mb-3">
                        {/* Arquivo de comprovação das restrições alimentares(Laudo médico, exames) */}
                      </label>
                      <div className="card flex justify-content-center">
                        {/* <Editor value={descricaoRefeicao} onTextChange={(e) => setDescricaoRefeicao(e.htmlValue)} style={{ width: '100%', height: '320px' }} /> */}
                      </div>
                    </div>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                        <label
                          htmlFor="justificativa"
                          className="block text-md font-medium text-gray-700 mb-2">
                          Data da solicitação
                        </label>
                        
                      <div className="card flex justify-content-center">
                        <Calendar value={solicitadoEm} id="solicitadoEm" 
                          onChange={handleChange(setSolicitadoEm)} 
                          dateFormat="yy/mm/dd" />
                      </div>
                    </div>

                    <div className="row flex flex-row-reverse align-middle mt-6">
                      <div className="col ml-2">
                        <div className="card flex justify-content-center">
                          <br />
                          <Button id="btnCancel" label="CANCELAR" severity="sucess" raised outlined onClick={cancel} />
                        </div>
                      </div>
                      <div className="col mr-2">
                        <div className="card flex justify-content-center">
                          <Toast ref={toast} />
                          <Button id="btnCreate" label="CADASTRAR" severity="sucess" raised onClick={create} />
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

export default memo(PedirAcesso);

