import React, { useEffect, useState, memo } from "react";
import { showSuccessMessage, showErrorMessage } from "../../components/Toastr";
import RefeicaoApiService from "../../services/RefeicaoApiService";
import MenuNutricionista from "../../components/MenuNutricionista";
import { RadioButton } from "primereact/radiobutton";
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { InputTextarea } from 'primereact/inputtextarea';


const CadastrarRefeicao = (props) => {

  const service = new RefeicaoApiService();

  const [descricao, setDescricao] = useState('');
  const [tipoDeRefeicao, setTipoDeRefeicao] = useState('');
  const [restricoes, setRestricoes] = useState([]);
  const handleChange = (setState) => (event) => { setState(event.target.value) }
  const items = [
    { name: 'Diabetes', value: 'DIABETES' },
    { name: 'Intolerância à Lactose', value: 'INTOLERANCIA_LACTOSE' },
    { name: 'Intolerância à Glúten', value: 'INTOLERANCIA_GLUTEN' },
    { name: 'Alergias', value: 'ALERGIAS' },
    { name: 'Hipertenso(a)', value: 'HIPERTENSO' },
    { name: 'Vegano(a)', value: 'VEGANO' },
  ];

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
      .create({
        descricao,
        tipoDeRefeicao,
        restricoes,
      })
      .then((response) => {
        console.log(response);
        // console.log('Entrou no then');
        showSuccessMessage("Refeição cadastrada com sucesso!");
        props.history.push("/listarRefeicoes");
      })
      .catch((error) => {
        console.log(error.response);
        showErrorMessage("A refeição não pode ser cadastrada!");
      });
    console.log("request finished");
  };

  const cancel = () => {
    props.history.push("/listarRefeicoes");
  };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []
  );


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
            <p className="text-xl font-semibold">Cadastrar Refeição</p>
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

                    </div>

                    <div className="col-span-6 sm:col-span-10 lg:col-span-12">
                      <div className="row flex justify-content gap-10 mt-6 ">
                        <div className="">


                        </div>
                        <div className="row">

                        </div>
                      </div>
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
                            <RadioButton inputId="tipoRefeicao1" name="tipoRefeicao" value="CAFE_MANHA" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Café da Manhã'} />
                            <label htmlFor="tipoRefeicao1" className="ml-2">Café da Manhã</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao2" name="tipoRefeicao" value="LANCHE_MANHA" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Lanche da Manhã'} />
                            <label htmlFor="tipoRefeicao2" className="ml-2">Lanche da Manhã</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao3" name="tipoRefeicao" value="ALMOCO" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Almoço'} />
                            <label htmlFor="tipoRefeicao3" className="ml-2">Almoço</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao4" name="tipoRefeicao" value="LANCHE_TARDE" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Lanche da Tarde'} />
                            <label htmlFor="tipoRefeicao4" className="ml-2">Lanche da Tarde</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao5" name="tipoRefeicao" value="JANTAR" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Janta'} />
                            <label htmlFor="tipoRefeicao5" className="ml-2">Janta</label>
                          </div>
                          <div className="flex align-items-center">
                            <RadioButton inputId="tipoRefeicao6" name="tipoRefeicao" value="CEIA" onChange={handleChange(setTipoDeRefeicao)} checked={tipoDeRefeicao === 'Ceia'} />
                            <label htmlFor="tipoRefeicao6" className="ml-2">Ceia</label>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="col-span-10 sm:col-span-8 lg:col-span-8 gap-6 mt-6">
                      <label
                        htmlFor="restricoes"
                        className="block text-md font-medium text-gray-700 mt-2 mb-3">
                        Restrições Alimentares da Refeição
                      </label>


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

export default memo(CadastrarRefeicao);
