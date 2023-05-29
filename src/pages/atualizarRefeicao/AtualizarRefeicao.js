import React, { useEffect, useState, memo } from "react";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import RefeicaoApiService from "../../services/RefeicaoApiService";
import MenuNutricionista from "../../components/MenuNutricionista";

import { AutoComplete } from 'primereact/autocomplete';
import { InputMask } from 'primereact/inputmask';
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import { Editor } from 'primereact/editor';
import { SelectButton } from 'primereact/selectbutton';
import { InputTextarea } from 'primereact/inputtextarea';

const AtualizarRefeicao = (props) => {

  const service = new RefeicaoApiService();

  const [descricao, setDescricao] = useState('');
  const [tipoDeRefeicao, setTipoDeRefeicao] = useState('');
  const [restricoes, setRestricoes] = useState([]);
  const [refeicaoId, setRefeicaoId] = useState(0);
  const handleChange = (setState) => (event) => { setState(event.target.value) }

  const items = [
    { name: 'Diabetes', value: 'DIABETES' },
    { name: 'Intolerância à Lactose', value: 'INTOLERANCIA_LACTOSE' },
    { name: 'Intolerância à Glúten', value: 'INTOLERANCIA_GLUTEN' },
    { name: 'Alergias', value: 'ALERGIAS' },
    { name: 'Hipertenso(a)', value: 'HIPERTENSO' },
    { name: 'Vegano(a)', value: 'VEGANO' },
  ];

  useEffect(() => {
    const params = props.match.params;
    const id = params.id
    findById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []
  );

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

    service
    .update(refeicaoId,{
      tipoDeRefeicao,
      restricoes,
      descricao}
    ).then(response => {
      console.log(response);
      showSuccessMessage('Refeição atualizada com sucesso!');
      // props.history.push("/listarRefeicoes");
    }
    ).catch(error => {
      console.log(error.response);
      showErrorMessage('A refeição não pode ser atualizado!');
    }
    );

    console.log('request finished');
  }

  const cancel = () => {
    props.history.push("/listarRefeicoes");
  };

  const findById = (id) => {
    console.log(`Teste do id: ${id}`)

    service
      .get(`/buscarPorID/${id}`)
      .then((response) => {
        const refeicao = response.data;
        const id = refeicao.id;
        const tipoDeRefeicao = refeicao.tipoDeRefeicao;
        const restricoes = refeicao.restricoes;
        const descricao = refeicao.descricao;

        setRefeicaoId(id);
        setTipoDeRefeicao(tipoDeRefeicao);
        setRestricoes(restricoes);
        setDescricao(descricao);
        console.log(refeicao)
      })
      .catch((error) => {
        console.log(error.response);
        console.log("Entrou no catch")
      });
  };

  return (
    <div className="container-fluid h-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow">
      {/*Col left  */}
      <div className="w-[220px] flex-shrink flex-grow-0 px-0">
        {/* Side Menu */}
        <MenuNutricionista />
      </div>
      {/* Col right */}
      <div className="w-full">
        {/* Header */}
        <div className="h-[100px] bg-gray-200 pt-4 pl-6 pr-6 pb-0 mb-4 ">
          <div className="flex flex-row-reverse pr-6">
            <p className="text-xs">{props.currentUser.email}</p>
          </div>
          <div className="flex flex-row-reverse pr-6">
            <p className="text-lg font-semibold">Nutricionista</p>
          </div>
          <div className="flex flex-row pl-6">
            <p className="text-xl font-semibold">Atualizar Refeição</p>
          </div>
        </div>

        {/* Content two */}
        <div className="pt-4 pl-8 pr-8 mb-4">
          <div className="mt-0 sm:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-6">
              {/* <div className="md:col-span-1">
                <div className="px-4 sm:px-0">

                </div>
              </div> */}
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form action="">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    {/* <div className="grid grid-cols-6 gap-6">
                    </div> */}

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      {/* <label className="block text-sm font-medium text-gray-700">
                        Edital selecionado:
                      </label>
                      <p className="block text-sm font-medium ml-4 mb-4" id="labelEdital">{numero}-{ano} - {tituloEdital}</p> */}

                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <label className="block text-md font-medium text-gray-900 mt-6">
                        Refeição selecionada:
                      </label>
                      <p className="block text-sm font-medium ml-4" id="labelEstudante">
                        Tipo: {tipoDeRefeicao}<br />
                        Descrição: {descricao}<br />
                        Restrições: {restricoes}<br />
                        </p>
                    </div>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="tipoRefeicao"
                        className="block text-md font-medium text-gray-700 mb-3">
                        Tipo de Refeição
                      </label>
                      <div className="card flex justify-content-center">
                        <div className="flex flex-wrap gap-3">
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao1" name="tipoDeRefeicao" value="CAFE_MANHA" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Café da Manhã'} />
                            <label htmlFor="tipoDeRefeicao1" className="ml-2">Café da Manhã</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao2" name="tipoDeRefeicao" value="LANCHE_MANHA" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Lanche da Manhã'} />
                            <label htmlFor="tipoDeRefeicao2" className="ml-2">Lanche da Manhã</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao3" name="tipoDeRefeicao" value="ALMOCO" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Almoço'} />
                            <label htmlFor="tipoDeRefeicao3" className="ml-2">Almoço</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao4" name="tipoDeRefeicao" value="LANCHE_TARDE" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Lanche da Tarde'} />
                            <label htmlFor="tipoDeRefeicao4" className="ml-2">Lanche da Tarde</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao5" name="tipoDeRefeicao" value="JANTAR" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Janta'} />
                            <label htmlFor="tipoDeRefeicao5" className="ml-2">Janta</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao6" name="tipoDeRefeicao" value="CEIA" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Ceia'} />
                            <label htmlFor="tipoDeRefeicao6" className="ml-2">Ceia</label>
                          </div>
                          {/* <label htmlFor="selectRefeicao" class="mt-4">Tipo de Refeição</label> */}
                          {/* <select className="" id="selectRefeicao" 
                            value={tipoDeRefeicao} onChange={e => setTipoDeRefeicao(e.target.value)}>
                            <option value="CAFE_MANHA">1</option>
                            <option value="LANCHE_MANHA">2</option>
                            <option value="ALMOCO">3</option>
                            <option value="LANCHE_TARDE">4</option>
                            <option value="JANTAR">5</option>
                            <option value="CEIA">6</option>
                          </select> */}
                          

                        </div>

                      </div>
                    </div>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="restricoes"
                        className="block text-md font-medium text-gray-700 mt-2 mb-3">
                        Restrições Alimentares da Refeição
                      </label>
                      {/* <div className="card flex flex-wrap justify-content-center gap-3">
                        <div className="flex align-items-center">
                          <Checkbox inputId="restricoes1" name="restricao" value="DIABETES" onChange={onRestricoesChange} checked={restricoes.includes('Diabetes')} />
                          <label htmlFor="restricoes1" className="ml-2">Diabetes</label>
                        </div>
                        <div className="flex align-items-center">
                          <Checkbox inputId="restricoes2" name="restricao" value="INTOLERANCIA_LACTOSE" onChange={onRestricoesChange} checked={restricoes.includes('Intolerância à Lactose')} />
                          <label htmlFor="restricoes2" className="ml-2">Intolerância à Lactose</label>
                        </div>
                        <div className="flex align-items-center">
                          <Checkbox inputId="restricoes3" name="restricao" value="INTOLERANCIA_GLUTEN" onChange={onRestricoesChange} checked={restricoes.includes('Intolerância à Glúten')} />
                          <label htmlFor="restricoes3" className="ml-2">Intolerância à Glúten</label>
                        </div>
                        <div className="flex align-items-center">
                          <Checkbox inputId="restricoes4" name="restricao" value="ALERGIAS" onChange={onRestricoesChange} checked={restricoes.includes('Alergias')} />
                          <label htmlFor="restricoes4" className="ml-2">Alergias</label>
                        </div>
                        <div className="flex align-items-center">
                          <Checkbox inputId="restricoes5" name="restricao" value="HIPERTENSO" onChange={onRestricoesChange} checked={restricoes.includes('Hipertensão')} />
                          <label htmlFor="restricoes5" className="ml-2">Hipertensão</label>
                        </div>
                        <div className="flex align-items-center">
                          <Checkbox inputId="restricoes6" name="restricao" value="VEGANO" onChange={onRestricoesChange} checked={restricoes.includes('Vegano(a)')} />
                          <label htmlFor="restricoes6" className="ml-2">Vegano(a)</label>
                        </div>
                      </div> */}

                      <SelectButton id="selectRefeicoesBtn" className="text-xs"
                        value={restricoes} onChange={(e) => setRestricoes(e.value)}
                        optionLabel="name" options={items} multiple />


                    </div>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-8">
                      <label
                        htmlFor="diaRefeicao"
                        className="block text-md font-medium text-gray-700 mt-2 mb-3">
                        Descrição da Refeição
                      </label>
                      
                      <div className="card flex justify-content-center">
                        <InputTextarea id="descricao" severity="sucess" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={5} cols={50} />
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
                          <Button id="btnCreate" label="ATUALIZAR" severity="sucess" raised onClick={update} />
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

export default memo(AtualizarRefeicao);
